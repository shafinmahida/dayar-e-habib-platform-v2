-- Add a dedicated cover_image column to the packages table
-- This separates the main thumbnail/cover from the gallery images (image_url)

ALTER TABLE public.packages
ADD COLUMN IF NOT EXISTS cover_image TEXT;
