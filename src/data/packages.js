// ──────────────────────────────────────────────
// LIVZO EXPERIENCES — Centralized Pricing Data
// ──────────────────────────────────────────────
// All prices in INR. Update values here and the
// entire site reflects changes automatically.
// ──────────────────────────────────────────────

export const adventurePackages = [
  {
    id: 'start',
    number: '01',
    name: 'LIVZO Start',
    tagline: 'Your first thrill',
    difficulty: 'Easy',
    activities: '2 Easy',
    price: 2999,
    currency: 'INR',
    featured: false,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    description: 'A gentle introduction to the wild. Perfect for first-timers ready to taste adventure.',
  },
  {
    id: 'explore',
    number: '02',
    name: 'LIVZO Explore',
    tagline: 'Go a little further',
    difficulty: 'Easy–Medium',
    activities: '3 Easy + 2 Medium',
    price: 3499,
    currency: 'INR',
    featured: false,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    description: 'Push past the familiar. More trails, more challenge, more stories to tell.',
  },
  {
    id: 'adventure',
    number: '03',
    name: 'LIVZO Adventure',
    tagline: 'Find your edge',
    difficulty: 'Medium',
    activities: '3 Medium + 2 Easy',
    price: 4499,
    currency: 'INR',
    featured: true,
    image: 'https://images.unsplash.com/photo-1533692328991-08159ff19fca?w=800&q=80',
    description: 'The sweet spot. Enough challenge to feel alive, enough comfort to feel at home.',
  },
  {
    id: 'extreme',
    number: '04',
    name: 'LIVZO Extreme',
    tagline: 'Test your limits',
    difficulty: 'Hard',
    activities: '3 Hard + 3 Medium',
    price: 5999,
    currency: 'INR',
    featured: false,
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80',
    description: 'For those who want more. Steeper climbs, bigger drops, deeper wilderness.',
  },
  {
    id: 'challenge',
    number: '05',
    name: 'LIVZO Challenge',
    tagline: 'Prove yourself',
    difficulty: 'Hard+',
    activities: '5 Hard + 4 Medium',
    price: 7499,
    currency: 'INR',
    featured: false,
    image: 'https://images.unsplash.com/photo-1445307806294-bff7f67ff225?w=800&q=80',
    description: 'Serious terrain for serious adventurers. This is where the stories get real.',
  },
  {
    id: 'ultimate',
    number: '06',
    name: 'LIVZO Ultimate',
    tagline: 'Beyond ordinary',
    difficulty: 'Extreme',
    activities: '8 Hard + 5 Medium',
    price: 9999,
    currency: 'INR',
    featured: false,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    description: 'The full LIVZO experience, unfiltered. Prepare to be transformed.',
  },
  {
    id: 'max',
    number: '07',
    name: 'LIVZO Max',
    tagline: 'Everything. All of it.',
    difficulty: 'Ultimate',
    activities: 'Ultimate',
    price: 12999,
    currency: 'INR',
    featured: false,
    image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80',
    description: 'Every adventure. Every experience. Every moment LIVZO has to offer.',
  },
];

export const roomPackages = [
  {
    id: '3hr',
    duration: '3 Hours',
    durationShort: '3H',
    price: 999,
    currency: 'INR',
    description: 'A quick retreat to rest, refresh, and reset between adventures.',
  },
  {
    id: '6hr',
    duration: '6 Hours',
    durationShort: '6H',
    price: 1499,
    currency: 'INR',
    description: 'Half-day comfort. Settle in, unwind, enjoy the stillness.',
  },
  {
    id: '12hr',
    duration: '12 Hours',
    durationShort: '12H',
    price: 1999,
    currency: 'INR',
    description: 'A full overnight stay. Fall asleep to nature, wake up to birdsong.',
  },
];

export const campingExperiences = [
  {
    id: 'camping',
    name: 'Camping',
    tagline: 'Ground beneath, sky above',
    icon: 'tent',
    includes: ['Premium tent setup', 'Sleeping bags & mats', 'Evening snacks'],
    price: null, // Price to be confirmed
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&q=80',
  },
  {
    id: 'bonfire',
    name: 'Bonfire',
    tagline: 'Stories around the flame',
    icon: 'flame',
    includes: ['Bonfire setup', 'Marshmallows & snacks', 'Music & stories'],
    price: null, // Price to be confirmed
    image: 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=800&q=80',
  },
  {
    id: 'stargazing',
    name: 'Stargazing',
    tagline: 'A sky full of wonder',
    icon: 'sparkles',
    includes: ['Telescope access', 'Star maps & guidance', 'Hot beverages'],
    price: null, // Price to be confirmed
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
  },
];

export const groupPackages = [
  { id: 'mini', name: 'LIVZO Mini', people: 10, pricePerPerson: 2500 },
  { id: 'green', name: 'LIVZO Green', people: 15, pricePerPerson: 2400 },
  { id: 'squad', name: 'LIVZO Squad', people: 20, pricePerPerson: 2300 },
  { id: 'tribe', name: 'LIVZO Tribe', people: 25, pricePerPerson: 2200 },
  { id: 'team', name: 'LIVZO Team', people: 30, pricePerPerson: 2100 },
  { id: 'group', name: 'LIVZO Group', people: 40, pricePerPerson: 2000 },
  { id: 'collective', name: 'LIVZO Collective', people: 60, pricePerPerson: 1900 },
  { id: 'fest', name: 'LIVZO Fest', people: 75, pricePerPerson: 1800 },
  { id: 'mega', name: 'LIVZO Mega', people: 100, pricePerPerson: 1800 },
  { id: 'event', name: 'LIVZO Event', people: 100, pricePerPerson: 1700, note: 'Custom event planning' },
];

export const familyPackage = {
  id: 'family-escape',
  name: 'Family Escape',
  tagline: 'Everything you need, in one escape.',
  price: 2199,
  currency: 'INR',
  unit: 'per person',
  includes: [
    { item: '3 Meals', description: 'Breakfast, lunch & dinner' },
    { item: 'Room Stay', description: 'Comfortable twin room' },
    { item: 'Evening Tea', description: 'Chai & light snacks' },
    { item: 'Swimming', description: 'Pool access included' },
    { item: 'Wi-Fi', description: 'Stay connected' },
    { item: 'Housekeeping', description: 'Clean & fresh, always' },
    { item: 'Parking', description: 'Complimentary parking' },
  ],
  image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
};

// ── Image URLs (centralized for easy replacement) ──
export const images = {
  hero: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80',
  room: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
  camping: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=1600&q=80',
  family: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
  cta: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80',
  adventure: 'https://images.unsplash.com/photo-1533692328991-08159ff19fca?w=1200&q=80',
  groups: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80',
};

// ── Helper: Format INR price ──
export const formatPrice = (price) => {
  if (price === null || price === undefined) return 'TBA';
  return new Intl.NumberFormat('en-IN').format(price);
};
