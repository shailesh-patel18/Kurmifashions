# KURMI.FASHIONS (Production-Grade Demand Validation Website)

> **"Wear the wild. Carry the calm."**  
> Pre-launch demand validation D2C brand for men's and women's shirts and tees with original nature and wildlife illustrations.

---

## 🌿 Core Business Model (Non-Negotiable)

This is a **demand-validation platform**, not an active eCommerce store:
- **Zero Cart & Zero Checkout:** No credit cards, payment gateways, stock countdowns, or shipping promises anywhere in the UI or codebase.
- **Inquiry-Driven:** Visitors explore species designs and submit inquiries (design, fit, size, quantity).
- **1,000 Supporter Threshold:** When 1,000 genuine inquiries are reached across designs, sustainable manufacturing for Drop 01 begins.
- **Pre-Launch Transparency:** Every page clarifies that ₹0 is charged today. Production begins only upon hitting the community milestone.
- **Truth in Numbers:** Progress counts reflect real database records (0 initially until real supporters pledge). Sample mockups are visibly marked "Sample".

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS with CSS Variable design system tokens (`tokens.css`)
- **Motion:** Framer Motion + GSAP ScrollTrigger for hero parallax (transform & opacity only)
- **Illustrations:** Hand-crafted layered inline SVG React components (`<g id="fox-tail">`, `<g id="fox-ears">`, etc.)
- **Data & Storage:** Supabase (Postgres) with Row Level Security (RLS) + automatic local persistent fallback (`.data/db.json`)
- **Validation:** Zod client & server schemas + React Hook Form
- **Google Sheets Mirror:** Server-side webhook mirror on new inquiries
- **Testing:** Vitest (unit/schema tests) + Playwright (end-to-end flows) + Axe (accessibility)

---

## 🚀 Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Component Library
Visit [http://localhost:3000/dev/components](http://localhost:3000/dev/components) to view all UI components, tokens, swatches, and type scales in light and dark mode.

### 4. Admin Operations Dashboard
Visit [http://localhost:3000/admin](http://localhost:3000/admin).  
Default sandbox passcode: `kurmi_admin_secret_2026`.

### 5. Run Unit & Schema Tests
```bash
npm run test
```

### 6. Run Playwright E2E Tests
```bash
npm run test:e2e
```

---

## 📚 Documentation Index

1. [**DATA-MODEL.md**](/docs/DATA-MODEL.md): Postgres tables, views, RLS policies, and DPDP Act compliance.
2. [**DEPLOY.md**](/docs/DEPLOY.md): Step-by-step Vercel deployment, Supabase setup, and Google Sheet webhook mirror.
3. [**ADD-A-PRODUCT.md**](/docs/ADD-A-PRODUCT.md): How to add a new wildlife species design in 2 minutes without writing code.
4. [**Product Image Specs**](/public/products/README.md): Photography requirements, shot types, WebP sizing (1600px).
