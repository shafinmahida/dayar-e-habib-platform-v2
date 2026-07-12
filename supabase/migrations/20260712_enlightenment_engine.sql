-- Create the enlightenment_places table
CREATE TABLE IF NOT EXISTS public.enlightenment_places (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT DEFAULT 'Uncategorized',
    short_description TEXT NOT NULL,
    presentation_overview TEXT,
    video_url TEXT,
    gallery_images JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.enlightenment_places ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on enlightenment_places"
ON public.enlightenment_places
FOR SELECT
TO public
USING (true);

-- Allow authenticated users to insert/update/delete (Admin access)
CREATE POLICY "Allow authenticated full access on enlightenment_places"
ON public.enlightenment_places
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
