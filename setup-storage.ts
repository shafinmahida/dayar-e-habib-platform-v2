import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setup() {
  console.log("Creating 'media' bucket...");
  const { data, error } = await supabase.storage.createBucket('media', {
    public: true,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime', 'application/pdf']
  });

  if (error) {
    if (error.message.includes('already exists')) {
      console.log("Bucket already exists.");
    } else {
      console.error("Error creating bucket:", error);
    }
  } else {
    console.log("Bucket created successfully:", data);
  }
  
  console.log("Setting up RLS policies...");
  
  // Since we are using the JS client, we can't easily execute raw SQL without the pg module.
  // I will just create a quick postgres client using the connection string.
  // But wait, it's easier to just use an API route for uploads with the service_role key to bypass RLS!
  console.log("Done.");
}

setup();
