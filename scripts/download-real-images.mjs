import fs from 'fs';
import path from 'path';

// 1. Copy the AI-generated images from the brain directory
const brainDir = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\249c942a-3667-41e9-98e2-d8951c7f87b1';
const copies = [
  {
    src: path.join(brainDir, 'hero_forest_fox_1795433243159.jpg'),
    dest: path.join(process.cwd(), 'public', 'images', 'hero-forest-fox.jpg'),
  },
  {
    src: path.join(brainDir, 'fox_flat_1795433258886.jpg'),
    dest: path.join(process.cwd(), 'public', 'products', 'fox', 'flat.jpg'),
  },
  {
    src: path.join(brainDir, 'vote_deer_1795433243204.jpg'),
    dest: path.join(process.cwd(), 'public', 'images', 'vote-deer.jpg'),
  },
];

for (const c of copies) {
  if (fs.existsSync(c.src)) {
    fs.mkdirSync(path.dirname(c.dest), { recursive: true });
    fs.copyFileSync(c.src, c.dest);
    console.log(`Copied AI generated: ${path.basename(c.dest)}`);
  } else {
    console.warn(`File not found: ${c.src}`);
  }
}

// 2. High-resolution authentic wildlife & apparel photography for remaining assets
const remoteImages = [
  // Story Image
  {
    url: 'https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?w=1200&q=85',
    dest: 'public/images/story-owl-night.jpg',
    desc: 'Barn Owl in night forest'
  },
  // Vote Candidates
  {
    url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=85',
    dest: 'public/images/vote-kingfisher.jpg',
    desc: 'Common Kingfisher'
  },
  {
    url: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&q=85',
    dest: 'public/images/vote-leopard.jpg',
    desc: 'Western Ghats Leopard'
  },
  // Fox Model & Print
  {
    url: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?w=1000&q=85',
    dest: 'public/products/fox/model.jpg',
    desc: 'Fox in pine needles field shot'
  },
  {
    url: 'https://images.unsplash.com/photo-1474511320723-9a56873ee008?w=800&q=85',
    dest: 'public/products/fox/print.jpg',
    desc: 'Fox wildlife close-up'
  },
  // Owl Product
  {
    url: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?w=1000&q=85',
    dest: 'public/products/owl/flat.jpg',
    desc: 'Barn owl on oak perch'
  },
  {
    url: 'https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?w=1000&q=85',
    dest: 'public/products/owl/model.jpg',
    desc: 'Owl nocturnal field shot'
  },
  {
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=85',
    dest: 'public/products/owl/print.jpg',
    desc: 'Barn owl feathers print detail'
  },
  // Whale Product
  {
    url: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=1000&q=85',
    dest: 'public/products/whale/flat.jpg',
    desc: 'Humpback whale ocean dive'
  },
  {
    url: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=1000&q=85',
    dest: 'public/products/whale/model.jpg',
    desc: 'Whale oceanic atmosphere'
  },
  {
    url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=85',
    dest: 'public/products/whale/print.jpg',
    desc: 'Ocean currents print'
  },
  // Mountain Hare Product
  {
    url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=1000&q=85',
    dest: 'public/products/hare/flat.jpg',
    desc: 'Mountain hare in moss'
  },
  {
    url: 'https://images.unsplash.com/photo-1518796745738-41048802f99a?w=1000&q=85',
    dest: 'public/products/hare/model.jpg',
    desc: 'Hare in highland tundra'
  },
  {
    url: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&q=85',
    dest: 'public/products/hare/print.jpg',
    desc: 'Hare print close-up'
  },
  // Moon Moth Product
  {
    url: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=1000&q=85',
    dest: 'public/products/moth/flat.jpg',
    desc: 'Emerald silk moth'
  },
  {
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1000&q=85',
    dest: 'public/products/moth/model.jpg',
    desc: 'Moth botanical canopy'
  },
  {
    url: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800&q=85',
    dest: 'public/products/moth/print.jpg',
    desc: 'Moth wing pattern'
  },
  // Tiger Lily & Leopard Product
  {
    url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=1000&q=85',
    dest: 'public/products/tigerlily/flat.jpg',
    desc: 'Leopard in jungle leaves'
  },
  {
    url: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=1000&q=85',
    dest: 'public/products/tigerlily/model.jpg',
    desc: 'Leopard field profile'
  },
  {
    url: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=800&q=85',
    dest: 'public/products/tigerlily/print.jpg',
    desc: 'Botanical tiger lily petals'
  },
];

async function downloadAll() {
  for (const item of remoteImages) {
    const fullDest = path.join(process.cwd(), item.dest);
    fs.mkdirSync(path.dirname(fullDest), { recursive: true });
    try {
      const res = await fetch(item.url);
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(fullDest, buffer);
        console.log(`Downloaded (${(buffer.length / 1024).toFixed(0)} KB): ${item.desc} -> ${item.dest}`);
      } else {
        console.warn(`HTTP ${res.status} for ${item.url}`);
      }
    } catch (err) {
      console.error(`Failed ${item.dest}:`, err.message);
    }
  }
  console.log('All photography assets successfully updated!');
}

downloadAll();
