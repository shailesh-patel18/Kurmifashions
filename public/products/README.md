# Product Photography & Asset Specifications for KURMI.FASHIONS

Until you drop in final camera photography, clean SVG vector mockups are automatically rendered for all 6 catalog species.

When replacing these with real photography, export high-resolution WebP images according to the specification table below.

## Recommended File Format & Dimensions
- **Format**: WebP (preferred) or AVIF, with fallback JPG.
- **Dimensions**: `1600 x 2000 px` (4:5 portrait ratio for model and flat lay) or `1600 x 1600 px` (1:1 square for print close-ups).
- **Color Profile**: sRGB.
- **Compression**: 82–85% quality, strip non-essential EXIF metadata.
- **File size target**: Under 240 KB per image.

---

## Required Shot Types per Species

| Shot Type | Path / Filename | Description | Lighting & Background |
|-----------|-----------------|-------------|-----------------------|
| **1. Flat Lay** | `/products/[id]/flat.webp` | Clean top-down flat lay of the folded or flat garment. | Natural soft daylight, warm neutral cream `#F6F1E7` or stone background. |
| **2. Model / Field Shot** | `/products/[id]/model.webp` | On-body studio or outdoor shot in a natural habitat setting (woods, rock, grassland). | Warm golden hour light, relaxed grounded stance. |
| **3. Print Close-Up** | `/products/[id]/print.webp` (or `.svg`) | Crisp macro shot of the screen-printed / water-based ink illustration on combed cotton. | Raking light highlighting ink texture and fabric weave. |
| **4. Fabric Detail (Optional)** | `/products/[id]/fabric.webp` | Macro shot of collar stitching, 180 GSM cotton rib, or cotton-linen texture. | Studio macro lens, 1:1 ratio. |

---

## Directory Inventory

```text
public/products/
├── fox/
│   ├── flat.svg (or flat.webp)
│   ├── model.svg (or model.webp)
│   └── print.svg (or print.webp)
├── owl/
│   ├── flat.svg
│   ├── model.svg
│   └── print.svg
├── whale/
│   ├── flat.svg
│   ├── model.svg
│   └── print.svg
├── hare/
│   ├── flat.svg
│   ├── model.svg
│   └── print.svg
├── moth/
│   ├── flat.svg
│   ├── model.svg
│   └── print.svg
└── tigerlily/
    ├── flat.svg
    ├── model.svg
    └── print.svg
```

*Note: Once you upload real `.webp` images into these folders, update the image paths in `/data/products.json` if necessary, or simply keep the same filenames.*
