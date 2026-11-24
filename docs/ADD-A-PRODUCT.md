# How to Add a New Wildlife Species to KURMI.FASHIONS

Adding a new garment design requires **zero code changes**. All catalog products are strictly data-driven via `/data/products.json` and validated with Zod at build time.

---

## Step 1: Open `/data/products.json`

Add a new JSON object entry to the array:

```json
{
  "id": "kingfisher-stream",
  "name": "River Kingfisher",
  "species": "Alcedo atthis (Common kingfisher)",
  "habitat": "Clear riverbanks & mangrove creeks",
  "story": "A brilliant sapphire dart plunging through glass-clear waters in an instant.",
  "gender": ["men", "women"],
  "garment": "shirt",
  "fit": "relaxed",
  "fabric": "70% organic cotton, 30% linen, 160 GSM",
  "colors": [
    { "name": "River Cobalt", "hex": "#1B4F72" },
    { "name": "Terracotta Ochre", "hex": "#D2693A" }
  ],
  "sizes": ["S", "M", "L", "XL", "XXL"],
  "expectedPriceINR": 1499,
  "tag": "Concept",
  "images": {
    "flat": "/products/kingfisher/flat.svg",
    "alt": "/products/kingfisher/model.svg",
    "print": "/products/kingfisher/print.svg"
  },
  "altText": "River kingfisher diving through water lilies on a linen-blend shirt",
  "status": "concept"
}
```

---

## Step 2: Add Image Assets in `/public/products/`

Create a folder matching your `id`:
```text
public/products/kingfisher/
├── flat.webp (or flat.svg)
├── model.webp (or model.svg)
└── print.webp (or print.svg)
```

See [`/public/products/README.md`](/public/products/README.md) for photography specifications (1600px, 4:5 ratio, sRGB, WebP).

---

## Step 3: Verify Build

Run the type and schema validation test:
```bash
npm run test
```
If your fields match the Zod schema, the new species will automatically appear in:
1. The field designs catalog grid with active filters
2. Category collections
3. Search and sort dropdowns
4. Product detail views (`/designs/[id]`)
5. The interest list drawer and inquiry submission flow
