-- Create the media bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS for the storage.objects table if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to the media bucket
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'media' );

-- Allow authenticated users to insert files into the media bucket
CREATE POLICY "Authenticated users can upload media" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'media' AND auth.role() = 'authenticated' );

-- Allow authenticated users to update files in the media bucket
CREATE POLICY "Authenticated users can update media" 
ON storage.objects FOR UPDATE 
USING ( bucket_id = 'media' AND auth.role() = 'authenticated' );

-- Allow authenticated users to delete files in the media bucket
CREATE POLICY "Authenticated users can delete media" 
ON storage.objects FOR DELETE 
USING ( bucket_id = 'media' AND auth.role() = 'authenticated' );
