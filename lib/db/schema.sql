-- PostgreSQL Schema & Row Level Security (RLS) for KURMI.FASHIONS
-- Target database: Supabase / PostgreSQL 15+

-- 1. Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT,
  city TEXT NOT NULL,
  preferred_contact TEXT NOT NULL DEFAULT 'whatsapp' CHECK (preferred_contact IN ('whatsapp', 'email')),
  message TEXT,
  consent_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  consent_text_version TEXT NOT NULL DEFAULT 'v1.0-dpdp-compliant',
  referral_code TEXT UNIQUE NOT NULL,
  referred_by TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted')),
  source TEXT,
  ip_hash TEXT NOT NULL,
  user_agent TEXT
);

-- Index for duplicate checks and fast lookups
CREATE INDEX IF NOT EXISTS idx_inquiries_whatsapp ON public.inquiries(whatsapp);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_referral ON public.inquiries(referral_code);

-- 2. Inquiry Items Table
CREATE TABLE IF NOT EXISTS public.inquiry_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  size TEXT NOT NULL CHECK (size IN ('XS', 'S', 'M', 'L', 'XL', 'XXL')),
  quantity INT NOT NULL CHECK (quantity >= 1 AND quantity <= 10)
);

CREATE INDEX IF NOT EXISTS idx_inquiry_items_inquiry_id ON public.inquiry_items(inquiry_id);
CREATE INDEX IF NOT EXISTS idx_inquiry_items_product_id ON public.inquiry_items(product_id);

-- 3. Subscribers Table (Email alerts)
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  consent_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Votes Table (Next Species Candidate)
CREATE TABLE IF NOT EXISTS public.votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id TEXT NOT NULL,
  device_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(candidate_id, device_hash)
);

-- 5. Aggregated Counters Materialized / View
CREATE OR REPLACE VIEW public.counters AS
SELECT 
  (SELECT COUNT(*) FROM public.inquiries) as total_supporters,
  (SELECT COUNT(*) FROM public.subscribers) as total_subscribers,
  (SELECT COUNT(*) FROM public.votes) as total_votes;

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiry_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- Anonymous public can ONLY insert into inquiries
CREATE POLICY "Public can insert inquiries"
  ON public.inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Anonymous public CANNOT select raw inquiry rows
CREATE POLICY "Public cannot select inquiries"
  ON public.inquiries
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = current_setting('app.admin_email', true));

-- Anonymous public can insert inquiry items
CREATE POLICY "Public can insert inquiry items"
  ON public.inquiry_items
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Anonymous public can insert subscribers
CREATE POLICY "Public can insert subscribers"
  ON public.subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Anonymous public can insert votes
CREATE POLICY "Public can insert votes"
  ON public.votes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
