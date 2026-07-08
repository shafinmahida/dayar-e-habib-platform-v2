import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import mime from 'mime-types';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';

ffmpeg.setFfmpegPath(ffmpegPath.path);
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const BUCKET_NAME = 'media';
const INPUT_DIR = path.join(process.cwd(), 'public', 'gallery');
const TEMP_DIR = path.join(process.cwd(), 'scripts', 'temp_media');

// Ensure temp directory exists
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Ensure the bucket exists
async function ensureBucket() {
  const { data: buckets, error } = await supabase.storage.listBuckets();
  if (error) {
    console.error("Error listing buckets:", error);
    process.exit(1);
  }
  
  if (!buckets.find(b => b.name === BUCKET_NAME)) {
    console.log(`Creating public bucket: ${BUCKET_NAME}`);
    const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      allowedMimeTypes: ['image/*', 'video/*', 'application/pdf'],
      fileSizeLimit: 52428800 // 50MB max per file in bucket for Supabase Free Tier
    });
    if (createError) {
      console.error("Error creating bucket:", createError);
      process.exit(1);
    }
  } else {
    console.log(`Bucket ${BUCKET_NAME} already exists.`);
  }
}

// Compress video and generate thumbnail
function processVideo(inputPath, outputFileName) {
  return new Promise((resolve, reject) => {
    const outputVideoPath = path.join(TEMP_DIR, `${outputFileName}.mp4`);
    const outputThumbPath = path.join(TEMP_DIR, `${outputFileName}_thumb.jpg`);

    console.log(`\nCompressing Video: ${inputPath}`);
    console.log(`Output Video: ${outputVideoPath}`);
    
    // Step 1: Generate Thumbnail
    ffmpeg(inputPath)
      .screenshots({
        timestamps: ['00:00:01'], // Take screenshot at 1 second
        filename: `${outputFileName}_thumb.jpg`,
        folder: TEMP_DIR,
        size: '1280x720' // 720p thumbnail
      })
      .on('end', () => {
        console.log(`✓ Thumbnail generated for ${outputFileName}`);
        
        // Step 2: Compress Video
        ffmpeg(inputPath)
          .videoCodec('libx264')
          .audioCodec('aac')
          // CRF 28 provides great compression with minimal visible quality loss for web
          // Preset 'fast' or 'medium' balances speed and compression
          .outputOptions([
            '-map 0:v',      // Only map the video stream
            '-map 0:a?',     // Only map audio streams if they exist
            '-sn',           // Ignore subtitle streams
            '-dn',           // Ignore data streams (timecodes/metadata which cause Decoder none errors)
            '-crf 28', 
            '-preset fast', 
            '-movflags +faststart', // Essential for instant web streaming
            '-pix_fmt yuv420p',
            '-vf scale=-2:1080' // Scale to max 1080p height, preserving aspect ratio
          ])
          .save(outputVideoPath)
          .on('end', () => {
            console.log(`✓ Video compression finished for ${outputFileName}`);
            resolve({ videoPath: outputVideoPath, thumbPath: outputThumbPath });
          })
          .on('error', (err) => {
            console.error(`✗ Error compressing video: ${err.message}`);
            reject(err);
          });
      })
      .on('error', (err) => {
         console.error(`✗ Error extracting thumbnail: ${err.message}`);
         reject(err);
      });
  });
}

// Upload file to Supabase Storage
async function uploadToSupabase(filePath, storagePath, mimeType) {
  console.log(`Uploading ${storagePath}...`);
  const fileBuffer = fs.readFileSync(filePath);
  
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, fileBuffer, {
      contentType: mimeType,
      upsert: true
    });

  if (error) {
    throw new Error(`Failed to upload ${storagePath}: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(storagePath);

  return publicUrlData.publicUrl;
}

// Insert metadata into media_assets database
async function saveMediaRecord(metadata) {
  console.log(`Saving DB record for ${metadata.file_name}...`);
  const { data, error } = await supabase
    .from('media_assets')
    .insert([metadata])
    .select();

  if (error) {
    console.error(`✗ Failed to save DB record:`, error.message);
  } else {
    console.log(`✓ DB record saved for ${metadata.file_name}`);
  }
}

async function main() {
  await ensureBucket();
  
  // Accept folder name as a CLI argument, default to 'uncategorized'
  const args = process.argv.slice(2);
  const folderName = args[0] || 'uncategorized'; 
  console.log(`Using Media Library folder: /${folderName}/`);

  if (!fs.existsSync(INPUT_DIR)) {
    console.log(`Input directory ${INPUT_DIR} does not exist. Please add some media files.`);
    process.exit(0);
  }

  const files = fs.readdirSync(INPUT_DIR);
  console.log(`Found ${files.length} files in ${INPUT_DIR}`);

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const stat = fs.statSync(inputPath);
    
    if (stat.isDirectory()) continue;

    const mimeType = mime.lookup(inputPath) || 'application/octet-stream';
    const isVideo = mimeType.startsWith('video/');
    const isImage = mimeType.startsWith('image/');
    
    const parsedPath = path.parse(file);
    const uniqueFileName = `${Date.now()}_${parsedPath.name.replace(/[^a-zA-Z0-9]/g, '')}`;

    try {
      if (isVideo) {
        // Process Video
        const { videoPath, thumbPath } = await processVideo(inputPath, uniqueFileName);
        const videoSize = fs.statSync(videoPath).size;

        // Upload Video
        const storageVideoPath = `${folderName}/videos/${uniqueFileName}.mp4`;
        const publicVideoUrl = await uploadToSupabase(videoPath, storageVideoPath, 'video/mp4');

        // Upload Thumbnail
        const storageThumbPath = `${folderName}/thumbnails/${uniqueFileName}_thumb.jpg`;
        const publicThumbUrl = await uploadToSupabase(thumbPath, storageThumbPath, 'image/jpeg');

        // Save Record
        await saveMediaRecord({
          folder: folderName,
          file_name: `${uniqueFileName}.mp4`,
          original_name: file,
          file_size: videoSize,
          mime_type: 'video/mp4',
          media_type: 'video',
          public_url: publicVideoUrl,
          thumbnail_url: publicThumbUrl,
        });

        // Cleanup temp files
        fs.unlinkSync(videoPath);
        fs.unlinkSync(thumbPath);

      } else if (isImage) {
        // Images are uploaded directly for now. Future implementations can resize here.
        console.log(`\nProcessing Image: ${file}`);
        const storageImagePath = `${folderName}/images/${uniqueFileName}${parsedPath.ext}`;
        const publicImageUrl = await uploadToSupabase(inputPath, storageImagePath, mimeType);

        await saveMediaRecord({
          folder: folderName,
          file_name: `${uniqueFileName}${parsedPath.ext}`,
          original_name: file,
          file_size: stat.size,
          mime_type: mimeType,
          media_type: 'image',
          public_url: publicImageUrl,
          thumbnail_url: publicImageUrl, // For images, thumb is often just the image itself until we build a resize lambda
        });
      } else {
        console.log(`Skipping unsupported file type: ${file} (${mimeType})`);
      }
    } catch (err) {
      console.error(`✗ Error processing ${file}:`, err);
    }
  }

  console.log("\nMedia Library Sync Complete!");
  
  // Cleanup temp dir
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }
}

main().catch(console.error);
