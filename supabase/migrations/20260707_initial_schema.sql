-- Initial production schema for Dayar-E-Habib Control Center

-- 1. Profiles (Extends auth.users for application-specific data)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'Admin' CHECK (role IN ('Owner', 'Admin', 'Editor', 'Support')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Secure profiles table with RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles" 
  ON public.profiles FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Trigger to automatically create a profile when a new auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    COALESCE(new.raw_user_meta_data->>'role', 'Admin')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Pages (Architecture for Website Builder)
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published pages"
  ON public.pages FOR SELECT
  USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can modify pages"
  ON public.pages FOR ALL
  USING (auth.role() = 'authenticated');

-- 3. Page Sections (Architecture for Website Builder Blocks)
CREATE TABLE IF NOT EXISTS public.page_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL, -- e.g., 'hero', 'gallery', 'packages'
  sort_order INTEGER NOT NULL DEFAULT 0,
  properties JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published sections"
  ON public.page_sections FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.pages 
      WHERE pages.id = page_sections.page_id 
      AND (pages.is_published = true OR auth.role() = 'authenticated')
    )
  );

CREATE POLICY "Authenticated users can modify sections"
  ON public.page_sections FOR ALL
  USING (auth.role() = 'authenticated');

-- Seed initial Website Builder Architecture
INSERT INTO public.pages (slug, title, is_published) 
VALUES 
  ('home', 'Homepage Index', true),
  ('about', 'About Heritage', true),
  ('faq', 'Global FAQs', true)
ON CONFLICT (slug) DO NOTHING;
