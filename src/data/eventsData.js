// Livora Curated Mock Database with High-Definition Relevant Imagery for Every Live Show

export const CATEGORIES = [
  { id: 'all', label: 'All Shows', emoji: '✨', icon: 'Sparkles', count: 16 },
  { id: 'music_concert', label: 'Music Concert', emoji: '🎤', icon: 'Mic2', count: 3 },
  { id: 'stage_program', label: 'Stage Program', emoji: '🎭', icon: 'Drama', count: 2 },
  { id: 'comedy_show', label: 'Comedy Show', emoji: '😂', icon: 'Laugh', count: 3 },
  { id: 'live_band', label: 'Live Band', emoji: '🎸', icon: 'Guitar', count: 3 },
  { id: 'dance_program', label: 'Dance Program', emoji: '💃', icon: 'Footprints', count: 2 },
  { id: 'standup_comedy', label: 'Stand-up Comedy', emoji: '🎙️', icon: 'Mic', count: 3 },
];

export const CITIES = [
  { id: 'kochi', name: 'Kochi (Cochin)', state: 'Kerala', country: 'India', icon: '🌴' },
  { id: 'trivandrum', name: 'Trivandrum', state: 'Kerala', country: 'India', icon: '🏛️' },
  { id: 'calicut', name: 'Kozhikode', state: 'Kerala', country: 'India', icon: '🥥' },
  { id: 'thrissur', name: 'Thrissur', state: 'Kerala', country: 'India', icon: '🐘' },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', country: 'India', icon: '🌆' },
  { id: 'delhi', name: 'Delhi-NCR', state: 'Delhi', country: 'India', icon: '🏛️' },
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', country: 'India', icon: '💻' },
  { id: 'london', name: 'London', state: 'England', country: 'UK', icon: '🎡' },
  { id: 'newyork', name: 'New York', state: 'NY', country: 'USA', icon: '🗽' },
  { id: 'dubai', name: 'Dubai', state: 'UAE', country: 'UAE', icon: '🏙️' },
  { id: 'tokyo', name: 'Tokyo', state: 'Kanto', country: 'Japan', icon: '🗼' },
];

export const GENRES = [
  'All Genres',
  'Rock & Pop',
  'Classical & Symphony',
  'Broadway & Theatre',
  'Standup Comedy',
  'Indie Blues',
  'Contemporary Ballet',
  'Sufi & Qawwali',
  'Jazz & Funk',
  'Flamenco'
];

export const LANGUAGES = ['All Languages', 'Malayalam', 'English', 'Hindi', 'Italian', 'Spanish', 'Japanese', 'Urdu'];

export const PROMO_CODES = {
  'LIVORA20': { discountPercent: 20, maxDiscount: 600, minAmount: 1000, description: '20% OFF on all live entertainment passes' },
  'EARLYBIRD': { discountPercent: 15, maxDiscount: 450, minAmount: 800, description: '15% Early Bird Discount' },
  'STAGEVIP': { discountPercent: 25, maxDiscount: 1200, minAmount: 2500, description: '25% VIP Experience Discount' },
  'FESTIVAL500': { discountAmount: 500, minAmount: 2000, description: 'Flat ₹500 OFF on group bookings above ₹2,000' }
};

export const ADDONS = [
  {
    id: 'addon_vip_lounge',
    name: 'VIP Sky Lounge Access',
    price: 999,
    description: 'Unlimited gourmet finger foods, welcome mocktails & express check-in queue.',
    icon: 'Crown'
  },
  {
    id: 'addon_merch',
    name: 'Official Tour Merch Bundle',
    price: 799,
    description: 'Limited edition Tour T-Shirt + holographic lanyard pass & wristband.',
    icon: 'Shirt'
  },
  {
    id: 'addon_meet_greet',
    name: 'Artist Backstage Meet & Greet',
    price: 1899,
    description: 'Exclusive 15-min group interaction, polaroid photo with artist & autographed poster.',
    icon: 'Camera'
  },
  {
    id: 'addon_fnb_combo',
    name: 'Artisan Popcorn & Mocktail Combo',
    price: 449,
    description: 'Jumbo caramelized truffle popcorn + 2 craft sodas delivered straight to your tier.',
    icon: 'Popcorn'
  }
];

