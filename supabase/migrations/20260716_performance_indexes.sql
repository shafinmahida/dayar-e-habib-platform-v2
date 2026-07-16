-- Performance Indexing & Schema Normalization Migration
-- Targets high-frequency query filters, joins, and database standardizations

-- 1. Create B-Tree indexes for foreign keys (improves JOINs and cascade checks)
CREATE INDEX IF NOT EXISTS page_sections_page_id_idx ON public.page_sections(page_id);
CREATE INDEX IF NOT EXISTS packages_category_id_idx ON public.packages(category_id);
CREATE INDEX IF NOT EXISTS audit_logs_user_id_idx ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS navigation_links_parent_id_idx ON public.navigation_links(parent_id);

-- 2. Create indexes for highly filtered query columns
CREATE INDEX IF NOT EXISTS enquiries_status_idx ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS media_assets_folder_idx ON public.media_assets(folder);
CREATE INDEX IF NOT EXISTS admin_sessions_login_at_idx ON public.admin_sessions(login_at);

-- 3. Normalize Enlightenment Places Table Schema
-- Replace uuid_generate_v4() default with standard gen_random_uuid() which doesn't require uuid-ossp extension
ALTER TABLE public.enlightenment_places 
  ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- Add updated_at column for audit tracking if not already present
ALTER TABLE public.enlightenment_places 
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
