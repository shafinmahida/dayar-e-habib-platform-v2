-- Generic Media Assets Schema for Dayar-E-Habib Control Center

-- Drop the old gallery-specific logic if it existed (from previous iterations, though we didn't create a gallery_media table yet)
-- CREATE TABLE IF NOT EXISTS public.media_assets

CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  folder TEXT NOT NULL DEFAULT 'uncategorized', -- e.g., 'homepage', 'gallery', 'packages', 'hotels'
  file_name TEXT NOT NULL,
  original_name TEXT,
  file_size BIGINT,
  mime_type TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video', 'document', 'audio', 'other')),
  public_url TEXT NOT NULL,
  thumbnail_url TEXT, -- For videos, or downscaled images
  properties JSONB NOT NULL DEFAULT '{}'::jsonb, -- e.g., { "width": 1920, "height": 1080, "duration": 12.5 }
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Secure media_assets table with RLS
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- Public can view all media assets (since they are used on the website)
CREATE POLICY "Public can view all media assets" 
  ON public.media_assets FOR SELECT 
  USING (true);

-- Only authenticated users (Admins/Owners) can insert/update/delete media
CREATE POLICY "Authenticated users can manage media assets" 
  ON public.media_assets FOR ALL 
  USING (auth.role() = 'authenticated');
