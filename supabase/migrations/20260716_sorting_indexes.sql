-- Database indexing for sorting and ordering columns
-- Targets high-frequency ORDER BY display_order/sort_order clauses to speed up frontend loading queries

-- 1. Index display_order on packages and categories catalog
CREATE INDEX IF NOT EXISTS packages_display_order_idx ON public.packages(display_order);
CREATE INDEX IF NOT EXISTS package_categories_display_order_idx ON public.package_categories(display_order);

-- 2. Index display_order on global content tables (faqs, testimonials, contact offices)
CREATE INDEX IF NOT EXISTS faqs_display_order_idx ON public.faqs(display_order);
CREATE INDEX IF NOT EXISTS testimonials_display_order_idx ON public.testimonials(display_order);
CREATE INDEX IF NOT EXISTS contact_offices_display_order_idx ON public.contact_offices(display_order);

-- 3. Index sort_order / display_order on page building architectures
CREATE INDEX IF NOT EXISTS page_sections_sort_order_idx ON public.page_sections(sort_order);
CREATE INDEX IF NOT EXISTS navigation_links_display_order_idx ON public.navigation_links(display_order);
