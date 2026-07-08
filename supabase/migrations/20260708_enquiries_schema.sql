-- Sprint 4: Enquiries Schema
-- Creates a secure table for storing customer leads directly in the database to avoid email spam filtering.

CREATE TYPE enquiry_status AS ENUM ('new', 'contacted', 'closed', 'spam');

CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    message TEXT,
    package_title TEXT, -- Optional, if they enquired from a specific package page
    status enquiry_status DEFAULT 'new',
    notes TEXT, -- For admin use (internal notes on the lead)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Secure enquiries table with RLS
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 1. Public can insert enquiries (Anyone can submit a form)
-- We do not require authentication for insertion.
CREATE POLICY "Public can submit enquiries" 
  ON public.enquiries FOR INSERT 
  WITH CHECK (true);

-- 2. Only authenticated admins can view, update, or delete enquiries
CREATE POLICY "Authenticated users can manage enquiries" 
  ON public.enquiries FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update enquiries" 
  ON public.enquiries FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete enquiries" 
  ON public.enquiries FOR DELETE
  USING (auth.role() = 'authenticated');

-- Audit trigger to track when admins change lead status
CREATE TRIGGER audit_enquiries AFTER UPDATE OR DELETE ON public.enquiries FOR EACH ROW EXECUTE FUNCTION audit_log_trigger();
