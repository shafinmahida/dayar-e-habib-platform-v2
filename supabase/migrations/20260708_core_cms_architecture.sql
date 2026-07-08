-- Dayar-E-Habib Private CMS Core Architecture Migration
-- Contains Global Settings, Site Architecture, Global Content, Package Management, and Audit Logging

-- ==========================================
-- 0. TYPES & ENUMS
-- ==========================================
CREATE TYPE publish_status AS ENUM ('draft', 'published', 'archived');

-- ==========================================
-- 1. SYSTEM ARCHITECTURE & AUDIT LOGS
-- ==========================================

-- 1A. Profiles (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'Admin' CHECK (role IN ('Owner', 'Admin', 'Editor', 'Support')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- 1B. Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    old_data JSONB,
    new_data JSONB,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generic trigger function to record audit logs
CREATE OR REPLACE FUNCTION audit_log_trigger() RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO public.audit_logs (table_name, record_id, action, old_data, user_id)
        VALUES (TG_TABLE_NAME, OLD.id, TG_OP, row_to_json(OLD)::jsonb, auth.uid());
        RETURN OLD;
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO public.audit_logs (table_name, record_id, action, old_data, new_data, user_id)
        VALUES (TG_TABLE_NAME, NEW.id, TG_OP, row_to_json(OLD)::jsonb, row_to_json(NEW)::jsonb, auth.uid());
        RETURN NEW;
    ELSIF (TG_OP = 'INSERT') THEN
        INSERT INTO public.audit_logs (table_name, record_id, action, new_data, user_id)
        VALUES (TG_TABLE_NAME, NEW.id, TG_OP, row_to_json(NEW)::jsonb, auth.uid());
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ==========================================
-- 2. GLOBAL SETTINGS & CONFIGURATION
-- ==========================================
CREATE TABLE IF NOT EXISTS public.company_profile (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    legal_name TEXT NOT NULL,
    established_year TEXT NOT NULL,
    license_number TEXT,
    registrations JSONB DEFAULT '[]'::jsonb, -- array of strings
    description TEXT NOT NULL,
    slogan TEXT,
    active BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_name TEXT NOT NULL,
    site_description TEXT NOT NULL,
    announcement_enabled BOOLEAN DEFAULT false,
    announcement_text TEXT,
    announcement_storage_key TEXT,
    seo_keywords JSONB DEFAULT '[]'::jsonb,
    active_theme TEXT DEFAULT 'system',
    maintenance_mode BOOLEAN DEFAULT false,
    enable_bookings BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.contact_offices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    map_link TEXT,
    working_hours TEXT,
    active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.contact_specialists (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    department TEXT UNIQUE NOT NULL, -- e.g., 'brand', 'hajj', 'flights'
    name TEXT,
    role TEXT NOT NULL,
    phone TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.social_links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    platform TEXT UNIQUE NOT NULL, -- 'facebook', 'whatsapp', etc.
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ==========================================
-- 3. SITE ARCHITECTURE & PAGES
-- ==========================================

CREATE TABLE IF NOT EXISTS public.pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  status publish_status DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.page_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID REFERENCES public.pages(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  properties JSONB NOT NULL DEFAULT '{}'::jsonb,
  content JSONB DEFAULT '{}'::jsonb,
  status publish_status DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.navigation_links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    parent_id UUID REFERENCES public.navigation_links(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    href TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    status publish_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.footer_sections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    links JSONB DEFAULT '[]'::jsonb, -- array of {label, href}
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ==========================================
-- 4. GLOBAL REUSABLE CONTENT
-- ==========================================
CREATE TABLE IF NOT EXISTS public.content_blocks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content JSONB NOT NULL, -- rich text or structured HTML
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.destinations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    search_vector tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(country, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(description, '')), 'C')
    ) STORED
);
CREATE INDEX IF NOT EXISTS destinations_search_idx ON public.destinations USING GIN (search_vector);

CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    search_vector tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(question, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(answer, '')), 'B')
    ) STORED
);
CREATE INDEX IF NOT EXISTS faqs_search_idx ON public.faqs USING GIN (search_vector);

CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    package_type TEXT NOT NULL,
    content TEXT NOT NULL,
    active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.representatives (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    image_url TEXT,
    video_url TEXT,
    phone TEXT,
    email TEXT,
    department_slug TEXT,
    is_scholar BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    search_vector tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(role, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(bio, '')), 'C')
    ) STORED
);
CREATE INDEX IF NOT EXISTS representatives_search_idx ON public.representatives USING GIN (search_vector);


-- ==========================================
-- 5. PACKAGE MANAGEMENT SYSTEM
-- ==========================================
CREATE TABLE IF NOT EXISTS public.package_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.packages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    category_id UUID REFERENCES public.package_categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    duration TEXT NOT NULL,
    highlights JSONB DEFAULT '[]'::jsonb, -- string array
    availability TEXT NOT NULL DEFAULT 'Open',
    price_min DECIMAL(10,2),
    price_currency TEXT,
    image_url TEXT,
    video_url TEXT,
    
    -- Relational ID Arrays (storing multiple foreign keys as a native Postgres UUID array)
    destination_ids UUID[] DEFAULT '{}',
    representative_ids UUID[] DEFAULT '{}',
    gallery_media_ids UUID[] DEFAULT '{}',
    
    -- Complex JSONB Structures
    itinerary JSONB DEFAULT '[]'::jsonb,
    inclusions JSONB DEFAULT '[]'::jsonb,
    complimentary JSONB DEFAULT '[]'::jsonb,
    exclusions JSONB DEFAULT '[]'::jsonb,
    hotels JSONB DEFAULT '[]'::jsonb,
    flights JSONB DEFAULT '[]'::jsonb,
    faqs JSONB DEFAULT '[]'::jsonb, -- can contain both custom faqs and referenced global faq IDs
    
    -- Admin & Workflow
    status publish_status DEFAULT 'draft',
    is_template BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    
    -- SEO
    seo_title TEXT,
    seo_description TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Search Vector for CMS Universal Search
    search_vector tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(duration, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(seo_description, '')), 'C')
    ) STORED
);
CREATE INDEX IF NOT EXISTS packages_search_idx ON public.packages USING GIN (search_vector);


-- ==========================================
-- 6. APPLY AUDIT TRIGGERS
-- ==========================================
CREATE TRIGGER audit_company_profile AFTER INSERT OR UPDATE OR DELETE ON public.company_profile FOR EACH ROW EXECUTE FUNCTION audit_log_trigger();
CREATE TRIGGER audit_site_settings AFTER INSERT OR UPDATE OR DELETE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION audit_log_trigger();
CREATE TRIGGER audit_packages AFTER INSERT OR UPDATE OR DELETE ON public.packages FOR EACH ROW EXECUTE FUNCTION audit_log_trigger();
CREATE TRIGGER audit_content_blocks AFTER INSERT OR UPDATE OR DELETE ON public.content_blocks FOR EACH ROW EXECUTE FUNCTION audit_log_trigger();
CREATE TRIGGER audit_navigation AFTER INSERT OR UPDATE OR DELETE ON public.navigation_links FOR EACH ROW EXECUTE FUNCTION audit_log_trigger();
CREATE TRIGGER audit_pages AFTER INSERT OR UPDATE OR DELETE ON public.pages FOR EACH ROW EXECUTE FUNCTION audit_log_trigger();
CREATE TRIGGER audit_page_sections AFTER INSERT OR UPDATE OR DELETE ON public.page_sections FOR EACH ROW EXECUTE FUNCTION audit_log_trigger();


-- ==========================================
-- 7. ROW LEVEL SECURITY (RLS)
-- ==========================================
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_offices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_specialists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.representatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Create generic policies (Public reads allowed for non-audit tables, Authenticated does everything)
DO $$
DECLARE
    t_name text;
BEGIN
    FOR t_name IN 
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name NOT IN ('audit_logs', 'profiles')
    LOOP
        EXECUTE format('CREATE POLICY "Public can view %I" ON public.%I FOR SELECT USING (true);', t_name, t_name);
        EXECUTE format('CREATE POLICY "Authenticated users can manage %I" ON public.%I FOR ALL USING (auth.role() = ''authenticated'');', t_name, t_name);
    END LOOP;
END
$$;

-- Audit Logs are strictly admin-only
CREATE POLICY "Authenticated users can view audit logs" ON public.audit_logs FOR SELECT USING (auth.role() = 'authenticated');
-- No one can update/delete audit logs, not even admins (true immutability)
