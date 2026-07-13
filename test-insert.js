const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  lines.forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      process.env[match[1]] = match[2].replace(/^"(.*)"$/, '$1');
    }
  });
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const getYoutubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

async function test() {
  const mediaUrl = "https://youtu.be/-M2-R-mQ5Wc?si=TLjAKYK";
  const mediaTitle = "Him & Her";
  
  const videoId = getYoutubeId(mediaUrl);
  let publicUrl = mediaUrl;
  let thumbnailUrl = null;
  let mediaType = 'link';
  let mimeType = 'external/link';

  console.log("Video ID matched:", videoId);

  if (videoId) {
    publicUrl = `https://www.youtube.com/embed/${videoId}`;
    thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    mediaType = 'video';
    mimeType = 'video/youtube';
  }

  // We don't have a logged-in user in this script, but let's try to insert without created_by or using a dummy if needed.
  // Wait, let's see what insert error we get.
  const { data, error } = await supabase.from('media_assets').insert({
    folder: 'gallery',
    file_name: mediaTitle || `External_Link_${Date.now()}`,
    original_name: mediaUrl,
    mime_type: mimeType,
    media_type: mediaType,
    public_url: publicUrl,
    thumbnail_url: thumbnailUrl
  });

  if (error) {
    console.error("Supabase Error:", error);
  } else {
    console.log("Success:", data);
  }
}

test();
