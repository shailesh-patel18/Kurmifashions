import fs from 'fs';
import path from 'path';

const products = [
  {
    id: 'fox',
    name: 'Fox in the Pines',
    garment: 'tshirt',
    colorHex: '#1F3D2B',
    accentHex: '#D2693A',
    species: 'Vulpes vulpes',
    artName: 'Fox'
  },
  {
    id: 'owl',
    name: 'Night Owl Vigil',
    garment: 'tshirt',
    colorHex: '#161F17',
    accentHex: '#EAE2D0',
    species: 'Tyto alba',
    artName: 'Owl'
  },
  {
    id: 'whale',
    name: 'Humpback Drift',
    garment: 'shirt',
    colorHex: '#1D3B47',
    accentHex: '#C2E2EF',
    species: 'Megaptera novaeangliae',
    artName: 'Whale'
  },
  {
    id: 'hare',
    name: 'Mountain Hare',
    garment: 'tshirt',
    colorHex: '#C05C30',
    accentHex: '#F6F1E7',
    species: 'Lepus timidus',
    artName: 'Hare'
  },
  {
    id: 'moth',
    name: 'Midnight Silk Moth',
    garment: 'shirt',
    colorHex: '#264230',
    accentHex: '#C4DFCB',
    species: 'Actias selene',
    artName: 'Moth'
  },
  {
    id: 'tigerlily',
    name: 'Tiger Lily & Leopard',
    garment: 'tshirt',
    colorHex: '#A85A24',
    accentHex: '#1F3D2B',
    species: 'Lilium lancifolium',
    artName: 'Tiger Lily'
  }
];

function createTshirtSvg(p, variant) {
  const isAlt = variant === 'model';
  return `<svg viewBox="0 0 800 1000" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="teeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="${p.colorHex}" />
        <stop offset="100%" stopColor="${adjustColor(p.colorHex, -25)}" />
      </linearGradient>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="${isAlt ? '#EAE2D0' : '#F6F1E7'}" />
        <stop offset="100%" stopColor="${isAlt ? '#DFD5C0' : '#EDE6D6'}" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="25" stdDeviation="25" flood-color="#000000" flood-opacity="0.12" />
      </filter>
    </defs>
    
    <!-- Background Specimen Card -->
    <rect width="800" height="1000" fill="url(#bgGrad)" />
    
    <!-- Botanical Dotted Specimen Border -->
    <rect x="25" y="25" width="750" height="950" rx="16" fill="none" stroke="#D5CBB7" stroke-width="2" stroke-dasharray="6 6" />
    <text x="50" y="70" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#7A8477" letter-spacing="3">KURMI FIELD SPECIMEN • ${p.species.toUpperCase()}</text>
    <text x="750" y="70" text-anchor="end" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#D2693A">SAMPLE MOCKUP</text>

    <!-- T-Shirt Silhouette with Natural Creases -->
    <g filter="url(#shadow)" transform="translate(100, 110)">
      <!-- Main Shirt Body -->
      <path d="M190 60 C230 85 370 85 410 60 L570 160 L510 270 L440 230 L450 720 C450 740 430 750 410 750 L190 750 C170 750 150 740 150 720 L160 230 L90 270 L30 160 Z" fill="url(#teeGrad)" />
      
      <!-- Collar Band -->
      <path d="M190 60 C240 120 360 120 410 60 C380 90 220 90 190 60 Z" fill="${adjustColor(p.colorHex, -35)}" />
      <path d="M210 70 C250 110 350 110 390 70" stroke="${adjustColor(p.colorHex, 30)}" stroke-width="2" fill="none" opacity="0.6" />

      <!-- Inner Neck Tag -->
      <rect x="270" y="80" width="60" height="40" rx="4" fill="#EAE2D0" opacity="0.9" />
      <text x="300" y="98" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="bold" fill="#1F3D2B">KURMI</text>
      <text x="300" y="112" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" fill="#D2693A">100% COTTON</text>

      <!-- Center Chest Placement Graphic -->
      <g transform="translate(200, 220)">
        <rect x="0" y="0" width="200" height="230" rx="14" fill="${adjustColor(p.colorHex, 18)}" opacity="0.4" />
        <circle cx="100" cy="90" r="60" fill="${p.accentHex}" opacity="0.25" />
        <path d="M60 140 Q100 70 140 140" stroke="${p.accentHex}" stroke-width="4" fill="none" stroke-linecap="round" />
        <circle cx="100" cy="85" r="24" fill="${p.accentHex}" opacity="0.8" />
        <text x="100" y="180" text-anchor="middle" font-family="serif" font-size="16" font-weight="bold" fill="#F6F1E7" letter-spacing="1">${p.name}</text>
        <text x="100" y="200" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#EAE2D0" letter-spacing="2">DEMAND VALIDATION</text>
      </g>
    </g>

    <!-- Bottom Specimen Label -->
    <text x="400" y="925" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#5E665C">180 GSM Bio-Washed Combed Cotton • Field Tested Fit</text>
  </svg>`;
}

