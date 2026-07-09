-- Add JSONB array for multiple media items (images and videos)
ALTER TABLE public.packages
ADD COLUMN IF NOT EXISTS media_gallery JSONB DEFAULT '[]'::jsonb;
