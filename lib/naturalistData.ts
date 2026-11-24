export interface SpeciesDetail {
  id: string;
  binomial: string;
  iucnStatus: "LC" | "NT" | "VU" | "EN" | "CR";
  iucnLabel: string;
  conservationStory: string;
  dyeOrigin: {
    pigment: string;
    source: string;
    process: string;
  };
  printSpecs: {
    dimensions: string;
    technique: string;
    cureTemp: string;
  };
  audioNote: string;
  sketchUrl: string;
  weightGsm: number;
}

export const SPECIES_FIELD_RECORDS: Record<string, SpeciesDetail> = {
  "fox-in-the-pines": {
    id: "fox-in-the-pines",
    binomial: "Vulpes vulpes montana",
    iucnStatus: "LC",
    iucnLabel: "Least Concern",
    conservationStory: "Protected under Schedule II of Indian Wildlife Protection Act. Thrives across coniferous sub-alpine belts of Jammu & Kashmir and Himachal Pradesh.",
    dyeOrigin: {
      pigment: "Pine Cone Charcoal & Chlorophyll",
      source: "Upcycled fallen Himalayan pine cones & wild nettle leaves",
      process: "Low-temperature mineral extraction, zero toxic petrochemical mordants",
    },
    printSpecs: {
      dimensions: "11.2\" × 14.5\" (Chest Center)",
      technique: "4-Pass Water-Based Discharge Screen-print (zero plastic handfeel)",
      cureTemp: "Air-cured with solar thermal drying",
    },
    audioNote: "High-frequency dawn territorial call echoing through alpine mist",
    sketchUrl: "/images/hero-fox.jpg",
    weightGsm: 180,
  },
  "night-owl": {
    id: "night-owl",
    binomial: "Tyto alba stertens",
    iucnStatus: "LC",
    iucnLabel: "Least Concern",
    conservationStory: "Essential nocturnal predator keeping agricultural rodent populations in balance across central Indian oak woodlands and old-growth groves.",
    dyeOrigin: {
      pigment: "Charcoal Mineral & Oak Gall",
      source: "Naturally shed oak galls and activated coconut husk carbon",
      process: "Traditional cold-soak mordanting with alum salts",
    },
    printSpecs: {
      dimensions: "12.0\" × 15.0\" (Full Front Specimen)",
      technique: "High-density soft touch water-base print with micro-stipple detailing",
      cureTemp: "Natural solar-assisted chamber cure",
    },
    audioNote: "Subtle raspy screech and feather-dampened silent wing glide",
    sketchUrl: "/products/owl/print.jpg",
    weightGsm: 200,
  },
  "humpback-drift": {
    id: "humpback-drift",
    binomial: "Megaptera novaeangliae",
    iucnStatus: "LC",
    iucnLabel: "Least Concern (Arabian Sea sub-pop Endangered)",
    conservationStory: "The Arabian Sea subpopulation remains genetically isolated and non-migratory. Critical tracking projects monitor acoustic corridors off Maharashtra & Goa.",
    dyeOrigin: {
      pigment: "Natural Fermented Indigofera",
      source: "Indigofera tinctoria plants fermented in Tamil Nadu clay vats",
      process: "Zero synthetic sodium hydrosulfite; fermented with jaggery and lime",
    },
    printSpecs: {
      dimensions: "10.8\" × 13.8\" (Back Field Specimen + Left Chest Crest)",
      technique: "Artisan block-inspired screen matrix with feathered ocean wave halftones",
      cureTemp: "Low-energy radiant heat drying",
    },
    audioNote: "Deep low-frequency oceanic harmonic whale song (15–400 Hz)",
    sketchUrl: "/products/whale/print.jpg",
    weightGsm: 190,
  },
  "mountain-hare": {
    id: "mountain-hare",
    binomial: "Lepus timidus",
    iucnStatus: "LC",
    iucnLabel: "Least Concern",
    conservationStory: "Master of camouflage navigating scree slopes and sub-zero blizzard ridges in high-altitude trans-Himalayan plateaus.",
    dyeOrigin: {
      pigment: "Pebble Ochre & Madder Root",
      source: "Rubia cordifolia (Indian Madder) and iron-rich riverbed clay",
      process: "Artisanal root infusion yielding warm alpine terracotta tones",
    },
    printSpecs: {
      dimensions: "11.0\" × 14.0\" (Chest Specimen)",
      technique: "Water-based discharge with breathable micro-dots",
      cureTemp: "Steam set and pre-washed in mountain river water",
    },
    audioNote: "Gentle thump alert on dry tundra moss and frost crust",
    sketchUrl: "/products/hare/print.jpg",
    weightGsm: 180,
  },
  "midnight-moth": {
    id: "midnight-moth",
    binomial: "Actias selene (Indian Moon Moth)",
    iucnStatus: "LC",
    iucnLabel: "Least Concern",
    conservationStory: "Ethereal emerald-tailed silk moth of the shola forests and Western Ghats. Adults live for only 7–10 days solely to pollinate nocturnal blossoms.",
    dyeOrigin: {
      pigment: "Acacia Bark & Myrobalan",
      source: "Naturally shed Acacia nilotica bark and dried gooseberry tannin",
      process: "Vegetable tannin fixative with zero heavy metal binders",
    },
    printSpecs: {
      dimensions: "12.5\" × 13.5\" (Center Specimen)",
      technique: "Multi-layered water-base with micro-registered wing veining",
      cureTemp: "Solar tunnel convection curing",
    },
    audioNote: "Soft velvet flutter of long-tailed silk wings against night foliage",
    sketchUrl: "/products/moth/print.jpg",
    weightGsm: 180,
  },
  "tiger-lily": {
    id: "tiger-lily",
    binomial: "Lilium lancifolium",
    iucnStatus: "VU",
    iucnLabel: "Vulnerable in Wild",
    conservationStory: "Wild botanical species threatened by deforestation and over-foraging. Conserved in sacred botanical groves across Northeast India.",
    dyeOrigin: {
      pigment: "Marigold Petal & Pomegranate Rind",
      source: "Upcycled temple marigold flowers and dried pomegranate skins",
      process: "Zero waste floral extraction; spent flowers composted into organic fertilizer",
    },
    printSpecs: {
      dimensions: "10.5\" × 15.2\" (Vertical Botanical Plate)",
      technique: "Botanical plate screen reproduction with water-permeable pigments",
      cureTemp: "Gentle warm air bake",
    },
    audioNote: "Whispering breeze through highland petals and wild grassland stalks",
    sketchUrl: "/products/tigerlily/print.jpg",
    weightGsm: 195,
  },
};