function createShirtSvg(p, variant) {
  const isAlt = variant === 'model';
  return `<svg viewBox="0 0 800 1000" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="${p.colorHex}" />
        <stop offset="100%" stopColor="${adjustColor(p.colorHex, -20)}" />
      </linearGradient>
      <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="${isAlt ? '#EAE2D0' : '#F6F1E7'}" />
        <stop offset="100%" stopColor="${isAlt ? '#DFD5C0' : '#EDE6D6'}" />
      </linearGradient>
      <filter id="shadow2" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="25" stdDeviation="25" flood-color="#000000" flood-opacity="0.12" />
      </filter>
    </defs>
    
    <rect width="800" height="1000" fill="url(#bgGrad2)" />
    <rect x="25" y="25" width="750" height="950" rx="16" fill="none" stroke="#D5CBB7" stroke-width="2" stroke-dasharray="6 6" />
    <text x="50" y="70" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#7A8477" letter-spacing="3">KURMI BOTANICAL SHIRT • ${p.species.toUpperCase()}</text>
    <text x="750" y="70" text-anchor="end" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#D2693A">SAMPLE MOCKUP</text>

    <!-- Resort Camp Collar Shirt Silhouette -->
    <g filter="url(#shadow2)" transform="translate(100, 110)">
      <path d="M210 60 L390 60 L570 150 L520 280 L440 240 L445 740 C445 750 435 760 415 760 L185 760 C165 760 155 750 155 740 L160 240 L80 280 L30 150 Z" fill="url(#shirtGrad)" />
      
      <!-- Center Placket & Mother of Pearl Buttons -->
      <line x1="300" y1="120" x2="300" y2="760" stroke="${adjustColor(p.colorHex, -40)}" stroke-width="3" />
      <line x1="315" y1="120" x2="315" y2="760" stroke="${adjustColor(p.colorHex, 20)}" stroke-width="1" opacity="0.4" />
      
      <!-- Buttons -->
      <circle cx="300" cy="220" r="7" fill="#EAE2D0" stroke="#7A8477" stroke-width="1" />
      <circle cx="300" cy="320" r="7" fill="#EAE2D0" stroke="#7A8477" stroke-width="1" />
      <circle cx="300" cy="420" r="7" fill="#EAE2D0" stroke="#7A8477" stroke-width="1" />
      <circle cx="300" cy="520" r="7" fill="#EAE2D0" stroke="#7A8477" stroke-width="1" />
      <circle cx="300" cy="620" r="7" fill="#EAE2D0" stroke="#7A8477" stroke-width="1" />

      <!-- Camp Spread Collar -->
      <polygon points="210,60 300,140 240,160 170,90" fill="${adjustColor(p.colorHex, 15)}" />
      <polygon points="390,60 300,140 360,160 430,90" fill="${adjustColor(p.colorHex, 15)}" />

      <!-- Breast Pocket with Wildlife Patch -->
      <rect x="340" y="230" width="70" height="85" rx="6" fill="${adjustColor(p.colorHex, -15)}" stroke="${adjustColor(p.colorHex, 30)}" stroke-width="1.5" />
      <circle cx="375" cy="265" r="16" fill="${p.accentHex}" opacity="0.7" />

      <!-- Back Graphic / Pattern motif -->
      <g transform="translate(170, 340)" opacity="0.35">
        <circle cx="60" cy="60" r="40" fill="${p.accentHex}" />
        <circle cx="60" cy="220" r="40" fill="${p.accentHex}" />
      </g>
    </g>

    <text x="400" y="925" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#5E665C">Breathable Cotton-Linen Blend • Relaxed Resort Silhouette</text>
  </svg>`;
}

function createPrintSvg(p) {
  return `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="800" fill="#F6F1E7" />
    <rect x="30" y="30" width="740" height="740" rx="20" fill="#FFFFFF" stroke="#E3DCCB" stroke-width="3" />
    <rect x="50" y="50" width="700" height="700" rx="14" fill="none" stroke="#D2693A" stroke-width="1.5" stroke-dasharray="8 6" />
    
    <text x="400" y="110" text-anchor="middle" font-family="serif" font-size="34" font-weight="bold" fill="#1F3D2B">${p.name}</text>
    <text x="400" y="145" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-style="italic" fill="#5E665C">${p.species}</text>

    <!-- Art Centerpiece -->
    <g transform="translate(150, 180)">
      <circle cx="250" cy="220" r="180" fill="${p.colorHex}" opacity="0.1" />
      <circle cx="250" cy="220" r="130" fill="${p.accentHex}" opacity="0.2" />
      <path d="M150 280 C200 160 300 160 350 280 C320 330 180 330 150 280 Z" fill="${p.colorHex}" />
      <circle cx="250" cy="210" r="50" fill="${p.accentHex}" />
    </g>

    <text x="400" y="690" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#1B1F1A" letter-spacing="4">KURMI BOTANICAL FIELD ARCHIVE • NO. 01</text>
    <text x="400" y="715" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#D2693A">ORIGINAL VECTOR ARTWORK • ALL RIGHTS RESERVED</text>
  </svg>`;
}

function adjustColor(hex, percent) {
  let num = parseInt(hex.replace('#', ''), 16);
  let amt = Math.round(2.55 * percent);
  let R = (num >> 16) + amt;
  let B = ((num >> 8) & 0x00FF) + amt;
  let G = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
}

for (const p of products) {
  const dir = path.join(process.cwd(), 'public', 'products', p.id);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const isTee = p.garment === 'tshirt';
  fs.writeFileSync(path.join(dir, 'flat.svg'), isTee ? createTshirtSvg(p, 'flat') : createShirtSvg(p, 'flat'));
  fs.writeFileSync(path.join(dir, 'model.svg'), isTee ? createTshirtSvg(p, 'model') : createShirtSvg(p, 'model'));
  fs.writeFileSync(path.join(dir, 'print.svg'), createPrintSvg(p));
}

console.log('Successfully generated all 18 product SVG mockups!');