export const EVENTS_DATA = [
  // 1. Thaikkudam Bridge (Kochi - Music Concert)
  {
    id: 'ev-kl-1',
    title: 'Thaikkudam Bridge: Namah Symphony Live Tour 2026',
    category: 'music_concert',
    categoryLabel: 'Music Concert',
    categoryEmoji: '🎤',
    genre: 'Rock & Pop',
    artist: 'Thaikkudam Bridge & Govind Vasantha',
    artistBio: 'Kerala’s most iconic 15-member folk-rock sensation blending heavy metal guitar riffs, electrifying Carnatic violins, thunderous Chenda Melam, and soul-stirring Malayalam vocals.',
    artistAvatar: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80',
    artistFollowers: '3.8M Followers',
    bannerImage: '/images/concert_stadium.jpg',
    thumbnailImage: '/images/concert_stadium.jpg',
    date: '2026-09-05',
    displayDate: 'Sat, Sep 5, 2026',
    time: '06:30 PM',
    duration: '3h 30m',
    venue: 'Bolgatty Palace Island Waterfront, Kochi',
    city: 'kochi',
    address: 'Bolgatty Island, Mulavukad, Kochi, Kerala 682504',
    language: 'Malayalam',
    ageRating: 'All Ages Welcome',
    priceStartingFrom: 999,
    isTrending: true,
    isFeatured: true,
    isSellingFast: true,
    rating: 4.98,
    reviewCount: 3850,
    tags: ['Malayalam Rock', 'Fish Rock', 'Chenda Melam Fusion', 'Live Stadium'],
    audioTrackTitle: 'Fish Rock & Navarasam (Live Kochi Cut)',
    venueHighlights: ['Open Air Waterfront Breeze', 'Boat Jetty Shuttle from Marine Drive', 'Kerala Traditional Food Street', 'VIP Backwater Lounge'],
    ticketTiers: [
      { id: 'tier_vip', name: 'VIP Waterfront Fan Pit', price: 2999, description: 'Direct stage front mosh zone with complimentary welcome tender coconut & VIP lanyard pass', perks: ['Stage Front Pit', 'Fast-track Island Entry', 'Welcome Drink', 'Exclusive Band Merch Cap'], availableSeats: 40, color: '#f59e0b' },
      { id: 'tier_gold', name: 'Gold Elevated Arena', price: 1799, description: 'Prime tiered seating with clear panoramic view of full stage pyrotechnics and backwaters', perks: ['Elevated Stalls', 'Express Snack Service'], availableSeats: 85, color: '#e11d48' },
      { id: 'tier_silver', name: 'Silver Grandstand', price: 1299, description: 'Great acoustics surrounded by passionate Malayalam music lovers', perks: ['Numbered Seating', 'Food Street Access'], availableSeats: 140, color: '#06b6d4' },
      { id: 'tier_bronze', name: 'General Waterfront Lawn', price: 999, description: 'Affordable high-energy lawn passes under the Kerala night sky', perks: ['Lawn Access', 'Concourse Stalls'], availableSeats: 300, color: '#8b5cf6' }
    ],
    lineup: [
      { name: 'Govind Vasantha', role: 'Vocalist & Master Violinist', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Mithun Jayaraj', role: 'Lead Vocalist', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { name: 'Ashok Nelson', role: 'Rhythm Guitarist', photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { name: 'Abhiram Menon', rating: 5, date: 'Yesterday', comment: 'Saw Thaikkudam Bridge in Kochi and it was sheer goosebumps! When the Chenda rolled during Fish Rock, the entire crowd erupted!' }
    ]
  },

  // 2. Avial & Masala Coffee (Kochi - Live Band)
  {
    id: 'ev-kl-2',
    title: 'Avial & Masala Coffee: Malayalam Folk-Rock Mahotsavam',
    category: 'live_band',
    categoryLabel: 'Live Band',
    categoryEmoji: '🎸',
    genre: 'Indie Blues',
    artist: 'Avial & Masala Coffee Live',
    artistBio: 'Two titans of Kerala alternative music sharing one explosive stage: Avial’s groundbreaking Malayalam alternative rock alongside Masala Coffee’s high-tempo folk percussion fusion.',
    artistAvatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80',
    artistFollowers: '2.9M Followers',
    bannerImage: '/images/live_band.jpg',
    thumbnailImage: '/images/live_band.jpg',
    date: '2026-09-19',
    displayDate: 'Sat, Sep 19, 2026',
    time: '07:00 PM',
    duration: '3h 45m',
    venue: 'Rajiv Gandhi Indoor Stadium, Kadavanthra',
    city: 'kochi',
    address: 'Kadavanthra, Elamkulam, Kochi, Kerala 682020',
    language: 'Malayalam',
    ageRating: '16+ Years',
    priceStartingFrom: 899,
    isTrending: true,
    isFeatured: true,
    isSellingFast: true,
    rating: 4.95,
    reviewCount: 2980,
    tags: ['Avial Rock', 'Nada Nada', 'Masala Coffee', 'Kochi Live Band'],
    audioTrackTitle: 'Nada Nada & Kaantha (Live Medley)',
    venueHighlights: ['Air Conditioned Stadium', 'Metro Connected (Kadavanthra Station)', 'Food Stalls & Sulaimani Chai Counter', 'Ample Parking'],
    ticketTiers: [
      { id: 'tier_vip', name: 'VIP Moshpit Front Deck', price: 2799, description: 'Right in front of Rex Vijayan’s guitar amp stacks with express VIP gate entry', perks: ['Direct Stage Mosh', 'Signed Tour Poster', 'Priority Entry'], availableSeats: 35, color: '#f59e0b' },
      { id: 'tier_gold', name: 'Gold Center Ring', price: 1699, description: 'Center stage cushioned seats with crystal clear acoustics', perks: ['Center View', 'Comfort Seats'], availableSeats: 70, color: '#e11d48' },
      { id: 'tier_silver', name: 'Silver Tier Stalls', price: 1199, description: 'Great sightlines and high energy', perks: ['Numbered Seating'], availableSeats: 110, color: '#06b6d4' },
      { id: 'tier_bronze', name: 'General Upper Stalls', price: 899, description: 'Budget friendly rocking arena passes', perks: ['Standard Seating'], availableSeats: 220, color: '#8b5cf6' }
    ],
    lineup: [
      { name: 'Tony John', role: 'Avial Lead Vocals & Turntables', photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80' },
      { name: 'Rex Vijayan', role: 'Lead Guitarist & Producer', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { name: 'Rahul Varma', rating: 5, date: '4 days ago', comment: 'Hearing Nada Nada and Chekele live with a crowd of 5000 Malayalees is pure emotion!' }
    ]
  },

  // 3. Kathakali & Kalaripayattu (Trivandrum - Stage Program)
  {
    id: 'ev-kl-3',
    title: 'Duryodhana Vadham: Grand Kathakali & Kalaripayattu Spectacle',
    category: 'stage_program',
    categoryLabel: 'Stage Program',
    categoryEmoji: '🎭',
    genre: 'Broadway & Theatre',
    artist: 'Margi Kathakali Troupe & CVN Kalari Gurukkal',
    artistBio: 'A majestic 4-hour open-air theatrical marvel featuring 30 master Kathakali artistes in full Aharyam makeup, live Maddalam and Chenda beats, paired with authentic 12th-century Kalaripayattu sword & shield choreography.',
    artistAvatar: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=400&auto=format&fit=crop&q=80',
    artistFollowers: '850K Followers',
    bannerImage: '/images/kathakali_stage.jpg',
    thumbnailImage: '/images/kathakali_stage.jpg',
    date: '2026-09-27',
    displayDate: 'Sun, Sep 27, 2026',
    time: '06:00 PM',
    duration: '3h 15m',
    venue: 'Nishagandhi Open Air Auditorium, Kanakakkunnu Palace',
    city: 'trivandrum',
    address: 'Kanakakkunnu Palace Grounds, Sooryakanthi, Thiruvananthapuram 695033',
    language: 'Malayalam',
    ageRating: 'All Ages Welcome',
    priceStartingFrom: 599,
    isTrending: false,
    isFeatured: true,
    isSellingFast: true,
    rating: 4.97,
    reviewCount: 1620,
    tags: ['Kathakali Drama', 'Kalaripayattu', 'Nishagandhi Stage', 'Kerala Heritage'],
    audioTrackTitle: 'Chenda & Maddalam Kelikkayyu (Live Melam)',
    venueHighlights: ['Historic Kanakakkunnu Royal Ambience', 'Live English & Malayalam Commentary headsets', 'Traditional Brass Lamp Lighting', 'Ample Palace Parking'],
    ticketTiers: [
      { id: 'tier_vip', name: 'Royal Palace Pavilion (Front Stalls)', price: 1999, description: 'Direct eye level with Kathakali mudras and Kalari blade duels with traditional Kerala Payasam included', perks: ['Front Row Stalls', 'Complimentary Palada Payasam', 'Souvenir Mudra Book'], availableSeats: 25, color: '#f59e0b' },
      { id: 'tier_gold', name: 'Kanakakkunnu Golden Circle', price: 1299, description: 'Prime tiered seating under the palace trees with pristine audio clarity', perks: ['Numbered Seating', 'Cushioned Stalls'], availableSeats: 60, color: '#e11d48' },
      { id: 'tier_silver', name: 'Nishagandhi Open Amphitheatre', price: 899, description: 'Open starry amphitheatre seating', perks: ['Amphitheatre Seating'], availableSeats: 120, color: '#06b6d4' },
      { id: 'tier_bronze', name: 'General Heritage Pass', price: 599, description: 'Accessible passes for students and culture lovers', perks: ['General Arena'], availableSeats: 180, color: '#8b5cf6' }
    ],
    lineup: [
      { name: 'Kalamandalam Gopi Asan', role: 'Duryodhana / Kathakali Maestro', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { name: 'Gokul Chandran', rating: 5, date: '1 week ago', comment: 'Nishagandhi Auditorium with Kathakali under the open Kerala sky is magical. The Kalari sword fight was intense!' }
    ]
  },

  // 4. Theyyam & Mohiniyattam (Thrissur - Dance Program)
  {
    id: 'ev-kl-4',
    title: 'Theyyam & Mohiniyattam: Celestial Fire & Grace Night',
    category: 'dance_program',
    categoryLabel: 'Dance Program',
    categoryEmoji: '💃',
    genre: 'Contemporary Ballet',
    artist: 'Kerala Kalamandalam & Malabar Theyyam Artists',
    artistBio: 'A spellbinding juxtaposition of North Malabar’s fiery, trance-inducing Theyyam ritual performances with the swaying palm grace and lyrical poetry of Mohiniyattam.',
    artistAvatar: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&auto=format&fit=crop&q=80',
    artistFollowers: '1.2M Followers',
    bannerImage: '/images/theyyam_dance.jpg',
    thumbnailImage: '/images/theyyam_dance.jpg',
    date: '2026-10-04',
    displayDate: 'Sun, Oct 4, 2026',
    time: '06:30 PM',
    duration: '3h 00m',
    venue: 'Kerala Sangeetha Nataka Akademi Regional Theatre',
    city: 'thrissur',
    address: 'Chembukkavu, Thrissur, Kerala 680020',
    language: 'Malayalam',
    ageRating: 'All Ages Welcome',
    priceStartingFrom: 699,
    isTrending: true,
    isFeatured: true,
    isSellingFast: true,
    rating: 4.96,
    reviewCount: 1480,
    tags: ['Theyyam Fire Dance', 'Mohiniyattam', 'Thrissur Cultural Capital', 'Kalamandalam'],
    audioTrackTitle: 'Theyyam Thottam Pattu & Edakka Rhythm',
    venueHighlights: ['Acclaimed Cultural Theatre', 'Close to Thekkinkadu Maidan', 'Ample Parking', 'Traditional Chai & Snacks'],
    ticketTiers: [
      { id: 'tier_vip', name: 'Front Row VIP Ring', price: 2199, description: 'Closest proximity to the Theyyam fire flares and intricate Mohiniyattam Lasya footwork', perks: ['Front Row Stalls', 'Blessed Theyyam Kumkum & Souvenir'], availableSeats: 20, color: '#f59e0b' },
      { id: 'tier_gold', name: 'Gold Tier Orchestra Stalls', price: 1499, description: 'Center stage elevated seats with clear view of all 18 mudra movements', perks: ['Center View', 'Padded Seating'], availableSeats: 55, color: '#e11d48' },
      { id: 'tier_silver', name: 'Mezzanine Circle', price: 999, description: 'Great panoramic sightlines', perks: ['Standard Seating'], availableSeats: 90, color: '#06b6d4' },
      { id: 'tier_bronze', name: 'Balcony Gallery', price: 699, description: 'Budget friendly seats for culture lovers', perks: ['Balcony View'], availableSeats: 150, color: '#8b5cf6' }
    ],
    lineup: [
      { name: 'Kalamandalam Leelamma', role: 'Mohiniyattam Guru', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { name: 'Dr. Vishnu Namboothiri', rating: 5, date: '5 days ago', comment: 'The energy of Theyyam combined with the elegance of Mohiniyattam in Thrissur was unbelievable.' }
    ]
  },

  // 5. Kalabhavan & Harisree Ashokan (Kozhikode - Comedy Show)
  {
    id: 'ev-kl-5',
    title: 'Kalabhavan & Harisree Ashokan: Mega Mimicry & Comedy Carnival',
    category: 'comedy_show',
    categoryLabel: 'Comedy Show',
    categoryEmoji: '😂',
    genre: 'Standup Comedy',
    artist: 'Cochin Kalabhavan & Harisree Ashokan Live',
    artistBio: '3 continuous hours of unadulterated Malayalam humor, hilarious film parodies, celebrity voice mimicry, and laugh-out-loud comedy skits from Kerala’s undisputed legends of mimicry.',
    artistAvatar: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&auto=format&fit=crop&q=80',
    artistFollowers: '2.5M Followers',
    bannerImage: '/images/standup_comedy.jpg',
    thumbnailImage: '/images/standup_comedy.jpg',
    date: '2026-10-11',
    displayDate: 'Sun, Oct 11, 2026',
    time: '06:30 PM',
    duration: '3h 00m',
    venue: 'Tagore Centenary Hall, Red Cross Road',
    city: 'calicut',
    address: 'Near Beach, Red Cross Rd, Vellayil, Kozhikode, Kerala 673032',
    language: 'Malayalam',
    ageRating: 'All Ages (Family Comedy)',
    priceStartingFrom: 599,
    isTrending: true,
    isFeatured: true,
    isSellingFast: true,
    rating: 4.91,
    reviewCount: 2240,
    tags: ['Malayalam Mimicry', 'Harisree Ashokan', 'Kalabhavan Skits', 'Calicut Comedy'],
    audioTrackTitle: 'Mimicry Skit & Calicut Laughs',
    venueHighlights: ['Near Kozhikode Beach', 'Famous Sulaimani & Halwa Food Stalls', 'AC Auditorium', 'Family Friendly'],
    ticketTiers: [
      { id: 'tier_vip', name: 'Front Row Laugh Zone', price: 1899, description: 'Sit right in front of Harisree Ashokan and Kalabhavan stars with direct comedic banter', perks: ['VIP Front Stalls', 'Express Entry', 'Photo with Artistes'], availableSeats: 25, color: '#f59e0b' },
      { id: 'tier_gold', name: 'Gold Club Stalls', price: 1299, description: 'Center stage comfort chairs with prime views', perks: ['Center View', 'Comfort Seats'], availableSeats: 65, color: '#e11d48' },
      { id: 'tier_silver', name: 'Silver Auditorium', price: 899, description: 'Great seats for families and groups', perks: ['Standard Seating'], availableSeats: 120, color: '#06b6d4' },
      { id: 'tier_bronze', name: 'Balcony Pass', price: 599, description: 'Budget friendly tickets with non-stop laughter', perks: ['Balcony View'], availableSeats: 200, color: '#8b5cf6' }
    ],
    lineup: [
      { name: 'Harisree Ashokan', role: 'Comedy Legend & Headliner', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { name: 'Faizal Mohammed', rating: 5, date: '2 days ago', comment: 'Laughed from start to finish! Calicut crowd energy is always top class.' }
    ]
  },

  // 6. Mallu Monologues (Kochi - Stand-up Comedy)
  {
    id: 'ev-kl-6',
    title: 'Mallu Monologues: Kochi Stand-up Comedy Special',
    category: 'standup_comedy',
    categoryLabel: 'Stand-up Comedy',
    categoryEmoji: '🎙️',
    genre: 'Standup Comedy',
    artist: 'George Vivian & The Kochi Comedy Collective',
    artistBio: 'Sharp observational humor on Malayali Gulf NRI relatives, Kerala KSRTC bus journeys, engineering college viva roasts, and modern arranged marriage matches.',
    artistAvatar: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&auto=format&fit=crop&q=80',
    artistFollowers: '1.6M Followers',
    bannerImage: '/images/standup_comedy.jpg',
    thumbnailImage: '/images/standup_comedy.jpg',
    date: '2026-10-18',
    displayDate: 'Sun, Oct 18, 2026',
    time: '08:00 PM',
    duration: '1h 50m',
    venue: 'JT Pac (Jose Thomas Performing Arts Centre), Choice Village',
    city: 'kochi',
    address: 'Choice Village, Tripunithura, Kochi, Kerala 682301',
    language: 'Malayalam',
    ageRating: '16+ Years',
    priceStartingFrom: 699,
    isTrending: true,
    isFeatured: true,
    isSellingFast: true,
    rating: 4.88,
    reviewCount: 1320,
    tags: ['Malayalam Standup', 'Kochi Crowdwork', 'NRI Jokes', 'Observational Comedy'],
    audioTrackTitle: 'Malayalam Stand-up Giggles & Roasts',
    venueHighlights: ['Acoustically Perfect Hall', 'Ample Green Parking', 'Artisan Coffee Counter', 'Express QR Check-in'],
    ticketTiers: [
      { id: 'tier_vip', name: 'Front Row Crowdwork Stalls', price: 1699, description: 'Sit 5 feet from the mic with high chance of friendly crowd banter', perks: ['Front Row Seats', 'Complimentary Cold Brew Coffee'], availableSeats: 18, color: '#f59e0b' },
      { id: 'tier_gold', name: 'Gold Plush Armchairs', price: 1199, description: 'Plush JT Pac armchairs with unobstructed center vision', perks: ['Plush Seating', 'Center Sightline'], availableSeats: 50, color: '#e11d48' },
      { id: 'tier_silver', name: 'Silver Stalls', price: 899, description: 'Great seats with crisp vocal resonance', perks: ['Standard Seating'], availableSeats: 80, color: '#06b6d4' },
      { id: 'tier_bronze', name: 'Balcony Pass', price: 699, description: 'Value passes for students and youth', perks: ['Balcony View'], availableSeats: 110, color: '#8b5cf6' }
    ],
    lineup: [
      { name: 'George Vivian', role: 'Headliner Comedian', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { name: 'Jithu Joseph', rating: 5, date: '3 days ago', comment: 'The NRI relatives and Gulf vacation bit had the whole hall in tears of laughter!' }
    ]
  },

  // 7. When Chai Met Toast (Trivandrum - Live Band)
  {
    id: 'ev-kl-7',
    title: 'When Chai Met Toast: Love & Chai Live Tour',
    category: 'live_band',
    categoryLabel: 'Live Band',
    categoryEmoji: '🎸',
    genre: 'Rock & Pop',
    artist: 'When Chai Met Toast',
    artistBio: 'Kerala’s beloved indie folk-pop band bringing their joyful acoustic harmonies, banjo rhythms, and uplifting anthems to a massive open-air evening.',
    artistAvatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80',
    artistFollowers: '2.4M Followers',
    bannerImage: '/images/live_band.jpg',
    thumbnailImage: '/images/live_band.jpg',
    date: '2026-10-24',
    displayDate: 'Sat, Oct 24, 2026',
    time: '07:30 PM',
    duration: '2h 30m',
    venue: 'Al Saj Arena Grounds, Kazhakoottam',
    city: 'trivandrum',
    address: 'Near Technopark Phase 3, Kazhakoottam, Thiruvananthapuram 695582',
    language: 'English & Malayalam',
    ageRating: 'All Ages Welcome',
    priceStartingFrom: 799,
    isTrending: true,
    isFeatured: false,
    isSellingFast: true,
    rating: 4.93,
    reviewCount: 1910,
    tags: ['Indie Folk', 'Joy of Little Things', 'Technopark Live', 'Acoustic Banjo'],
    audioTrackTitle: 'Joy of Little Things (Live Acoustic)',
    venueHighlights: ['Technopark Techie Hub', 'Open Air Starry Night', 'Craft Food & Chai Trucks', 'Ample Parking'],
    ticketTiers: [
      { id: 'tier_vip', name: 'Front Chai Fan Pit', price: 2199, description: 'Direct acoustic front area with band soundcheck access & free specialty chai', perks: ['Front Stage Pit', 'Free Specialty Chai', 'Soundcheck Pass'], availableSeats: 30, color: '#f59e0b' },
      { id: 'tier_gold', name: 'Gold Lawn Tier', price: 1399, description: 'Seated wooden chairs on the central lawn', perks: ['Lawn Seating', 'Direct View'], availableSeats: 70, color: '#e11d48' },
      { id: 'tier_silver', name: 'Silver Standing Deck', price: 999, description: 'Vibrant standing arena', perks: ['Deck Entry'], availableSeats: 130, color: '#06b6d4' },
      { id: 'tier_bronze', name: 'General Lawn Pass', price: 799, description: 'Relaxed lawn pass under the open sky', perks: ['Lawn Access'], availableSeats: 250, color: '#8b5cf6' }
    ],
    lineup: [
      { name: 'Ashwin Gopakumar', role: 'Lead Vocals', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { name: 'Reshma S.', rating: 5, date: '1 week ago', comment: 'When Chai Met Toast in Trivandrum was pure therapy.' }
    ]
  },

  // 8. Shahabaz Aman (Kozhikode - Malabar Ghazal)
  {
    id: 'ev-kl-8',
    title: 'Shahabaz Aman: Malabar Ghazal & Sufi Beach Night',
    category: 'music_concert',
    categoryLabel: 'Music Concert',
    categoryEmoji: '🎤',
    genre: 'Sufi & Qawwali',
    artist: 'Shahabaz Aman Live with Acoustic Ensemble',
    artistBio: 'An unforgettable candlelit night on Kozhikode Beach where soulful Malayalam romantic melodies, Urdu ghazals, and Malabar Sufi poetry merge with the sound of Arabian sea waves.',
    artistAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    artistFollowers: '2.1M Followers',
    bannerImage: '/images/beach_concert.jpg',
    thumbnailImage: '/images/beach_concert.jpg',
    date: '2026-11-01',
    displayDate: 'Sun, Nov 1, 2026',
    time: '07:00 PM',
    duration: '3h 15m',
    venue: 'Kozhikode Beach Open Amphitheatre',
    city: 'calicut',
    address: 'Beach Road, Kuttichira, Kozhikode, Kerala 673032',
    language: 'Malayalam',
    ageRating: 'All Ages Welcome',
    priceStartingFrom: 699,
    isTrending: true,
    isFeatured: true,
    isSellingFast: true,
    rating: 4.99,
    reviewCount: 3120,
    tags: ['Shahabaz Aman', 'Malabar Ghazal', 'Calicut Beach', 'Sufi Soul'],
    audioTrackTitle: 'Mizhiyil (Acoustic Malabar Ghazal Live)',
    venueHighlights: ['Sea Breeze & Sound of Waves', 'Calicut Famous Ice Orathi & Pickles', 'Candlelit Seating', 'Historical Beach Setting'],
    ticketTiers: [
      { id: 'tier_vip', name: 'Candlelit Beachfront Stalls', price: 1999, description: 'Sit right in front of Shahabaz Aman on the beach sands with specialty Calicut Sulaimani Chai', perks: ['Front Beach Stalls', 'Calicut Sulaimani & Halwa Included'], availableSeats: 25, color: '#f59e0b' },
      { id: 'tier_gold', name: 'Gold Amphitheatre Center', price: 1399, description: 'Center stage elevated views with pristine stereo resonance', perks: ['Center View', 'Cushioned Stalls'], availableSeats: 60, color: '#e11d48' },
      { id: 'tier_silver', name: 'Silver Sand Tier', price: 999, description: 'Direct ocean breeze view and great acoustics', perks: ['Standard Seating'], availableSeats: 110, color: '#06b6d4' },
      { id: 'tier_bronze', name: 'General Beach Promenade', price: 699, description: 'Open promenade passes for lovers of poetry and ghazals', perks: ['Promenade Access'], availableSeats: 200, color: '#8b5cf6' }
    ],
    lineup: [
      { name: 'Shahabaz Aman', role: 'Master Ghazal & Sufi Maestro', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { name: 'Fasalu Rahman', rating: 5, date: '2 days ago', comment: 'Sitting on Calicut Beach listening to Shahabaz Aman with the ocean waves is pure bliss.' }
    ]
  },

  // 9. Neon Odyssey World Tour (Mumbai - Music Concert)
  {
    id: 'ev-1',
    title: 'Neon Odyssey: World Arena Tour 2026',
    category: 'music_concert',
    categoryLabel: 'Music Concert',
    categoryEmoji: '🎤',
    genre: 'Rock & Pop',
    artist: 'Aurora & The Celestial Orchestra',
    artistBio: 'Multi-platinum recording sensation blending symphonic acoustics with hyper-pop stadium synths and mind-bending laser choreographies.',
    artistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    artistFollowers: '4.2M Followers',
    bannerImage: '/images/concert_stadium.jpg',
    thumbnailImage: '/images/concert_stadium.jpg',
    date: '2026-09-12',
    displayDate: 'Sat, Sep 12, 2026',
    time: '07:30 PM',
    duration: '3h 15m',
    venue: 'Grand Horizon Arena, Bandra Kurla Complex',
    city: 'mumbai',
    address: 'BKC Ground, G Block, Bandra East, Mumbai, Maharashtra 400051',
    language: 'English',
    ageRating: '12+ Years',
    priceStartingFrom: 1499,
    isTrending: true,
    isFeatured: false,
    isSellingFast: true,
    rating: 4.9,
    reviewCount: 1420,
    tags: ['Electronic Symphonic', 'Arena Live', 'Pyrotechnics', 'World Tour'],
    audioTrackTitle: 'Starlight Requiem (Live Symphonic Cut)',
    venueHighlights: ['Free Valet Parking', 'Air Conditioned Superdome', '10+ Food & Beverage Lounges', 'Wheelchair Accessible VIP Elevators'],
    ticketTiers: [
      { id: 'tier_vip', name: 'VIP Sky Pit (Front Row)', price: 4999, description: 'Exclusive standing pit closest to stage, fast-track entry & free bar drink', perks: ['Stage Proximity', 'Fast Track Gate', 'Free Welcome Drink'], availableSeats: 34, color: '#f59e0b' },
      { id: 'tier_gold', name: 'Gold Fan Circle', price: 2999, description: 'Reserved premium tiered seating with unobstructed elevated stage views', perks: ['Elevated Line of Sight', 'Padded Bucket Seats'], availableSeats: 82, color: '#e11d48' },
      { id: 'tier_silver', name: 'Silver Grandstand', price: 1999, description: 'Great panoramic view of full arena lasers and stage light show', perks: ['Numbered Seating'], availableSeats: 120, color: '#06b6d4' },
      { id: 'tier_bronze', name: 'General Admission Balcony', price: 1499, description: 'Affordable high-energy general tier seating', perks: ['Entry to Main Arena'], availableSeats: 210, color: '#8b5cf6' }
    ],
    lineup: [
      { name: 'Aurora Sterling', role: 'Lead Vocalist & Synths', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { name: 'Siddharth M.', rating: 5, date: '2 days ago', comment: 'The acoustic lasers are unparalleled!' }
    ]
  },

  // 10. The Phantom of Venice (Broadway / NCPA - Stage Program)
  {
    id: 'ev-2',
    title: 'The Phantom of Venice: Grand Broadway Musical',
    category: 'stage_program',
    categoryLabel: 'Stage Program',
    categoryEmoji: '🎭',
    genre: 'Broadway & Theatre',
    artist: 'Royal Venetian Theatre Troupe',
    artistBio: 'World-renowned 45-piece musical drama ensemble featuring Tony-award nominated actors and authentic 18th-century Italian costume design.',
    artistAvatar: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&auto=format&fit=crop&q=80',
    artistFollowers: '1.8M Followers',
    bannerImage: '/images/kathakali_stage.jpg',
    thumbnailImage: '/images/kathakali_stage.jpg',
    date: '2026-09-18',
    displayDate: 'Fri, Sep 18, 2026',
    time: '06:00 PM',
    duration: '2h 45m',
    venue: 'NCPA Jamshed Bhabha Theatre, Nariman Point',
    city: 'mumbai',
    address: 'NCPA Marg, Nariman Point, Mumbai, Maharashtra 400021',
    language: 'Italian',
    ageRating: '7+ Years',
    priceStartingFrom: 1199,
    isTrending: true,
    isFeatured: true,
    isSellingFast: false,
    rating: 4.8,
    reviewCount: 980,
    tags: ['Broadway Drama', 'Live Orchestra', 'Classical Theatre', 'Period Costumes'],
    audioTrackTitle: 'Mask of Masquerade (Act II Aria)',
    venueHighlights: ['Acoustically Tuned Auditorium', 'Opera Glasses Rental', 'Lounge Bar', 'Underground Parking'],
    ticketTiers: [
      { id: 'tier_vip', name: 'Royal Box Suite', price: 3999, description: 'Private box viewing with champagne service & velvet seating', perks: ['Private Balcony', 'Champagne & Canapés'], availableSeats: 18, color: '#f59e0b' },
      { id: 'tier_gold', name: 'Orchestra Stalls', price: 2499, description: 'Front centre stage seating', perks: ['Centre Stage View'], availableSeats: 45, color: '#e11d48' },
      { id: 'tier_silver', name: 'Grand Dress Circle', price: 1699, description: 'Elevated mezzanine vantage point', perks: ['Elevated Perspective'], availableSeats: 90, color: '#06b6d4' },
      { id: 'tier_bronze', name: 'Upper Tier Balcony', price: 1199, description: 'Superb acoustics and full view', perks: ['Standard Seating'], availableSeats: 140, color: '#8b5cf6' }
    ],
    lineup: [
      { name: 'Sir Julian Sterling', role: 'The Venetian Maestro', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { name: 'Dr. Rohan Mehra', rating: 5, date: '3 days ago', comment: 'The set transitions and costumes are pure magic!' }
    ]
  },

  // 11. Laugh Riot Arena (Delhi - Comedy Show)
  {
    id: 'ev-3',
    title: 'Laugh Riot Arena: Battle of the Comedians',
    category: 'comedy_show',
    categoryLabel: 'Comedy Show',
    categoryEmoji: '😂',
    genre: 'Standup Comedy',
    artist: 'Zakir, Biswa, Kenny & Samay Live',
    artistBio: 'An all-star comedy showcase bringing together four heavyweights of humor for 3 non-stop hours of improvised roasts, observational gold, and belly laughter.',
    artistAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    artistFollowers: '7.5M Followers',
    bannerImage: '/images/standup_comedy.jpg',
    thumbnailImage: '/images/standup_comedy.jpg',
    date: '2026-09-20',
    displayDate: 'Sun, Sep 20, 2026',
    time: '08:00 PM',
    duration: '3h 00m',
    venue: 'JLN Stadium Indoor Arena, Lodhi Road',
    city: 'delhi',
    address: 'Near Pragati Vihar, Bhishma Pitamah Marg, New Delhi 110003',
    language: 'Hindi',
    ageRating: '16+ Years',
    priceStartingFrom: 999,
    isTrending: true,
    isFeatured: true,
    isSellingFast: true,
    rating: 4.9,
    reviewCount: 3100,
    tags: ['Standup Roast', 'Crowd Work', 'Improv', 'Hinglish'],
    audioTrackTitle: 'Improv Intro & Crowd Chuckles',
    venueHighlights: ['Metro Connected (JLN Gate 2)', 'Massive Indoor Seating', 'Food Trucks'],
    ticketTiers: [
      { id: 'tier_vip', name: 'Front Row Roast Zone', price: 2999, description: 'Guaranteed interaction zone right in front of the comedians podium', perks: ['Interact with Comedians', 'Free Merch Cap'], availableSeats: 25, color: '#f59e0b' },
      { id: 'tier_gold', name: 'Gold Club Tier', price: 1999, description: 'Prime mid-hall seats', perks: ['Direct Stage View'], availableSeats: 95, color: '#e11d48' },
      { id: 'tier_silver', name: 'Silver Arena', price: 1499, description: 'Great seats surrounded by comedy fans', perks: ['Numbered Seats'], availableSeats: 160, color: '#06b6d4' },
      { id: 'tier_bronze', name: 'General Bleachers', price: 999, description: 'Pocket-friendly passes', perks: ['Unreserved Arena'], availableSeats: 250, color: '#8b5cf6' }
    ],
    lineup: [
      { name: 'Zakir K.', role: 'Headliner', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { name: 'Karan Singhal', rating: 5, date: '1 day ago', comment: 'Laughed so hard my stomach hurt!' }
    ]
  },

  // 12. Tokyo Cyberpunk Jazz (Tokyo - Live Band)
  {
    id: 'ev-9',
    title: 'Tokyo Cyberpunk Jazz: Neon Groove Session',
    category: 'live_band',
    categoryLabel: 'Live Band',
    categoryEmoji: '🎸',
    genre: 'Jazz & Funk',
    artist: 'The Shibuya 7 & Midnight Brass Quintet',
    artistBio: 'High-octane fusion of Japanese funk, modern synthwave jazz, and electrifying saxophone duels under futuristic visual projections.',
    artistAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    artistFollowers: '870K Followers',
    bannerImage: '/images/live_band.jpg',
    thumbnailImage: '/images/live_band.jpg',
    date: '2026-10-28',
    displayDate: 'Wed, Oct 28, 2026',
    time: '09:00 PM',
    duration: '2h 30m',
    venue: 'Blue Note Lounge & Stage, Roppongi',
    city: 'tokyo',
    address: '6 Chome-10-1 Roppongi, Minato City, Tokyo 106-0032, Japan',
    language: 'Japanese',
    ageRating: '20+ Years',
    priceStartingFrom: 1899,
    isTrending: true,
    isFeatured: true,
    isSellingFast: true,
    rating: 4.96,
    reviewCount: 940,
    tags: ['Cyber Jazz', 'Funk Brass', 'Tokyo Nightlife', 'Live Improv'],
    audioTrackTitle: 'Shibuya Midnight Drive (Saxophone Cut)',
    venueHighlights: ['Intimate Club Setting', 'Japanese Craft Cocktails', 'Table-side Dining'],
    ticketTiers: [
      { id: 'tier_vip', name: 'Front VIP Table with Chef Tasting', price: 4999, description: 'Table right against brass section with 4-course curated Japanese tapas and sake pairing', perks: ['Table 1m from Sax', '4-Course Tapas'], availableSeats: 12, color: '#f59e0b' },
      { id: 'tier_gold', name: 'Club Floor Reserved Table', price: 3199, description: 'Central table view', perks: ['Table Seating'], availableSeats: 36, color: '#e11d48' },
      { id: 'tier_silver', name: 'High Top Bar Stool', price: 2399, description: 'Elevated bar seating', perks: ['Bar Stool'], availableSeats: 48, color: '#06b6d4' },
      { id: 'tier_bronze', name: 'Standing Lounge Pass', price: 1899, description: 'Lounge area standing', perks: ['Lounge Access'], availableSeats: 80, color: '#8b5cf6' }
    ],
    lineup: [
      { name: 'Kenzo Sato', role: 'Alto Saxophone Master', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { name: 'Ren Tanaka', rating: 5, date: '3 days ago', comment: 'The brass energy is unreal!' }
    ]
  },

  // 13. Flamenco Fuego (Dubai - Dance Program)
  {
    id: 'ev-10',
    title: 'Flamenco Fuego: Spanish Passion & Rhythm',
    category: 'dance_program',
    categoryLabel: 'Dance Program',
    categoryEmoji: '💃',
    genre: 'Flamenco',
    artist: 'Andalucía Masters Flamenco Company',
    artistBio: 'Fiery castanets, thundering heel taps, and passionate Spanish acoustic guitars in a spellbinding celebration of authentic Andalusian rhythm.',
    artistAvatar: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=80',
    artistFollowers: '1.1M Followers',
    bannerImage: '/images/theyyam_dance.jpg',
    thumbnailImage: '/images/theyyam_dance.jpg',
    date: '2026-11-05',
    displayDate: 'Thu, Nov 5, 2026',
    time: '08:00 PM',
    duration: '2h 00m',
    venue: 'Dubai Opera Grand Theatre, Downtown Dubai',
    city: 'dubai',
    address: 'Sheikh Mohammed bin Rashid Blvd, Downtown Dubai, UAE',
    language: 'Spanish',
    ageRating: '6+ Years',
    priceStartingFrom: 1799,
    isTrending: false,
    isFeatured: false,
    isSellingFast: true,
    rating: 4.91,
    reviewCount: 520,
    tags: ['Flamenco', 'Spanish Guitar', 'Tap Rhythm', 'World Dance'],
    audioTrackTitle: 'Fuego Español (Live Castanets & Guitars)',
    venueHighlights: ['World Famous Dubai Opera', 'Valet Parking', 'Fine Dining Terraces'],
    ticketTiers: [
      { id: 'tier_vip', name: 'Royal Box VIP Stalls', price: 4499, description: 'Prime center stalls with acoustic sweet spot for stage floor percussions', perks: ['Center Row Stalls', 'VIP Lounge Access'], availableSeats: 20, color: '#f59e0b' },
      { id: 'tier_gold', name: 'Grand Tier Circle', price: 2999, description: 'Sweeping view of cape and gown choreography', perks: ['Grand Tier Stalls'], availableSeats: 54, color: '#e11d48' },
      { id: 'tier_silver', name: 'Mezzanine Balcony', price: 2199, description: 'Great sound and clear view', perks: ['Numbered Seating'], availableSeats: 80, color: '#06b6d4' },
      { id: 'tier_bronze', name: 'Upper Tier Access', price: 1799, description: 'Panoramic opera hall views', perks: ['Standard Seating'], availableSeats: 120, color: '#8b5cf6' }
    ],
    lineup: [
      { name: 'Elena García', role: 'Prima Bailaora', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { name: 'Tariq Al-Mansoor', rating: 5, date: '1 week ago', comment: 'The footwork cadence was hypnotic!' }
    ]
  },

  // 14. Vir Das Unfiltered (New York - Stand-up Comedy)
  {
    id: 'ev-6',
    title: 'Unfiltered & Unapologetic: World Comedy Tour',
    category: 'standup_comedy',
    categoryLabel: 'Stand-up Comedy',
    categoryEmoji: '🎙️',
    genre: 'Standup Comedy',
    artist: 'Vir Das Live in Concert',
    artistBio: 'Emmy award-winning comedian delivering an electrifying new 90-minute special on world culture, airport adventures, mid-life absurdities, and universal humanity.',
    artistAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    artistFollowers: '5.8M Followers',
    bannerImage: '/images/standup_comedy.jpg',
    thumbnailImage: '/images/standup_comedy.jpg',
    date: '2026-10-10',
    displayDate: 'Sat, Oct 10, 2026',
    time: '08:00 PM',
    duration: '1h 45m',
    venue: 'Radio City Music Hall (Tour Edition), Manhattan',
    city: 'newyork',
    address: '1260 6th Ave, New York, NY 10020, United States',
    language: 'English',
    ageRating: '18+ Explicit',
    priceStartingFrom: 1599,
    isTrending: true,
    isFeatured: true,
    isSellingFast: true,
    rating: 4.92,
    reviewCount: 2450,
    tags: ['Emmy Winner', 'Stand-up Special', 'Satirical Humor', 'Storytelling'],
    audioTrackTitle: 'Stand-up Crowd Opener (Live NYC)',
    venueHighlights: ['Iconic Manhattan Hall', 'Express Coat Check', 'Signature Cocktail Bar'],
    ticketTiers: [
      { id: 'tier_vip', name: 'Front VIP Ringside', price: 3799, description: 'Sit 5 feet from the mic with potential comedic interaction', perks: ['Ringside Seat', 'Signed Poster'], availableSeats: 20, color: '#f59e0b' },
      { id: 'tier_gold', name: 'Premium Stalls Center', price: 2599, description: 'Plush theatre armchairs', perks: ['Center View'], availableSeats: 70, color: '#e11d48' },
      { id: 'tier_silver', name: 'Mezzanine Circle', price: 1999, description: 'Great sightlines with direct audio clarity', perks: ['Clear Audio'], availableSeats: 110, color: '#06b6d4' },
      { id: 'tier_bronze', name: 'Upper Promenade', price: 1599, description: 'Affordable upper tier seating', perks: ['General Upper Deck'], availableSeats: 190, color: '#8b5cf6' }
    ],
    lineup: [
      { name: 'Vir Das', role: 'Headliner Comedian', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80' }
    ],
    reviews: [
      { name: 'Liam O’Connor', rating: 5, date: '4 days ago', comment: 'Intelligent, razor-sharp wit.' }
    ]
  }
];
