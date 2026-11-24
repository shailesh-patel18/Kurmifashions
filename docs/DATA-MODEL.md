# Data Model & Compliance Architecture

KURMI.FASHIONS utilizes a PostgreSQL schema with Row Level Security (RLS) and is designed to comply with India's **Digital Personal Data Protection (DPDP) Act, 2023**.

## 1. Schema Diagram & Tables

### `inquiries`
Stores visitor inquiries for the pre-launch drop.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique inquiry record ID |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | Submission timestamp |
| `name` | TEXT | NOT NULL | Supporter full name |
| `whatsapp` | TEXT | NOT NULL | 10-digit Indian phone number (+91) |
| `email` | TEXT | NULL | Optional email address |
| `city` | TEXT | NOT NULL | Supporter's city/town |
| `preferred_contact` | TEXT | CHECK IN ('whatsapp', 'email') | Communication channel preference |
| `message` | TEXT | NULL | Optional notes (max 500 chars) |
| `consent_at` | TIMESTAMPTZ | NOT NULL | Exact timestamp of explicit consent |
| `consent_text_version` | TEXT | NOT NULL | Version of consent notice agreed to |
| `referral_code` | TEXT | UNIQUE, NOT NULL | Unique referral code (e.g. `KURMI-A1B2C`) |
| `referred_by` | TEXT | NULL | Referral code of inviter |
| `status` | TEXT | CHECK IN ('new', 'contacted', 'converted') | Lead status |
| `source` | TEXT | NULL | UTM source |
| `ip_hash` | TEXT | NOT NULL | SHA-256 hash of IP with salt (raw IP never stored) |
| `user_agent` | TEXT | NULL | Browser user agent for fraud detection |

### `inquiry_items`
Normalizes individual species pledges per inquiry.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique item ID |
| `inquiry_id` | UUID | REFERENCES inquiries(id) ON DELETE CASCADE | Associated inquiry |
| `product_id` | TEXT | NOT NULL | Catalog product ID (e.g. `fox-in-the-pines`) |
| `size` | TEXT | CHECK IN ('XS', 'S', 'M', 'L', 'XL', 'XXL') | Pledged garment size |
| `quantity` | INT | CHECK (quantity BETWEEN 1 AND 10) | Pledged garment quantity |

### `subscribers`
Quick email drop alerts (hero and footer forms).

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `email` | TEXT | UNIQUE, NOT NULL |
| `created_at` | TIMESTAMPTZ | NOT NULL |
| `consent_at` | TIMESTAMPTZ | NOT NULL |

### `votes`
Community next-species voting.

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | UUID | PRIMARY KEY |
| `candidate_id` | TEXT | NOT NULL |
| `device_hash` | TEXT | NOT NULL |
| `created_at` | TIMESTAMPTZ | NOT NULL |
| *Constraint* | UNIQUE(candidate_id, device_hash) | Enforces one vote per candidate per device |

---

## 2. Row Level Security (RLS)

- **Public (anon):** Has `INSERT` permission only. Public users **cannot** read raw inquiry rows, protecting supporter names and phone numbers.
- **Aggregated Stats:** Public views and API routes return counts and percentages only.
- **Admin:** Authenticated through Supabase Auth or admin secret bearer tokens.

---

## 3. DPDP Act Alignment

1. **Specified Purpose:** Data is collected solely to validate production thresholds and communicate drop milestones.
2. **Versioned Explicit Consent:** Every submission records `consent_text_version` (`v1.0-dpdp-compliant`).
3. **Data Minimization:** Raw IP addresses are hashed using SHA-256 with a secret salt.
4. **Right to Erasure:** Dedicated deletion request endpoint / email `privacy@kurmi.fashions`.
5. **Retention Policy:** Unconverted leads purged after 12 months.
