/* ============================================
   LATE CULTURE. App Controller
   ============================================ */

/* ── Venue Data. Full Profiles ── */
const HOTELS = [
  {
    id: 'capella-bangkok',
    name: 'Capella Bangkok',
    category: 'Design Forward',
    tags: ['Design Forward', 'River & Water', 'The Pool'],
    neighborhood: 'Chao Phraya Riverside',
    description: 'Riverside ultra-luxury by Andre Fu. Every suite faces the Chao Phraya, wrapped in teak, brass and quiet theatre.',
    longDescription: 'Capella Bangkok occupies a serene stretch of the Chao Phraya River, conceived by architect Andre Fu as a vertical village of interconnected pavilions. The 101 suites and villas each frame the river through floor-to-ceiling windows, dressed in teak, brass, and hand-woven Thai silk. Auriga wellness spa draws on traditional Chinese medicine. Cote by Mauro Colagreco delivers Mediterranean cuisine with river views. The infinity pool appears to merge with the Chao Phraya itself.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    address: '300/2 Charoen Krung Rd, Yan Nawa, Sathon, Bangkok 10120',
    priceRange: '$$$$',
    featured: true,
    type: 'hotel',
    yearOpened: 2020,
    architect: 'Andre Fu (AFSO)',
    rooms: 101,
    amenities: ['Infinity Pool', 'Auriga Spa', 'Fitness Centre', 'River Shuttle', 'Private Jetty', 'Kids Club', 'Butler Service'],
    highlights: ['Every suite faces the river', 'Cote by Mauro Colagreco on-site', 'Private pool villas available'],
    phone: '+66 2 098 3888',
    website: 'https://www.capellahotels.com/bangkok',
    bookingUrl: 'https://www.capellahotels.com/bangkok/reservations',
    checkIn: '15:00',
    checkOut: '12:00',
    insiderTip: 'Request a high-floor Riverfront Suite on the south side for unobstructed sunset views over the Chao Phraya.',
    vibe: { energy: 2, price: 5, crowd: 2, dresscode: 4 },
    bestTime: { day: 'Thursday', time: '16:00-19:00', note: 'Sunset by the river' },
  },
  {
    id: 'the-siam',
    name: 'The Siam',
    category: 'Design Forward',
    tags: ['Design Forward', 'Old Soul', 'River & Water'],
    neighborhood: 'Dusit',
    description: 'Bill Bensley\'s art-deco jewel on the river. Private pool villas, Muay Thai ring, and a collection that rivals galleries.',
    longDescription: 'The Siam is Bill Bensley\'s maximalist masterpiece. an art-deco palace on the banks of the Chao Phraya filled with museum-grade antiques, vintage gramophones, and original Thai art. Each of the 39 suites and pool villas is individually designed. The on-site Muay Thai ring offers private lessons. Chon Thai Restaurant serves riverside Thai cuisine. The Opium Spa sits in a restored antique teak house.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    address: '3/2 Thanon Khao, Vachirapayabal, Dusit, Bangkok 10300',
    priceRange: '$$$$',
    featured: false,
    type: 'hotel',
    yearOpened: 2012,
    architect: 'Bill Bensley',
    rooms: 39,
    amenities: ['Private Pool Villas', 'Muay Thai Ring', 'Opium Spa', 'Screening Room', 'Gym', 'River Shuttle', 'Library'],
    highlights: ['Museum-grade antique collection', 'Private Muay Thai training', 'Each room individually designed'],
    phone: '+66 2 206 6999',
    website: 'https://www.thesiamhotel.com',
    bookingUrl: 'https://www.thesiamhotel.com/reservations',
    checkIn: '15:00',
    checkOut: '12:00',
    insiderTip: 'Book the Connie\'s Cottage. a restored antique Thai house with its own private pool, hidden in the garden.',
    vibe: { energy: 3, price: 5, crowd: 2, dresscode: 3 },
    bestTime: { day: 'Saturday', time: '10:00-12:00', note: 'Morning river shuttle ride' },
  },
  {
    id: 'the-mustang-nero',
    name: 'The Mustang Nero',
    category: 'New Opening',
    tags: ['New Opening', 'Night City', 'Design Forward'],
    neighborhood: 'Silom',
    description: 'Tokyo-meets-Bangkok capsule boutique. Dark interiors, rooftop bar, neighbourhood immersion.',
    longDescription: 'The Mustang Nero brings Tokyo\'s capsule hotel philosophy to Bangkok\'s Silom district, wrapped in noir aesthetics. Dark timber, black steel, and moody lighting define the 48 compact rooms. The rooftop bar overlooks Silom\'s skyline. The lobby doubles as a co-working space by day and cocktail lounge by night. Walking distance to BTS Sala Daeng and the best of Silom\'s street food.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
    address: 'Silom Rd, Suriyawong, Bang Rak, Bangkok 10500',
    priceRange: '$$',
    featured: false,
    type: 'hotel',
    yearOpened: 2024,
    architect: 'Studio Morpheus',
    rooms: 48,
    amenities: ['Rooftop Bar', 'Co-working Space', 'Gym', 'Cafe', 'Bicycle Rental'],
    highlights: ['Tokyo-inspired compact design', 'Rooftop bar with Silom views', 'Steps from BTS Sala Daeng'],
    phone: '+66 2 234 5678',
    website: 'https://www.themustangnero.com',
    bookingUrl: 'https://www.themustangnero.com/book',
    checkIn: '14:00',
    checkOut: '11:00',
    insiderTip: 'The rooftop bar does an excellent Negroni with Thai basil. arrive before 18:00 for golden hour.',
    vibe: { energy: 4, price: 2, crowd: 3, dresscode: 1 },
    bestTime: { day: 'Friday', time: '17:00-19:00', note: 'Rooftop golden hour' },
  },
  {
    id: 'rosewood-bangkok',
    name: 'Rosewood Bangkok',
    category: 'Design Forward',
    tags: ['Design Forward', 'The Pool', 'Grand Occasion'],
    neighborhood: 'Phloen Chit',
    description: 'Vertical resort rising above Phloen Chit. KiKi serves Cantonese above the clouds. Sense spa floats between sky and water.',
    longDescription: 'Rosewood Bangkok rises 30 storeys above Phloen Chit as a vertical resort conceived by KPF architects. The 159 suites feature floor-to-ceiling windows with city panoramas. Lakorn European Brasserie anchors the ground floor. KiKi on the top floors serves refined Cantonese. Sense spa spans an entire floor with vitality pools and Thai treatment rooms. The rooftop pool deck offers uninterrupted views of the Bangkok skyline.',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    address: '1041/38 Phloen Chit Rd, Lumphini, Pathum Wan, Bangkok 10330',
    priceRange: '$$$$',
    featured: false,
    type: 'hotel',
    yearOpened: 2019,
    architect: 'KPF (Kohn Pedersen Fox)',
    rooms: 159,
    amenities: ['Rooftop Pool', 'Sense Spa', 'Fitness Centre', 'KiKi Restaurant', 'Lakorn Brasserie', 'Business Centre', 'Valet Parking'],
    highlights: ['KiKi Cantonese dining above the clouds', 'Sense spa with vitality pools', '360-degree skyline from rooftop pool'],
    phone: '+66 2 080 0088',
    website: 'https://www.rosewoodhotels.com/bangkok',
    bookingUrl: 'https://www.rosewoodhotels.com/bangkok/reservations',
    checkIn: '15:00',
    checkOut: '12:00',
    insiderTip: 'The corner suites on floors 20+ give you two walls of glass. sunrise over the city and sunset over Lumphini Park.',
    vibe: { energy: 3, price: 5, crowd: 3, dresscode: 4 },
    bestTime: { day: 'Sunday', time: '11:00-14:00', note: 'Brunch at Lakorn' },
  },
  {
    id: 'oriental-residence',
    name: 'Oriental Residence',
    category: 'Slow Stay',
    tags: ['Slow Stay', 'Old Soul', 'Grand Occasion'],
    neighborhood: 'Wireless Road',
    description: 'Quiet elegance on Wireless Road. Art-deco residences with kitchens, Italian marble baths, and a rooftop pool that whispers old Bangkok.',
    longDescription: 'Oriental Residence occupies one of Bangkok\'s most prestigious addresses on Wireless Road, managed by the team behind the Mandarin Oriental. The 145 serviced residences blend art-deco elegance with modern comfort. each featuring full kitchens, Italian marble bathrooms, and hardwood floors. The rooftop pool overlooks the embassy district. Cafe Claire serves French-Thai cuisine in a garden setting.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d82de0e9c?w=800&q=80',
    address: '110 Wireless Rd, Lumphini, Pathum Wan, Bangkok 10330',
    priceRange: '$$$',
    featured: false,
    type: 'hotel',
    yearOpened: 2010,
    architect: 'Tandem Architects',
    rooms: 145,
    amenities: ['Rooftop Pool', 'Cafe Claire Restaurant', 'Fitness Centre', 'Full Kitchen', 'Concierge', 'Laundry Service'],
    highlights: ['Full kitchens in every residence', 'Managed by Mandarin Oriental team', 'Embassy district address'],
    phone: '+66 2 125 9000',
    website: 'https://www.oriental-residence.com',
    bookingUrl: 'https://www.oriental-residence.com/reservations',
    checkIn: '14:00',
    checkOut: '12:00',
    insiderTip: 'Ask for a residence facing Wireless Road. the tree canopy makes it feel like you\'re staying in a treehouse above the embassy quarter.',
    vibe: { energy: 1, price: 3, crowd: 1, dresscode: 2 },
    bestTime: { day: 'Wednesday', time: '08:00-10:00', note: 'Morning coffee by the pool' },
  },
  {
    id: 'mandarin-oriental',
    name: 'Mandarin Oriental Bangkok',
    category: 'Old Soul',
    tags: ['Old Soul', 'Grand Occasion', 'River & Water'],
    neighborhood: 'Riverside',
    description: 'Since 1876. The original grande dame of Bangkok. Authors\' Wing suites, Le Normandie on the river, Bamboo Bar below.',
    longDescription: 'The Mandarin Oriental Bangkok has stood on the banks of the Chao Phraya since 1876, making it one of the world\'s most storied hotels. The Authors\' Wing preserves suites named for literary guests. Somerset Maugham, Joseph Conrad, Noel Coward. Le Normandie, the hotel\'s celebrated French restaurant, commands river views. The Bamboo Bar has hosted jazz since 1953. The Oriental Spa is consistently ranked among the world\'s finest.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    address: '48 Oriental Ave, Bang Rak, Bangkok 10500',
    priceRange: '$$$$',
    featured: true,
    type: 'hotel',
    yearOpened: 1876,
    architect: 'Original colonial / Renovated multiple times',
    rooms: 331,
    amenities: ['Oriental Spa', 'Two Pools', 'Bamboo Bar', 'Le Normandie Restaurant', 'River Shuttle', 'Thai Cooking School', 'Butler Service', 'Tennis Court'],
    highlights: ['Operating since 1876', 'Authors\' Wing with literary heritage suites', 'Le Normandie restaurant'],
    phone: '+66 2 659 9000',
    website: 'https://www.mandarinoriental.com/bangkok',
    bookingUrl: 'https://www.mandarinoriental.com/bangkok/reservations',
    checkIn: '15:00',
    checkOut: '12:00',
    insiderTip: 'Book the Somerset Maugham Suite in the Authors\' Wing. it\'s where the writer penned parts of The Gentleman in the Parlour. Pure literary theatre.',
    vibe: { energy: 2, price: 5, crowd: 3, dresscode: 4 },
    bestTime: { day: 'Friday', time: '17:00-19:00', note: 'Bamboo Bar before the crowd' },
  },
  {
    id: 'park-hyatt-bangkok',
    name: 'Park Hyatt Bangkok',
    category: 'Design Forward',
    tags: ['Design Forward', 'The Pool', 'Grand Occasion'],
    neighborhood: 'Ploenchit',
    description: 'Amanda Levete\'s architectural statement above Central Embassy. 222 rooms with floor-to-ceiling views. Thailand\'s first Park Hyatt.',
    longDescription: 'Park Hyatt Bangkok is Thailand\'s first Park Hyatt, designed by AL_A, the London studio founded by Amanda Levete. Rising above Central Embassy, the 222 rooms and 32 suites feature floor-to-ceiling windows with panoramic city views. The rooftop bar and pool deck command the Ploenchit skyline. Penthouse Bar + Grill serves contemporary cuisine on the top floor.',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
    address: '88 Wireless Rd, Lumpini, Pathumwan, Bangkok 10330',
    priceRange: '$$$$',
    featured: false,
    type: 'hotel',
    yearOpened: 2017,
    architect: 'AL_A (Amanda Levete)',
    rooms: 222,
    amenities: ['Rooftop Pool', 'Spa', 'Penthouse Bar + Grill', 'Fitness Centre', 'Central Embassy Access', 'Business Centre', 'Valet Parking'],
    highlights: ['Thailand\'s first Park Hyatt', 'Amanda Levete architecture', 'Direct access to Central Embassy'],
    phone: '+66 2 012 1234',
    website: 'https://www.hyatt.com/park-hyatt/bkkph',
    bookingUrl: 'https://www.hyatt.com/park-hyatt/bkkph/rooms',
    checkIn: '15:00',
    checkOut: '12:00',
    insiderTip: 'The Penthouse Bar + Grill on the top floor has the best steak in Bangkok and a terrace that rivals any rooftop bar.',
    vibe: { energy: 3, price: 5, crowd: 3, dresscode: 4 },
    bestTime: { day: 'Saturday', time: '18:00-20:00', note: 'Penthouse sunset cocktails' },
  },
  {
    id: 'kimpton-maa-lai',
    name: 'Kimpton Maa-Lai Bangkok',
    category: 'Design Forward',
    tags: ['Design Forward', 'New Opening', 'Night City'],
    neighborhood: 'Langsuan',
    description: 'P49 Deesign\'s art-filled boutique on Tonson Alley. 362 rooms. Rooftop bar. The design hotel that proved Bangkok could do lifestyle.',
    longDescription: 'Kimpton Maa-Lai Bangkok sits on Tonson Alley in Langsuan, conceived by P49 Deesign with Plan Associates as architects. The 362 rooms and 131 serviced residences are filled with local art and design references. Ms.Jigger rooftop bar serves creative cocktails above the Langsuan canopy. Stock.Room is the ground-floor social hub. The hotel that proved Bangkok could do the lifestyle hotel as well as any city.',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    address: '78 Tonson Alley, Lumpini, Pathumwan, Bangkok 10330',
    priceRange: '$$$',
    featured: false,
    type: 'hotel',
    yearOpened: 2020,
    architect: 'Plan Associates / P49 Deesign',
    rooms: 362,
    amenities: ['Rooftop Bar (Ms.Jigger)', 'Pool', 'Fitness Centre', 'Stock.Room Social Hub', 'Spa', 'Pet Friendly', 'Serviced Residences'],
    highlights: ['Local art throughout the hotel', 'Ms.Jigger rooftop cocktails', 'Pet-friendly policy'],
    phone: '+66 2 056 9999',
    website: 'https://www.kimptonmaalaibangkok.com',
    bookingUrl: 'https://www.ihg.com/kimptonhotels/hotels/us/en/bkkls',
    checkIn: '15:00',
    checkOut: '12:00',
    insiderTip: 'The serviced residences are Bangkok\'s best-kept secret for long stays. Full kitchens, hotel amenities, Langsuan location.',
    vibe: { energy: 3, price: 3, crowd: 3, dresscode: 2 },
    bestTime: { day: 'Friday', time: '19:00-22:00', note: 'Ms.Jigger rooftop cocktails' },
  },
  {
    id: 'the-standard-bangkok',
    name: 'The Standard Bangkok Mahanakhon',
    category: 'New Opening',
    tags: ['New Opening', 'Design Forward', 'Night City'],
    neighborhood: 'Silom',
    description: 'Inside the Mahanakhon tower. 155 rooms. The Standard\'s irreverent energy meets Bangkok\'s tallest building. Rooftop with vertigo views.',
    longDescription: 'The Standard Bangkok Mahanakhon occupies the lower floors of King Power Mahanakhon, Bangkok\'s most distinctive skyscraper with its pixelated facade. 155 rooms bring The Standard\'s irreverent, design-forward energy to Silom. The Parlor lobby buzzes day and night. Mott 32 serves elevated Chinese cuisine. The rooftop Sky Beach offers the most vertigo-inducing views in the city.',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    address: '114 Narathiwas Rd, Silom, Bang Rak, Bangkok 10500',
    priceRange: '$$$',
    featured: false,
    type: 'hotel',
    yearOpened: 2022,
    architect: 'OMA / Buro Ole Scheeren (tower)',
    rooms: 155,
    amenities: ['Sky Beach Rooftop', 'Pool', 'Mott 32 Restaurant', 'The Parlor Lobby', 'Fitness Centre', 'Spa'],
    highlights: ['Inside Bangkok\'s tallest building', 'Pixelated Mahanakhon facade', 'Sky Beach rooftop'],
    phone: '+66 2 085 8888',
    website: 'https://www.standardhotels.com/bangkok',
    bookingUrl: 'https://www.standardhotels.com/bangkok/properties/bangkok',
    checkIn: '15:00',
    checkOut: '12:00',
    insiderTip: 'Skip the observation deck tourist ticket. Stay here and get Sky Beach access included. Same views, better cocktails.',
    vibe: { energy: 4, price: 3, crowd: 4, dresscode: 2 },
    bestTime: { day: 'Saturday', time: '16:00-18:00', note: 'Sky Beach golden hour' },
  },
  {
    id: 'sindhorn-kempinski',
    name: 'Sindhorn Kempinski Hotel Bangkok',
    category: 'Design Forward',
    tags: ['Design Forward', 'Slow Stay', 'The Pool'],
    neighborhood: 'Langsuan',
    description: '274 rooms on Soi Tonson. European luxury meets Bangkok greenery. The Sindhorn Village oasis in the heart of Pathumwan.',
    longDescription: 'Sindhorn Kempinski occupies a prime position on Soi Tonson within the Sindhorn Village development, surrounded by landscaped gardens that feel impossible in central Bangkok. The 274 rooms and suites are generously appointed with European luxury finishes. Flava restaurant serves international cuisine. The spa draws on Kempinski\'s European wellness heritage. The pool deck is an urban oasis.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    address: '80 Soi Tonson, Lumpini, Pathumwan, Bangkok 10330',
    priceRange: '$$$$',
    featured: false,
    type: 'hotel',
    yearOpened: 2020,
    architect: 'Sindhorn Village Development',
    rooms: 274,
    amenities: ['Pool', 'Kempinski Spa', 'Flava Restaurant', 'Fitness Centre', 'Business Centre', 'Garden', 'Valet Parking'],
    highlights: ['Sindhorn Village garden oasis', 'European luxury standards', 'Walking distance to Langsuan dining'],
    phone: '+66 2 095 9999',
    website: 'https://www.kempinski.com/en/sindhorn-hotel',
    bookingUrl: 'https://www.kempinski.com/en/sindhorn-hotel/rooms-suites',
    checkIn: '15:00',
    checkOut: '12:00',
    insiderTip: 'The garden grounds are the real amenity. Morning coffee by the Sindhorn Village lake is the most peaceful moment in central Bangkok.',
    vibe: { energy: 2, price: 4, crowd: 2, dresscode: 3 },
    bestTime: { day: 'Sunday', time: '07:00-09:00', note: 'Morning garden stroll' },
  },
];

const RESTAURANTS = [
  {
    id: 'le-du',
    name: 'Le Du',
    category: 'Grand Occasion',
    tags: ['Grand Occasion', 'The Counter', 'Local Legend'],
    cuisine: 'Modern Thai',
    neighborhood: 'Silom',
    description: 'Chef Ton\'s Seasonal tasting menus that redefine Thai ingredients through French technique.',
    longDescription: 'Le Du. meaning "season" in Thai. is Chef Thitid "Ton" Tassanakajohn\'s flagship, where Thai ingredients are reimagined through French technique. The seasonal tasting menu changes every three months, sourcing from small Thai farms. Dishes arrive as architectural compositions. a single bite might layer fermented fish, wild ginger, and edible flowers. The wine list leans European with thoughtful natural selections. The dining room is intimate: bare concrete, warm wood, 40 seats.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    address: '399/3 Silom Soi 7, Silom, Bang Rak, Bangkok 10500',
    priceRange: '$$$$',
    featured: true,
    type: 'restaurant',
    yearOpened: 2013,
    chef: 'Thitid "Ton" Tassanakajohn',
    openingHours: 'Tue to Sun 18:00 to 23:00, Closed Monday',
    dressCode: 'Smart Casual',
    signatureDish: 'Seasonal Tasting Menu (changes quarterly)',
    phone: '+66 92 919 9969',
    website: 'https://www.ledurestaurant.com',
    reservationUrl: 'https://www.ledurestaurant.com/reservation',
    insiderTip: 'Book the counter seats for a front-row view of the kitchen. Ask for the wine pairing. the sommelier\'s selections are exceptional.',
    vibe: { energy: 3, price: 5, crowd: 3, dresscode: 3 },
    bestTime: { day: 'Thursday', time: '18:00-19:00', note: 'First seating, quieter room' },
  },
  {
    id: 'suhring',
    name: 'Suhring',
    category: 'Grand Occasion',
    tags: ['Grand Occasion', 'Romantic', 'Quiet Escape'],
    cuisine: 'German',
    neighborhood: 'Yen Akat',
    description: 'Twin brothers\' German cuisine in a colonial house. Garden herbs, obsessive technique, Bangkok\'s most romantic table.',
    longDescription: 'Twin brothers Thomas and Mathias Suhring transformed a 1970s colonial house in Yen Akat into Bangkok\'s most romantic fine-dining destination. Their German cuisine draws from childhood memories. reinventing dishes their grandmother served through a lens of extreme technique. Herbs are grown in the garden. The Schweinshaxe and Black Forest cake are legendary reinterpretations. Candlelit tables spill across garden terraces under frangipani trees.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    address: '10 Soi Yen Akat 3, Chong Nonsi, Yan Nawa, Bangkok 10120',
    priceRange: '$$$$',
    featured: true,
    type: 'restaurant',
    yearOpened: 2016,
    chef: 'Thomas & Mathias Suhring',
    openingHours: 'Wed to Sun 17:30 to 21:30, Closed Mon & Tue',
    dressCode: 'Smart Casual',
    signatureDish: 'Schweinshaxe (reimagined pork knuckle)',
    phone: '+66 2 287 1799',
    website: 'https://www.restaurantsuhring.com',
    reservationUrl: 'https://www.restaurantsuhring.com/reservations',
    insiderTip: 'Request a garden table for the full experience. Book at least 3 weeks ahead. this is Bangkok\'s hardest reservation.',
    vibe: { energy: 3, price: 5, crowd: 3, dresscode: 4 },
    bestTime: { day: 'Wednesday', time: '18:00-19:00', note: 'First seating, garden light' },
  },
  {
    id: 'nusara',
    name: 'Nusara',
    category: 'Grand Occasion',
    tags: ['Grand Occasion', 'Local Legend', 'Recently Added'],
    cuisine: 'Thai',
    neighborhood: 'Sathorn',
    description: 'Chef Thitid\'s ascension. Heritage Thai flavours presented with architectural precision.',
    longDescription: 'Nusara is Chef Thitid "Ton" Tassanakajohn\'s second Bangkok restaurant and his most ambitious. a exploration of heritage Thai cuisine presented with architectural precision. Where Le Du plays with French technique, Nusara goes deeper into Thai roots: forgotten recipes, rare ingredients from every region, and cooking methods passed down through generations. The tasting menu is a journey through Thailand\'s culinary heritage, served in a minimalist space that lets the food command attention.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    address: 'Sathorn Soi 10, Sathorn, Bangkok 10120',
    priceRange: '$$$$',
    featured: false,
    type: 'restaurant',
    yearOpened: 2022,
    chef: 'Thitid "Ton" Tassanakajohn',
    openingHours: 'Tue to Sat 18:00 to 22:00, Closed Sun & Mon',
    dressCode: 'Smart Casual',
    signatureDish: 'Heritage Thai Tasting Menu',
    phone: '+66 65 535 5665',
    website: 'https://www.nusara.com',
    reservationUrl: 'https://www.nusara.com/reservations',
    insiderTip: 'This is from the same chef as Le Du. Come here for the Thai roots, go to Le Du for the French fusion. Both are essential.',
    vibe: { energy: 3, price: 5, crowd: 3, dresscode: 4 },
    bestTime: { day: 'Saturday', time: '18:30-19:30', note: 'Weekend first seating' },
  },
  {
    id: 'jay-fai',
    name: 'Jay Fai',
    category: 'Local Legend',
    tags: ['Local Legend', 'Street to Star', 'Solo Dining'],
    cuisine: 'Thai Street',
    neighborhood: 'Old Town',
    description: 'The legendary goggle-wearing street cook. Her crab omelette is the single most iconic dish in Bangkok.',
    longDescription: 'Jay Fai. Supinya Junsuta. has cooked over blazing wok fires since the 1980s, wearing her trademark ski goggles against the heat. In 2018, she became the first Bangkok street food vendor to earn global recognition. Her crab omelette, a golden pillow stuffed with sweet crab meat, is the most iconic dish in the city. The drunken noodles and tom yum are equally legendary. Expect queues of 2-3 hours. There is no shortcut. It is always worth the wait.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    address: '327 Maha Chai Rd, Samran Rat, Phra Nakhon, Bangkok 10200',
    priceRange: '$$$',
    featured: false,
    type: 'restaurant',
    yearOpened: 1980,
    chef: 'Supinya "Jay Fai" Junsuta',
    openingHours: 'Mon to Sat 14:00 to 21:00, Closed Sunday',
    dressCode: 'Come as you are',
    signatureDish: 'Crab Omelette (Khai Jeaw Pu)',
    phone: '+66 2 223 9384',
    website: null,
    reservationUrl: null,
    insiderTip: 'Arrive by 14:00 when she opens. The queue only grows. Order the crab omelette AND the drunken noodles. you will regret skipping either.',
    vibe: { energy: 4, price: 4, crowd: 5, dresscode: 1 },
    bestTime: { day: 'Tuesday', time: '17:00-18:00', note: 'Beat the queue' },
  },
  {
    id: 'paste-bangkok',
    name: 'Paste Bangkok',
    category: 'Grand Occasion',
    tags: ['Grand Occasion', 'Local Legend', 'Quiet Escape'],
    cuisine: 'Thai',
    neighborhood: 'Gaysorn',
    description: 'Chef Bee\'s revival of royal Thai recipes from forgotten manuscripts. Elegant, intellectual, and deeply rooted.',
    longDescription: 'Chef Bee Satongun has spent years researching royal Thai recipes from centuries-old manuscripts, reviving forgotten dishes with meticulous technique. Paste Bangkok, perched in Gaysorn Tower, is her stage: a refined space where heritage Thai cuisine is presented with intellectual rigour. The tasting menu moves through historical periods. Ayutthaya-era curries, Rattanakosin desserts, techniques that predate modern Thailand. The wine pairing draws unexpected parallels between Thai spice and European terroir.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    address: 'Gaysorn Tower, Ratchadamri Rd, Lumphini, Pathum Wan, Bangkok 10330',
    priceRange: '$$$',
    featured: false,
    type: 'restaurant',
    yearOpened: 2013,
    chef: 'Bee Satongun',
    openingHours: 'Tue to Sun 12:00 to 14:30, 18:00 to 22:00, Closed Monday',
    dressCode: 'Smart Casual',
    signatureDish: 'Royal Thai Heritage Tasting Menu',
    phone: '+66 2 656 1003',
    website: 'https://www.pastebangkok.com',
    reservationUrl: 'https://www.pastebangkok.com/reservations',
    insiderTip: 'Ask Chef Bee about the historical context of each dish. she knows the manuscripts by heart and the stories elevate every bite.',
    vibe: { energy: 2, price: 4, crowd: 2, dresscode: 3 },
    bestTime: { day: 'Friday', time: '12:00-13:00', note: 'Lunch service, fewer crowds' },
  },
  {
    id: 'sorn',
    name: 'Sorn',
    category: 'Grand Occasion',
    tags: ['Grand Occasion', 'Local Legend', 'The Counter'],
    cuisine: 'Southern Thai',
    neighborhood: 'Sukhumvit',
    description: 'Southern Thai cuisine. Chef Ice sources every ingredient from the south. No shortcuts. No fusion.',
    longDescription: 'Sorn is Chef Supaksorn "Ice" Jongsiri\'s uncompromising tribute to Southern Thai cuisine. earned through obsessive sourcing and zero compromise. Every ingredient arrives from the south: the seafood from Phuket fishermen, the herbs from family farms, the coconut cream pressed fresh daily. The 22-course tasting menu is a journey through Thailand\'s most intense regional cuisine. bold, fiery, and deeply authentic. The restored Thai house setting adds quiet drama.',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
    address: '56 Sukhumvit Soi 26, Khlong Toei, Bangkok 10110',
    priceRange: '$$$$',
    featured: false,
    type: 'restaurant',
    yearOpened: 2018,
    chef: 'Supaksorn "Ice" Jongsiri',
    openingHours: 'Wed to Sun 18:00 to 22:00, Closed Mon & Tue',
    dressCode: 'Smart Casual',
    signatureDish: '22-course Southern Thai Tasting Menu',
    phone: '+66 99 081 1119',
    website: 'https://www.restaurantsorn.com',
    reservationUrl: 'https://www.restaurantsorn.com/reservations',
    insiderTip: 'Let them know your spice tolerance honestly. Southern Thai heat is no joke, and they will calibrate beautifully if you ask.',
    vibe: { energy: 4, price: 5, crowd: 3, dresscode: 3 },
    bestTime: { day: 'Thursday', time: '18:00-19:00', note: 'Midweek, full attention' },
  },
  {
    id: 'baan-tepa',
    name: 'Baan Tepa',
    category: 'Romantic',
    tags: ['Romantic', 'Quiet Escape', 'Festive'],
    cuisine: 'Thai',
    neighborhood: 'Sathorn',
    description: 'An intimate Thai house turned dining room. Garden courtyard, candlelight, and a tasting menu that feels like a private dinner.',
    longDescription: 'Baan Tepa transforms a heritage Thai house in Sathorn into one of Bangkok\'s most intimate dining experiences. The garden courtyard is lit by candles and lanterns. The kitchen, led by Chef Tam Chudaree Debhakam, draws from Central Thai traditions. refined curries, delicate soups, and desserts that reference royal cuisine. With just 30 seats, every meal feels like a private dinner party. The wine list is curated toward lighter styles that complement Thai spice.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    address: 'Sathorn Soi 1, Sathorn, Bangkok 10120',
    priceRange: '$$$',
    featured: false,
    type: 'restaurant',
    yearOpened: 2019,
    chef: 'Tam Chudaree Debhakam',
    openingHours: 'Tue to Sun 18:00 to 22:00, Closed Monday',
    dressCode: 'Smart Casual',
    signatureDish: 'Central Thai Heritage Tasting Menu',
    phone: '+66 97 141 1141',
    website: 'https://www.baantepa.com',
    reservationUrl: 'https://www.baantepa.com/reservations',
    insiderTip: 'Book a table in the garden courtyard. It\'s the most romantic dinner setting in Bangkok, especially during cool season (Nov to Feb).',
    vibe: { energy: 2, price: 4, crowd: 2, dresscode: 3 },
    bestTime: { day: 'Saturday', time: '18:30-19:30', note: 'Garden candlelight at dusk' },
  },
  {
    id: 'gaggan-anand',
    name: 'Gaggan Anand',
    category: 'Grand Occasion',
    tags: ['Grand Occasion', 'The Counter', 'Recently Added'],
    cuisine: 'Progressive Indian',
    neighborhood: 'Ploenchit',
    description: 'Chef Gaggan Anand\'s 25-course theatrical experience. Asia\'s number one restaurant. Indian cuisine at a level rarely seen.',
    longDescription: 'Gaggan Anand sits at a 14-seat L-shaped counter where up to 25 inventive courses unfold across five theatrical acts with shifting lights and a pulsing soundtrack. Chef Gaggan takes Indian cuisine to a rarely seen level with artful dishes that are original and creative, featuring a wonderful blend of textures, flavours, and delicate spicing. Named Asia\'s best restaurant at Asia\'s 50 Best in 2025.',
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80',
    address: '2F, Gaysorn Amarin, 496-502 Ploenchit Rd, Lumpini, Pathumwan, Bangkok 10330',
    priceRange: '$$$$',
    featured: false,
    type: 'restaurant',
    yearOpened: 2015,
    chef: 'Gaggan Anand',
    openingHours: 'Wed to Sun 17:30 to 22:00, Closed Mon & Tue',
    dressCode: 'Smart Casual',
    signatureDish: '25-Course Progressive Indian Tasting Menu',
    phone: '+66 98 889 8989',
    website: 'https://gaggan.com',
    reservationUrl: 'https://gaggan.com/reservations',
    insiderTip: 'The 14-seat counter is the only way to experience it. Book months ahead. Every course is a performance.',
    vibe: { energy: 5, price: 5, crowd: 4, dresscode: 3 },
    bestTime: { day: 'Friday', time: '17:30-18:00', note: 'Opening act energy' },
  },
  {
    id: 'potong',
    name: 'Potong',
    category: 'Grand Occasion',
    tags: ['Grand Occasion', 'Local Legend', 'Recently Added'],
    cuisine: 'Progressive Thai-Chinese',
    neighborhood: 'Chinatown',
    description: 'Chef Pam\'s progressive Thai-Chinese cuisine in the heart of Yaowarat. Asia\'s 50 Best.',
    longDescription: 'Potong is Chef Pichaya "Pam" Soontornyanakij\'s progressive Thai-Chinese restaurant in the heart of Yaowarat. Chef Pam\'s 20-course tasting menu encapsulates her philosophy of five elements to perfect the dish and five senses to formulate memory. Debuted at No.13 on Asia\'s 50 Best Restaurants in 2025.',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
    address: '422 Vanich Rd, Samphanthawong, Bangkok 10100',
    priceRange: '$$$$',
    featured: false,
    type: 'restaurant',
    yearOpened: 2021,
    chef: 'Pichaya "Pam" Soontornyanakij',
    openingHours: 'Wed to Sun 18:00 to 22:00, Closed Mon & Tue',
    dressCode: 'Smart Casual',
    signatureDish: '20-Course Progressive Thai-Chinese Tasting Menu',
    phone: '+66 65 426 2466',
    website: 'https://www.restaurantpotong.com',
    reservationUrl: 'https://www.restaurantpotong.com/reservations',
    insiderTip: 'Walk Yaowarat before dinner. The neighbourhood context makes every course land differently. Ask about the five elements philosophy.',
    vibe: { energy: 4, price: 5, crowd: 3, dresscode: 3 },
    bestTime: { day: 'Saturday', time: '18:00-19:00', note: 'Walk Yaowarat first' },
  },
  {
    id: 'mezzaluna',
    name: 'Mezzaluna',
    category: 'Grand Occasion',
    tags: ['Grand Occasion', 'Romantic', 'Late Night'],
    cuisine: 'French-Japanese',
    neighborhood: 'Silom',
    description: 'On the 65th floor of Lebua. Chef Ryuki Kawasaki\'s French cuisine with Japanese precision. The highest fine dining in Bangkok.',
    longDescription: 'On the 65th floor of State Tower, Mezzaluna is the crown jewel of Lebua with double-height windows surrounding the crescent-shaped dining room. Chef Ryuki Kawasaki leads with visionary precision, blending French haute cuisine with Japanese influences. Every table offers the most commanding views in Bangkok.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    address: '65F, Tower Club at Lebua, 1055 Silom Rd, Bang Rak, Bangkok 10500',
    priceRange: '$$$$',
    featured: false,
    type: 'restaurant',
    yearOpened: 2006,
    chef: 'Ryuki Kawasaki',
    openingHours: 'Daily 18:00 to 23:00',
    dressCode: 'Smart Elegant',
    signatureDish: 'French-Japanese Tasting Menu',
    phone: '+66 2 624 9555',
    website: 'https://lebua.com/restaurants/mezzaluna/',
    reservationUrl: 'https://lebua.com/restaurants/mezzaluna/',
    insiderTip: 'Request a window table facing west for sunset. Arrive 30 minutes early for cocktails at Sky Bar two floors below.',
    vibe: { energy: 3, price: 5, crowd: 3, dresscode: 5 },
    bestTime: { day: 'Friday', time: '17:30-18:30', note: 'Sunset through the windows' },
  },
  {
    id: 'samrub-samrub-thai',
    name: 'Samrub Samrub Thai',
    category: 'Grand Occasion',
    tags: ['Grand Occasion', 'Local Legend', 'The Counter'],
    cuisine: 'Thai',
    neighborhood: 'Silom',
    description: 'Chef Prin Polsuk\'s exploration of regional Thai recipes. The menu changes every two months. Bookings only through social media.',
    longDescription: 'Samrub Samrub Thai is Chef Prin Polsuk\'s restaurant housed in a white four-storey renovated house in Silom. The tasting menu changes every two months, each edition spotlighting different regional Thai flavours discovered on the chef\'s travels with his wife Thanyaporn. Rooted in traditional recipes but reimagined with modern technique. Bookings only through social media.',
    image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800&q=80',
    address: '39/11 Yommarat Alley, Silom, Bang Rak, Bangkok 10500',
    priceRange: '$$$',
    featured: false,
    type: 'restaurant',
    yearOpened: 2020,
    chef: 'Prin Polsuk',
    openingHours: 'Thu to Mon 18:00 to 22:00, Closed Tue & Wed',
    dressCode: 'Smart Casual',
    signatureDish: 'Rotating Regional Thai Tasting Menu',
    phone: null,
    website: 'https://samrubsamrubthai.com',
    reservationUrl: null,
    insiderTip: 'Book via their Instagram DM. No phone, no website booking. The menu rotates every two months so return visits always surprise.',
    vibe: { energy: 3, price: 4, crowd: 3, dresscode: 3 },
    bestTime: { day: 'Thursday', time: '18:00-19:00', note: 'Fresh menu night' },
  },
  {
    id: 'eighty-twenty',
    name: '80/20',
    category: 'Grand Occasion',
    tags: ['Grand Occasion', 'Local Legend', 'Recently Added'],
    cuisine: 'Modern Thai',
    neighborhood: 'Charoenkrung',
    description: 'Named for the ratio of local ingredients to inspiration. Industrial loft, seasonal tasting menus, Thai materials.',
    longDescription: '80/20 is named for the ratio of local ingredients to the chef\'s inspiration. Set in an industrial loft built predominantly from Thai materials, the seasonal tasting menu features innovative interpretations of classic Thai dishes with Lao influences. Traditional techniques create contemporary compositions. A fixture on Asia\'s 50 Best.',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
    address: '1052-1054 Soi Nai Loet 1, Charoen Krung, Bang Rak, Bangkok 10500',
    priceRange: '$$$',
    featured: false,
    type: 'restaurant',
    yearOpened: 2017,
    chef: 'Napol "Joe" Jantraget',
    openingHours: 'Wed to Sun 18:00 to 22:00, Closed Mon & Tue',
    dressCode: 'Casual',
    signatureDish: 'Seasonal Thai Tasting Menu',
    phone: '+66 99 118 2200',
    website: 'https://www.8020bkk.com',
    reservationUrl: 'https://www.8020bkk.com/reservations',
    insiderTip: 'The ground-floor bar serves cocktails using the same local ingredients as the kitchen. Start there before dinner.',
    vibe: { energy: 4, price: 3, crowd: 3, dresscode: 2 },
    bestTime: { day: 'Friday', time: '19:00-20:00', note: 'Bar drinks then dinner' },
  },
  {
    id: 'bisou',
    name: 'Bisou',
    category: 'Recently Added',
    tags: ['Recently Added', 'Quiet Escape', 'Solo Dining'],
    cuisine: 'Modern French',
    neighborhood: 'Ploenchit',
    description: 'Casual French dining on Soi Langsuan. Chef Antoine and sommelier Theo combine fine-dining experience. Weekly rotating menu. Forty covers.',
    longDescription: 'Bisou sits on Soi Langsuan in Ploenchit, where chef and co-owner Antoine, trained in Paris and veteran of acclaimed kitchens, delivers modern French cuisine blending traditional techniques with locally sourced ingredients. Co-owner Theo brings sommelier expertise. The menu rotates weekly. Forty covers. The kind of neighbourhood restaurant Paris does well and Bangkok deserves more of.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=800&q=80',
    address: 'Soi Langsuan, Ploenchit, Lumpini, Pathumwan, Bangkok 10330',
    priceRange: '$$',
    featured: false,
    type: 'restaurant',
    yearOpened: 2022,
    chef: 'Antoine',
    openingHours: 'Tue to Sun 18:00 to 22:30, Closed Monday',
    dressCode: 'Casual',
    signatureDish: 'Weekly Rotating French Menu',
    phone: '+66 95 956 9564',
    website: 'https://www.bisoubangkok.com',
    reservationUrl: 'https://www.bisoubangkok.com/reservations',
    insiderTip: 'Go on a weeknight. The wine list punches well above the price point. Let Theo choose your pairing.',
    vibe: { energy: 3, price: 2, crowd: 3, dresscode: 2 },
    bestTime: { day: 'Tuesday', time: '19:00-20:00', note: 'Weeknight, best wine chat' },
  },
  {
    id: 'clara',
    name: 'Clara',
    category: 'Grand Occasion',
    tags: ['Grand Occasion', 'Romantic', 'Recently Added'],
    cuisine: 'Italian',
    neighborhood: 'Sathorn',
    description: 'Chef Christian Martena\'s Italian fine dining. Gambero Rosso\'s Best Italian Restaurant outside Italy. Tre Forchette. Top 50 Italy.',
    longDescription: 'Clara is Chef Christian Martena\'s celebration of modern Italian cuisine, where he blends his native cooking with creative techniques using high-quality local products alongside premium European ingredients. Named 23rd Best Italian Restaurant in the World by Top50 Italy in 2025, and awarded Tre Forchette and Best Italian Restaurant outside of Italy 2026 by Gambero Rosso.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    address: 'Sathorn Soi 12, Silom, Bang Rak, Bangkok 10500',
    priceRange: '$$$$',
    featured: false,
    type: 'restaurant',
    yearOpened: 2019,
    chef: 'Christian Martena',
    openingHours: 'Tue to Sun 18:00 to 22:30, Closed Monday',
    dressCode: 'Smart Casual',
    signatureDish: 'Modern Italian Tasting Menu',
    phone: '+66 91 764 6464',
    website: 'https://www.clarabangkok.com',
    reservationUrl: 'https://www.clarabangkok.com/reservations',
    insiderTip: 'The pasta courses are where Martena\'s technique is most visible. Ask for the truffle supplement if in season.',
    vibe: { energy: 3, price: 5, crowd: 3, dresscode: 4 },
    bestTime: { day: 'Wednesday', time: '18:30-19:30', note: 'Midweek truffle season' },
  },
];

const BARS = [
  {
    id: 'bamboo-bar',
    name: 'Bamboo Bar',
    category: 'The Ritual',
    tags: ['The Ritual', 'The Lobby'],
    neighborhood: 'Riverside',
    description: 'Inside the Mandarin Oriental since 1953. Jazz every night, colonial elegance, and cocktails that honour seven decades of service.',
    longDescription: 'The Bamboo Bar has been the Mandarin Oriental Bangkok\'s legendary drinking den since 1953. Live jazz fills the intimate, wood-panelled room every night. The cocktail menu pays homage to the hotel\'s literary guests and seven decades of service. expect Thai-inflected classics with house-made syrups and local botanicals. The dress code is enforced. The atmosphere is timeless. This is where Bangkok\'s hospitality legacy lives.',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80',
    address: '48 Oriental Ave, Bang Rak, Bangkok 10500',
    priceRange: '$$$$',
    featured: true,
    type: 'bar',
    yearOpened: 1953,
    bartender: 'Head Bartender. rotating team',
    signature: 'The Authors\' Collection (literary-themed cocktails)',
    openingHours: 'Daily 17:00 to 01:00',
    dressCode: 'Smart Casual (no shorts, no flip-flops)',
    phone: '+66 2 659 9000',
    website: 'https://www.mandarinoriental.com/bangkok/riverside/fine-dining/bars/bamboo-bar',
    insiderTip: 'Arrive before 19:00 to secure a seat without a reservation. After 20:00, the jazz starts and the room fills fast.',
    vibe: { energy: 3, price: 5, crowd: 3, dresscode: 4 },
    bestTime: { day: 'Thursday', time: '19:00-21:00', note: 'Before the band starts' },
  },
  {
    id: 'vesper',
    name: 'Vesper',
    category: 'Behind the Door',
    tags: ['Behind the Door', 'The Ritual'],
    neighborhood: 'Silom',
    description: 'Asia\'s 50 Best Bars. Thai ingredients in liquid form. galangal, makrut lime, lemongrass. The bar that put Bangkok on the global cocktail map.',
    longDescription: 'Vesper put Bangkok on the global cocktail map. A fixture on Asia\'s 50 Best Bars, this Silom institution pioneered the use of Thai ingredients in serious mixology. galangal-infused spirits, makrut lime cordials, lemongrass tinctures. The space is sleek and minimal: a long bar, low lighting, and a team that treats every drink as a composition. The food menu is equally sharp, making Vesper as much a dining destination as a bar.',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80',
    address: '10/15 Convent Rd, Silom, Bang Rak, Bangkok 10500',
    priceRange: '$$$',
    featured: true,
    type: 'bar',
    yearOpened: 2014,
    bartender: 'Award-winning bar team',
    signature: 'Galangal Martini & Thai Botanical Collection',
    openingHours: 'Daily 17:00 to 00:00',
    dressCode: 'Smart Casual',
    phone: '+66 2 235 2777',
    website: 'https://www.vesperbar.co',
    insiderTip: 'Tell the bartender your favourite spirit and let them improvise. The off-menu drinks are often the best thing in the house.',
    vibe: { energy: 4, price: 4, crowd: 4, dresscode: 3 },
    bestTime: { day: 'Wednesday', time: '18:00-20:00', note: 'Midweek bartender attention' },
  },
  {
    id: 'sky-bar',
    name: 'Sky Bar',
    category: 'Above the City',
    tags: ['Above the City'],
    neighborhood: 'Sathorn',
    description: 'The rooftop that started them all. 63rd floor of Lebua. Cityscape that never ends. The Hangover II made it famous; the view keeps it earned.',
    longDescription: 'Sky Bar sits on the 63rd floor of Lebua at State Tower, 250 metres above the Chao Phraya River. It was the world\'s highest open-air bar when it opened and remains one of the most spectacular rooftop experiences on earth. The Hangover Part II made it famous to a global audience, but the 360-degree panorama of Bangkok at night is what keeps people returning. Cocktails are served on the illuminated dome bar that juts out over the city. Arrive at sunset.',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80',
    address: '1055 Silom Rd, Bangrak, Bangkok 10500',
    priceRange: '$$$',
    featured: false,
    type: 'bar',
    yearOpened: 2004,
    bartender: 'Lebua bar team',
    signature: 'Hangovertini & Sky Breeze',
    openingHours: 'Daily 17:00 to 01:00',
    dressCode: 'Smart Casual (no shorts, no sandals)',
    phone: '+66 2 624 9555',
    website: 'https://www.lebua.com/skybar',
    insiderTip: 'Go at 17:30 for sunset. Skip the overpriced cocktails and order a glass of champagne. the view is the real drink.',
    vibe: { energy: 4, price: 4, crowd: 5, dresscode: 3 },
    bestTime: { day: 'Monday', time: '17:30-18:30', note: 'Weekday sunset, thinner crowd' },
  },
  {
    id: 'find-the-locker-room',
    name: 'Find the Locker Room',
    category: 'Behind the Door',
    tags: ['Behind the Door', 'The Ritual'],
    neighborhood: 'Thonglor',
    description: 'Behind a gym locker door in Thonglor. No sign. Password changes weekly. Inside: dim red light, vinyl, and bartenders who remember your drink.',
    longDescription: 'Find the Locker Room is Thonglor\'s worst-kept secret. a speakeasy hidden behind a gym locker door in a nondescript building. There is no sign. The password changes weekly (ask your concierge or check social media). Inside: dim red lighting, vinyl records, leather banquettes, and bartenders who remember your name and your drink. The cocktail menu changes seasonally and leans toward smoky, spirit-forward compositions. Maximum 35 guests at any time.',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80',
    address: 'Sukhumvit Soi 55, Khlong Tan Nuea, Watthana, Bangkok 10110',
    priceRange: '$$$',
    featured: false,
    type: 'bar',
    yearOpened: 2017,
    bartender: 'Rotating guest bartenders',
    signature: 'Seasonal smoky cocktails (menu changes monthly)',
    openingHours: 'Tue to Sun 19:00 to 02:00, Closed Monday',
    dressCode: 'No dress code',
    phone: null,
    website: 'https://www.instagram.com/findthelockerroom',
    insiderTip: 'DM their Instagram for the weekly password. Go on a Tuesday. it\'s the quietest night and the bartenders have time to talk.',
    vibe: { energy: 4, price: 3, crowd: 3, dresscode: 1 },
    bestTime: { day: 'Tuesday', time: '20:00-22:00', note: 'Quiet night, best conversation' },
  },
  {
    id: 'teens-of-thailand',
    name: 'Teens of Thailand',
    category: 'The Ritual',
    tags: ['The Ritual', 'Behind the Door'],
    neighborhood: 'Chinatown',
    description: 'Gin bar in a Chinatown shophouse. Tight space, zero pretension, spectacular botanicals. The bar that proved Bangkok doesn\'t need a view.',
    longDescription: 'Teens of Thailand is a gin-focused bar tucked into a narrow Chinatown shophouse on Soi Nana. The space is deliberately tight. maybe 20 seats. forcing strangers into conversation. The gin collection is one of Asia\'s deepest, and the botanical cocktails draw on Thai herbs and flowers sourced from Chinatown\'s markets. No pretension, no reservations, no view. Just exceptional drinks in a neighbourhood that pulses with energy. This is the bar that proved Bangkok\'s cocktail scene doesn\'t need a rooftop.',
    image: 'https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=800&q=80',
    address: '76 Soi Nana, Charoen Krung, Pom Prap Sattru Phai, Bangkok 10100',
    priceRange: '$$',
    featured: false,
    type: 'bar',
    yearOpened: 2016,
    bartender: 'Niks Anuman-Rajadhon (founder)',
    signature: 'Thai Botanical Gin & Tonic flights',
    openingHours: 'Tue to Sun 18:00 to 00:00, Closed Monday',
    dressCode: 'Come as you are',
    phone: '+66 81 443 5763',
    website: 'https://www.teensofthailand.com',
    insiderTip: 'Walk Soi Nana before your drink. the street art, temples, and vintage shops are half the experience. Then settle in for a gin flight.',
    vibe: { energy: 3, price: 2, crowd: 4, dresscode: 1 },
    bestTime: { day: 'Saturday', time: '19:00-21:00', note: 'Soi Nana street energy' },
  },
  {
    id: 'mod-kaew-wine-bar',
    name: 'Mod Kaew Wine Bar',
    category: 'The Glass',
    tags: ['The Glass', 'The Ritual'],
    neighborhood: 'Sathorn',
    description: 'Natural wines and Thai small plates in a Sathorn shophouse. The kind of wine bar that makes you stay longer than planned.',
    longDescription: 'Mod Kaew Wine Bar brings a curated natural wine list to a restored Sathorn shophouse. Thai-inflected small plates pair beautifully with skin-contact whites and low-intervention reds from small European producers. The atmosphere is warm and unhurried, with a small terrace that catches the evening breeze.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
    address: 'Sathorn Soi 10, Sathorn, Bangkok 10120',
    priceRange: '$$$',
    featured: false,
    type: 'bar',
    yearOpened: 2023,
    bartender: 'Sommelier-led team',
    signature: 'Natural wine flights with Thai pairing bites',
    openingHours: 'Tue to Sun 17:00 to 00:00, Closed Monday',
    dressCode: 'Casual',
    phone: null,
    website: null,
    insiderTip: 'Ask for the off-list natural wines. They keep a rotating stash that never makes the printed menu.',
    vibe: { energy: 2, price: 3, crowd: 2, dresscode: 2 },
    bestTime: { day: 'Thursday', time: '18:00-20:00', note: 'Quiet evening, best pours' },
  },
  {
    id: 'piche-wine-bar',
    name: 'Piche Wine Bar',
    category: 'The Glass',
    tags: ['The Glass', 'Behind the Door'],
    neighborhood: 'Sukhumvit',
    description: 'A hidden wine bar on a quiet Sukhumvit soi. French-leaning list, cheese boards, and a crowd that knows what they\'re drinking.',
    longDescription: 'Piche Wine Bar occupies a discreet ground-floor space on a quiet Sukhumvit soi. The wine list leans French with excellent Burgundy and Loire selections, complemented by artisan cheese boards and charcuterie. The room is intimate with low lighting and jazz.',
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80',
    address: 'Sukhumvit Soi 31, Khlong Toei Nuea, Watthana, Bangkok 10110',
    priceRange: '$$',
    featured: false,
    type: 'bar',
    yearOpened: 2022,
    bartender: 'Wine-focused team',
    signature: 'Burgundy by the glass with French cheese pairing',
    openingHours: 'Mon to Sat 17:00 to 00:00, Closed Sunday',
    dressCode: 'Smart Casual',
    phone: null,
    website: null,
    insiderTip: 'The Burgundy selection is deeper than the menu suggests. Ask what\'s open behind the bar.',
    vibe: { energy: 2, price: 2, crowd: 2, dresscode: 2 },
    bestTime: { day: 'Friday', time: '18:00-20:00', note: 'End-of-week wind-down' },
  },
  {
    id: 'no-bar-wine-bar',
    name: 'No Bar Wine Bar',
    category: 'The Glass',
    tags: ['The Glass', 'The Lobby'],
    neighborhood: 'Ari',
    description: 'Neighbourhood wine bar in Ari. Low-key, well-priced pours, and a terrace that feels like a friend\'s living room.',
    longDescription: 'No Bar Wine Bar sits on a quiet Ari soi, drawing a loyal neighbourhood crowd with approachable wines by the glass and a relaxed terrace. The list spans Old and New World with a soft spot for Italian and Spanish producers. Small plates lean Mediterranean.',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&q=80',
    address: 'Soi Ari 1, Phahonyothin, Phaya Thai, Bangkok 10400',
    priceRange: '$$',
    featured: false,
    type: 'bar',
    yearOpened: 2021,
    bartender: 'Neighbourhood sommelier team',
    signature: 'Italian reds by the glass with bruschetta',
    openingHours: 'Tue to Sun 16:00 to 23:00, Closed Monday',
    dressCode: 'Come as you are',
    phone: null,
    website: null,
    insiderTip: 'The terrace seats fill by 18:00 on weekends. Come early or go midweek for the best spot.',
    vibe: { energy: 2, price: 2, crowd: 3, dresscode: 1 },
    bestTime: { day: 'Wednesday', time: '17:00-19:00', note: 'Midweek terrace quiet' },
  },
  {
    id: 'swirl-wine-bar',
    name: 'Swirl',
    category: 'The Glass',
    tags: ['The Glass'],
    neighborhood: 'Thonglor',
    description: 'Modern wine bar in Thonglor with an emphasis on minimal-intervention producers and a sleek, design-forward interior.',
    longDescription: 'Swirl brings a contemporary wine bar concept to Thonglor with a focus on minimal-intervention and biodynamic producers. The sleek interior features a marble bar and open shelving displaying the curated selection. The food menu is tight and seasonal.',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80',
    address: 'Sukhumvit Soi 55, Khlong Tan Nuea, Watthana, Bangkok 10110',
    priceRange: '$$',
    featured: false,
    type: 'bar',
    yearOpened: 2023,
    bartender: 'Natural wine specialists',
    signature: 'Minimal-intervention wine flights',
    openingHours: 'Wed to Mon 17:00 to 00:00, Closed Tuesday',
    dressCode: 'Casual',
    phone: null,
    website: null,
    insiderTip: 'The orange wines here are some of the best in Bangkok. Ask for whatever just arrived from Georgia.',
    vibe: { energy: 3, price: 2, crowd: 3, dresscode: 2 },
    bestTime: { day: 'Saturday', time: '18:00-20:00', note: 'Weekend energy, full list open' },
  },
  {
    id: 'cloud-wine',
    name: 'Cloud Wine',
    category: 'The Glass',
    tags: ['The Glass', 'The Lobby'],
    neighborhood: 'Saladaeng',
    description: 'Airy wine bar near Saladaeng with floor-to-ceiling windows, a generous by-the-glass list, and sunset light that makes every pour glow.',
    longDescription: 'Cloud Wine occupies a light-filled corner space near Saladaeng BTS, with floor-to-ceiling windows that flood the room with golden-hour light. The by-the-glass list is one of Bangkok\'s most generous, spanning classic regions and emerging producers. The atmosphere is relaxed yet refined.',
    image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=800&q=80',
    address: 'Sala Daeng Soi 1, Silom, Bang Rak, Bangkok 10500',
    priceRange: '$$',
    featured: false,
    type: 'bar',
    yearOpened: 2022,
    bartender: 'Sommelier-curated team',
    signature: 'Generous by-the-glass champagne selection',
    openingHours: 'Daily 16:00 to 00:00',
    dressCode: 'Smart Casual',
    phone: null,
    website: null,
    insiderTip: 'Grab a window seat before 17:30. The sunset through those windows is the best free show in Saladaeng.',
    vibe: { energy: 2, price: 2, crowd: 3, dresscode: 2 },
    bestTime: { day: 'Friday', time: '17:00-19:00', note: 'Golden hour through the glass' },
  },
];

const PARTIES = [
  {
    id: 'beam-club',
    name: 'Beam',
    category: 'Underground',
    tags: ['Underground', 'Live Sound'],
    neighborhood: 'Thonglor',
    description: 'Subterranean club with one of Bangkok\'s most serious sound systems. Techno and house heads descend every weekend for marathon sets.',
    image: 'https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=600&q=80',
    type: 'party',
    priceRange: '$$$',
    featured: true,
    address: '72 Courtyard, Sukhumvit 55, Thonglor, Bangkok 10110',
    phone: null,
    website: 'https://www.beamclub.com',
    insiderTip: 'Get there early to skip the queue. The back room has the best acoustics — plant yourself near the left speaker stack.',
    vibe: { energy: 5, price: 3, crowd: 4, dresscode: 2 },
    bestTime: { day: 'Saturday', time: '23:00-02:00', note: 'Peak hours' },
    link: '#',
  },
  {
    id: 'sugar-club',
    name: 'Sugar Club',
    category: 'Rooftop Session',
    tags: ['Rooftop Session', 'Live Sound'],
    neighborhood: 'Sukhumvit',
    description: 'Elevated rooftop sessions above Sukhumvit 11. Deep house transitions into late-night grooves with panoramic city views.',
    image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=600&q=80',
    type: 'party',
    priceRange: '$$',
    featured: false,
    address: 'Sukhumvit Soi 11, Khlong Toei Nuea, Watthana, Bangkok 10110',
    phone: null,
    website: null,
    insiderTip: 'The sweet spot is after 22:00 when the sunset crowd thins and the real DJs take over.',
    vibe: { energy: 4, price: 2, crowd: 3, dresscode: 2 },
    bestTime: { day: 'Saturday', time: '22:00-01:00', note: 'Late session' },
    link: '#',
  },
  {
    id: 'sing-sing-theater',
    name: 'Sing Sing Theater',
    category: 'Live Sound',
    tags: ['Live Sound', 'Local Scene'],
    neighborhood: 'Sukhumvit',
    description: 'Theatrical nightclub with opium-den decor, vintage Shanghai aesthetics, and a crowd that dresses for the occasion. Hip-hop meets EDM on the main floor.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
    type: 'party',
    priceRange: '$$$',
    featured: true,
    address: 'Sukhumvit Soi 45, Khlong Tan Nuea, Watthana, Bangkok 10110',
    phone: null,
    website: 'https://www.singsingbkk.com',
    insiderTip: 'Book a table on the mezzanine level — it overlooks the entire dance floor and comes with dedicated bottle service.',
    vibe: { energy: 5, price: 3, crowd: 5, dresscode: 3 },
    bestTime: { day: 'Saturday', time: '23:00-01:00', note: 'Main room peaks' },
    link: '#',
  },
  {
    id: 'route-66',
    name: 'Route 66',
    category: 'Local Scene',
    tags: ['Local Scene', 'Live Sound'],
    neighborhood: 'RCA',
    description: 'The legendary RCA institution. Three zones of music — EDM, hip-hop, and Thai pop — packed with locals who know every word.',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80',
    type: 'party',
    priceRange: '$$',
    featured: false,
    address: 'Royal City Avenue, Bangkapi, Huai Khwang, Bangkok 10310',
    phone: null,
    website: null,
    insiderTip: 'The hip-hop room at the back is where the energy peaks. Arrive by 23:00 on Friday for the best crowd.',
    vibe: { energy: 5, price: 2, crowd: 5, dresscode: 2 },
    bestTime: { day: 'Friday', time: '23:00-02:00', note: 'Peak local night' },
    link: '#',
  },
  {
    id: 'onyx-club',
    name: 'Onyx',
    category: 'Underground',
    tags: ['Underground', 'Live Sound'],
    neighborhood: 'RCA',
    description: 'Large-capacity underground club on Royal City Avenue. International headliners, full production, and a crowd that comes to move.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
    type: 'party',
    priceRange: '$$',
    featured: false,
    address: 'Royal City Avenue, Bangkapi, Huai Khwang, Bangkok 10310',
    phone: null,
    website: 'https://www.facebook.com/OnyxBangkok',
    insiderTip: 'Check the lineup before going — weekends with international DJs are a different experience. VIP upstairs gives you breathing room.',
    vibe: { energy: 5, price: 2, crowd: 5, dresscode: 2 },
    bestTime: { day: 'Saturday', time: '23:00-01:00', note: 'Headliner peak' },
    link: '#',
  },
  {
    id: 'ce-la-vi-bangkok',
    name: 'Ce La Vi',
    category: 'Rooftop Session',
    tags: ['Rooftop Session', 'Underground'],
    neighborhood: 'Sathorn',
    description: 'Rooftop club atop Sathorn Square. Sunset sessions transition into full-throttle late-night sets with panoramic views stretching to the river.',
    image: 'https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=600&q=80',
    type: 'party',
    priceRange: '$$$',
    featured: false,
    address: 'Sathorn Square, 98 North Sathorn Rd, Silom, Bang Rak, Bangkok 10500',
    phone: null,
    website: null,
    insiderTip: 'Sunday sunset sessions are the move. Arrive by 17:00 for a terrace spot and stay for the transition into night.',
    vibe: { energy: 4, price: 3, crowd: 4, dresscode: 2 },
    bestTime: { day: 'Sunday', time: '17:00-19:00', note: 'Sunset session' },
    link: '#',
  },
  {
    id: 'levels-club',
    name: 'Levels',
    category: 'Pool Party',
    tags: ['Pool Party', 'Rooftop Session'],
    neighborhood: 'Sukhumvit',
    description: 'Bangkok\'s original pool party venue. Daytime raves in the sun, rooftop sessions after dark, and a crowd that dresses for the occasion.',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80',
    type: 'party',
    priceRange: '$$',
    featured: false,
    address: 'Sukhumvit Soi 11, Khlong Toei Nuea, Watthana, Bangkok 10110',
    phone: null,
    website: null,
    insiderTip: 'Follow their Instagram for pool party dates. Early bird tickets sell out in hours — set an alert when they announce.',
    vibe: { energy: 5, price: 2, crowd: 5, dresscode: 1 },
    bestTime: { day: 'Saturday', time: '14:00-17:00', note: 'Peak pool party hours' },
    link: '#',
  },
  {
    id: 'demo-club',
    name: 'Demo',
    category: 'Live Sound',
    tags: ['Live Sound', 'Underground'],
    neighborhood: 'Thonglor',
    description: 'Multi-room live music and DJ venue in the heart of Thonglor. Three stages, rotating international acts, and a sound system built for impact.',
    image: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=600&q=80',
    type: 'party',
    priceRange: '$$',
    featured: true,
    address: 'Sukhumvit Soi 55, Khlong Tan Nuea, Watthana, Bangkok 10110',
    phone: null,
    website: null,
    insiderTip: 'Thursday is the best night for live bands. Arrive by 22:00 to get a spot near the stage before it packs out.',
    vibe: { energy: 5, price: 2, crowd: 4, dresscode: 1 },
    bestTime: { day: 'Thursday', time: '22:00-01:00', note: 'Live band night' },
    link: '#',
  },
];

const ALL_VENUES = [...HOTELS, ...RESTAURANTS, ...BARS, ...PARTIES];

/* ── Derive a simple time slot from venue data ── */
function getVenueTimeSlot(venue) {
  if (venue.type === 'hotel') return '5PM';
  if (venue.type === 'restaurant') {
    // Mix of 7PM and 9PM based on opening hours / vibe
    if (venue.vibe && venue.vibe.energy >= 4) return '9PM';
    return '7PM';
  }
  if (venue.type === 'bar') {
    if (venue.vibe && venue.vibe.energy >= 4) return '11PM';
    return '9PM';
  }
  if (venue.type === 'party') return '11PM';
  return null;
}

/* ── Card Renderer ── */
function renderCard(venue) {
  const typeLabel = venue.type === 'hotel' ? 'Hotel' : venue.type === 'restaurant' ? 'Restaurant' : venue.type === 'party' ? 'Party' : 'Bar';
  const href = venue.link || `${venue.type === 'hotel' ? 'stay' : venue.type === 'restaurant' ? 'eat' : venue.type === 'party' ? 'parties' : 'drink'}/${venue.id}.html`;
  const cats = venue.tags ? venue.tags.slice(0, 3) : [venue.category];
  const tags = cats.map(t => `<span class="venue-card__tag">${t}</span>`).join('');
  const dataCats = cats.join(',');
  const badge = cats[0] || venue.category;
  return `
    <a href="${href}" class="venue-card" data-categories="${dataCats}">
      <div class="venue-card__img">
        <span class="venue-card__badge">${badge}</span>
        <img src="${venue.image}" alt="${venue.name}" loading="lazy">
      </div>
      <div class="venue-card__body">
        <div class="venue-card__overline">${typeLabel.toUpperCase()} · ${venue.neighborhood.toUpperCase()}</div>
        <h3 class="venue-card__name">${venue.name}</h3>
        <p class="venue-card__desc">${venue.description}</p>
        <div class="venue-card__tags">${tags}</div>
      </div>
    </a>
  `;
}

function renderGrid(containerId, venues, limit) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const items = limit ? venues.slice(0, limit) : venues;
  container.innerHTML = items.map(renderCard).join('');
  document.dispatchEvent(new CustomEvent('cardsRendered'));
}

function filterAndRender(containerId, venues, category) {
  if (category === 'all') {
    renderGrid(containerId, venues);
  } else {
    const catLower = category.toLowerCase();
    const filtered = venues.filter(v => {
      if (v.category && v.category.toLowerCase() === catLower) return true;
      if (v.tags && v.tags.some(t => t.toLowerCase() === catLower)) return true;
      return false;
    });
    renderGrid(containerId, filtered);
  }
}

/* ── Glass Slider (animated highlight behind active category button) ── */
function initSlider(strip) {
  let slider = strip.querySelector('.category-strip__slider');
  if (!slider) {
    slider = document.createElement('div');
    slider.className = 'category-strip__slider';
    slider.style.cssText = 'position:absolute;top:0;left:0;height:100%;background:#fff;border-radius:999px;transition:all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);pointer-events:none;z-index:0;';
    strip.style.position = 'relative';
    strip.prepend(slider);
  }
  const moveSlider = () => {
    const active = strip.querySelector('.category-strip__btn--active');
    if (!active) { slider.style.opacity = '0'; return; }
    slider.style.opacity = '1';
    slider.style.width = active.offsetWidth + 'px';
    slider.style.transform = 'translateX(' + active.offsetLeft + 'px)';
  };
  moveSlider();
  window.addEventListener('resize', moveSlider);
  return moveSlider;
}

/* ── Category Strip Handler ── */
function setupCategoryStrip(stripId, gridId, venues) {
  const strip = document.getElementById(stripId);
  if (!strip) return;

  // Check if this is a new-style strip (with __wrap and __item) or legacy (__btn)
  const wrap = strip.querySelector('.category-strip__wrap');
  if (wrap) {
    // New style — attach filtering to __item clicks
    wrap.addEventListener('click', (e) => {
      const btn = e.target.closest('.category-strip__item');
      if (!btn) return;
      filterAndRender(gridId, venues, btn.dataset.category);
      highlightTonightCards();
    });
    return;
  }

  // Legacy style — __btn based
  const moveSlider = initSlider(strip);
  strip.addEventListener('click', (e) => {
    const btn = e.target.closest('.category-strip__btn');
    if (!btn) return;
    strip.querySelectorAll('.category-strip__btn').forEach(b => b.classList.remove('category-strip__btn--active'));
    btn.classList.add('category-strip__btn--active');
    moveSlider();
    filterAndRender(gridId, venues, btn.dataset.category || btn.dataset.cat);
    highlightTonightCards();
  });
}

/* ── Navigation (kept for home page SPA sections) ── */
function nav(route) {
  // For multi-page navigation
  const routes = {
    'hotels': 'stay.html',
    'restaurants': 'eat.html',
    'bars': 'drink.html',
    'city': 'bangkok.html',
  };
  if (routes[route]) {
    window.location.href = routes[route];
    return;
  }
  // Fallback for SPA pages still on index
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('pg-' + route);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

/* ── Scroll Animations (legacy fade-in class support) ── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const children = entry.target.querySelectorAll('.venue-card, .card, .tonight__card');
      children.forEach((child, i) => {
        child.style.transitionDelay = `${i * 80}ms`;
        child.classList.add('visible');
      });
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

/* ── Hero Carousel (single card, auto-rotate every 3s) ── */
const HERO_SLIDES = [
  { name: 'Capella Bangkok', type: 'Hotel', neighborhood: 'Chao Phraya Riverside', desc: 'Riverside ultra-luxury by Andre Fu. Every suite faces the Chao Phraya.', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', href: 'stay/capella-bangkok.html', badge: 'Design Forward', tags: ['Design Forward', 'River & Water'] },
  { name: 'Le Du', type: 'Restaurant', neighborhood: 'Silom', desc: 'Seasonal tasting menus that redefine Thai ingredients through French technique.', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', href: 'eat/le-du.html', badge: 'Grand Occasion', tags: ['Grand Occasion', 'The Counter'] },
  { name: 'Suhring', type: 'Restaurant', neighborhood: 'Yen Akat', desc: 'German cuisine in a colonial garden house.', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', href: 'eat/suhring.html', badge: 'Grand Occasion', tags: ['Grand Occasion', 'Romantic'] },
  { name: 'Bamboo Bar', type: 'Bar', neighborhood: 'Riverside', desc: 'Jazz since 1953. Colonial elegance at the Mandarin Oriental.', image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80', href: 'drink/bamboo-bar.html', badge: 'The Ritual', tags: ['The Ritual', 'The Lobby'] },
  { name: 'Mandarin Oriental', type: 'Hotel', neighborhood: 'Riverside', desc: 'Since 1876. Authors\' Wing, Le Normandie, Bamboo Bar.', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', href: 'stay/mandarin-oriental.html', badge: 'Old Soul', tags: ['Old Soul', 'Grand Occasion'] },
  { name: 'Nusara', type: 'Restaurant', neighborhood: 'Sathorn', desc: 'Heritage Thai flavours. Architectural precision.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80', href: 'eat/nusara.html', badge: 'Grand Occasion', tags: ['Grand Occasion', 'Local Legend'] },
];

let heroSlideIndex = 0;

function renderHeroSlide() {
  const carousel = document.getElementById('hero-carousel');
  if (!carousel) return;
  const s = HERO_SLIDES[heroSlideIndex];
  const tags = s.tags.map(t => `<span class="hero__carousel-card__tag">${t}</span>`).join('');
  carousel.innerHTML = `
    <a href="${s.href}" class="hero__carousel-card">
      <div class="hero__carousel-card__img">
        <img src="${s.image}" alt="${s.name}">
        <div class="hero__carousel-card__badge">${s.badge}</div>
      </div>
      <div class="hero__carousel-card__body">
        <div class="hero__carousel-card__overline">${s.type} · ${s.neighborhood}</div>
        <div class="hero__carousel-card__name">${s.name.toUpperCase()}</div>
        <div class="hero__carousel-card__location">${s.neighborhood}</div>
        <p class="hero__carousel-card__desc">${s.desc}</p>
        <div class="hero__carousel-card__tags">${tags}</div>
      </div>
    </a>
  `;
}

function startHeroCarousel() {
  renderHeroSlide();
  setInterval(() => {
    heroSlideIndex = (heroSlideIndex + 1) % HERO_SLIDES.length;
    renderHeroSlide();
  }, 4500);
}

startHeroCarousel();

/* ── Featured Restaurants section removed ── */

/* ── Spotlight: highlight Tonight card matching current Bangkok time ── */
function highlightTonightCards() {
  const now = new Date();
  const bangkokHour = (now.getUTCHours() + 7) % 24;

  let currentSlot;
  if (bangkokHour >= 17 && bangkokHour < 19) currentSlot = '5PM';
  else if (bangkokHour >= 19 && bangkokHour < 21) currentSlot = '7PM';
  else if (bangkokHour >= 21 && bangkokHour < 23) currentSlot = '9PM';
  else if (bangkokHour >= 23 || bangkokHour < 5) currentSlot = '11PM';

  const tonightCards = document.querySelectorAll('.tonight__card');
  if (!tonightCards.length) return;

  tonightCards.forEach(card => {
    const time = card.getAttribute('data-time');
    if (currentSlot && time === currentSlot) {
      card.classList.add('tonight__card--active');
      card.classList.remove('tonight__card--inactive');
    } else if (currentSlot) {
      card.classList.add('tonight__card--inactive');
      card.classList.remove('tonight__card--active');
    }
  });
}

/* ── Init ── */
function init() {
  // Tonight section
  renderTonight();

  // Home page grids
  renderGrid('hotels-grid', HOTELS);
  renderGrid('restaurants-grid', RESTAURANTS);
  renderGrid('bars-grid', BARS);
  renderGrid('party-grid', PARTIES);

  // Editors' Picks
  const editorsPicks = [HOTELS[0], RESTAURANTS[0], BARS[0], RESTAURANTS[1], HOTELS[5], BARS[1]];
  renderGrid('editors-grid', editorsPicks);
  renderGrid('editors-page-grid', editorsPicks);

  // Full page grids
  renderGrid('hotels-page-grid', HOTELS);
  renderGrid('restaurants-page-grid', RESTAURANTS);
  renderGrid('bars-page-grid', BARS);
  renderGrid('party-page-grid', PARTIES);

  // City hub grids
  renderGrid('city-hotels-grid', HOTELS.filter(h => h.featured), 3);
  renderGrid('city-restaurants-grid', RESTAURANTS.filter(r => r.featured), 3);

  // Build ALL category strips for home page (containers are empty in HTML)
  buildCategoryStrip('restaurants-categories', ['all','Grand Occasion','Romantic','Festive','Late Night','Quiet Escape','By the Water','The Counter','Sunday Ritual','Solo Dining','Local Legend','Street to Star']);
  buildCategoryStrip('hotels-categories', ['all','Grand Occasion','Design Forward','River & Water','The Pool','Slow Stay','New Opening','Old Soul','Night City']);
  buildCategoryStrip('bars-categories', ['all','The Ritual','Above the City','Behind the Door','The Lobby','The Glass']);
  buildCategoryStrip('party-categories', ['all','Underground','Live Sound','Pool Party','Rooftop Session','Local Scene']);

  // Category strip filters (home page)
  setupCategoryStrip('hotels-categories', 'hotels-grid', HOTELS);
  setupCategoryStrip('restaurants-categories', 'restaurants-grid', RESTAURANTS);
  setupCategoryStrip('bars-categories', 'bars-grid', BARS);
  setupCategoryStrip('party-categories', 'party-grid', PARTIES);

  // Build category strips for sub-pages FIRST (replaces innerHTML)
  buildCategoryStrip('hotels-page-categories', ['all','Grand Occasion','Design Forward','River & Water','The Pool','Slow Stay','New Opening','Old Soul','Night City']);
  buildCategoryStrip('restaurants-page-categories', ['all','Grand Occasion','Romantic','Festive','Late Night','Quiet Escape','By the Water','The Counter','Sunday Ritual','Solo Dining','Local Legend','Street to Star']);
  buildCategoryStrip('bars-page-categories', ['all','The Ritual','Above the City','Behind the Door','The Lobby','The Glass']);
  buildCategoryStrip('party-page-categories', ['all','Underground','Live Sound','Pool Party','Rooftop Session','Local Scene']);

  // THEN attach event listeners for sub-page strips
  setupCategoryStrip('hotels-page-categories', 'hotels-page-grid', HOTELS);
  setupCategoryStrip('restaurants-page-categories', 'restaurants-page-grid', RESTAURANTS);
  setupCategoryStrip('bars-page-categories', 'bars-page-grid', BARS);
  setupCategoryStrip('party-page-categories', 'party-page-grid', PARTIES);

  // Wire up hamburger menu for all pages
  document.querySelectorAll('.page-nav__hamburger, .glass-nav__hamburger').forEach(btn => {
    btn.addEventListener('click', toggleMobileMenu);
  });
  document.querySelectorAll('.mobile-menu__close').forEach(btn => {
    btn.addEventListener('click', toggleMobileMenu);
  });

  // Highlight cards matching current Bangkok time
  highlightTonightCards();
}

/* ── Category Icons Map ── */
const CATEGORY_ICONS = {
  'all': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  'Design Hotels': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
  'New Hotels': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  'Romantic': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  'Historic': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01"/></svg>',
  'Best Pool': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><circle cx="12" cy="8" r="3"/></svg>',
  'Adults Only': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  'Business': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v.01"/></svg>',
  'Beach': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="5" r="3"/><path d="M2 20h20M5 20c0-5 3-9 7-9s7 4 7 9"/></svg>',
  'Grand Occasion': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  'Late Culture Best': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>',
  'Local Cuisine': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>',
  'Seafood': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M12 3C8 3 4 6 4 12h16c0-6-4-9-8-9z"/></svg>',
  'French': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 2h8l-2 5h4l-7 8 2-5H9l3-8"/></svg>',
  'Japanese': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 0 0 0 20M12 2a7 7 0 0 1 0 20"/></svg>',
  'Italian': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>',
  'Festive': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v6M12 18v4M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24"/></svg>',
  'Recently Added': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  'Cocktail Bars': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 22h8M12 15v7M4 2h16l-6 9v4h-4V11L4 2z"/></svg>',
  'Rooftop Bars': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M9 21V9l3-3 3 3v12M5 21V12l-2 2M19 21V12l2 2"/></svg>',
  'Hotel Bars': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M6 12V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8M2 16h20"/></svg>',
  'Speakeasy': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>',
  'The Glass': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 22h8M12 15v7M6 2h12l-1 7a5 5 0 0 1-10 0L6 2z"/></svg>',
  'Design Forward': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
  'River & Water': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></svg>',
  'The Pool': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><circle cx="12" cy="8" r="3"/></svg>',
  'Slow Stay': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  'New Opening': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  'Old Soul': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>',
  'Night City': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  'Late Night': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  'Quiet Escape': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>',
  'By the Water': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></svg>',
  'The Counter': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="12" width="20" height="4" rx="1"/><path d="M6 12V8M10 12V8M14 12V8M18 12V8"/></svg>',
  'Sunday Ritual': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>',
  'Solo Dining': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>',
  'Local Legend': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>',
  'Street to Star': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  'The Ritual': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>',
  'Above the City': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M9 21V9l3-3 3 3v12M5 21V12l-2 2M19 21V12l2 2"/></svg>',
  'Behind the Door': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>',
  'The Lobby': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M6 12V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8M2 16h20"/></svg>',
  'Underground': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  'Live Sound': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/></svg>',
  'Pool Party': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><circle cx="12" cy="8" r="3"/></svg>',
  'Rooftop Session': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18M9 21V9l3-3 3 3v12M5 21V12l-2 2M19 21V12l2 2"/></svg>',
  'Local Scene': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>',
};

function buildCategoryStrip(containerId, categories) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const buttons = categories.map((cat, i) => {
    const label = cat === 'all' ? 'All' : cat;
    return '<button class="category-strip__item' + (i === 0 ? ' active' : '') + '" data-category="' + cat + '">' + label + '</button>';
  }).join('');
  container.innerHTML = '<div class="category-strip__wrap"><div class="category-strip__slider"></div>' + buttons + '</div>';
  initSliderWrap(container.querySelector('.category-strip__wrap'));
}

/* ── Slider for new __wrap structure ── */
function initSliderWrap(wrap) {
  if (!wrap) return;
  const slider = wrap.querySelector('.category-strip__slider');
  if (!slider) return;
  const moveSlider = () => {
    const active = wrap.querySelector('.category-strip__item.active');
    if (!active) { slider.style.opacity = '0'; return; }
    slider.style.opacity = '1';
    slider.style.width = active.offsetWidth + 'px';
    slider.style.transform = 'translateX(' + (active.offsetLeft - 4) + 'px)';
  };
  moveSlider();
  window.addEventListener('resize', moveSlider);

  wrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.category-strip__item');
    if (!btn) return;
    wrap.querySelectorAll('.category-strip__item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    moveSlider();
  });
  return moveSlider;
}


/* ── Mapbox Map ── */
let map = null;
let mapMarkers = [];

function initMap() {
  if (!window.mapboxgl) return;
  const mapEl = document.getElementById('map');
  if (!mapEl) return;

  mapboxgl.accessToken = 'MAPBOX_TOKEN_PLACEHOLDER';

  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [100.5018, 13.7363],
    zoom: 12,
    pitch: 0,
    attributionControl: false,
  });

  map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');
  map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-left');

  map.on('load', () => {
    addMapMarkers('all');
  });

  document.querySelectorAll('.map-filter__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.map-filter__btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      addMapMarkers(btn.dataset.filter);
    });
  });
}

function addMapMarkers(filter) {
  mapMarkers.forEach(m => m.remove());
  mapMarkers = [];

  const venues = filter === 'all' ? ALL_VENUES : ALL_VENUES.filter(v => v.type === filter);

  venues.forEach(venue => {
    const coords = getVenueCoords(venue);
    if (!coords) return;

    const el = document.createElement('div');
    el.className = `map-marker map-marker--${venue.type}`;

    const typeLabel = venue.type === 'hotel' ? 'Hotel' : venue.type === 'restaurant' ? 'Restaurant' : venue.type === 'party' ? 'Party' : 'Bar';
    const href = venue.link || `${venue.type === 'hotel' ? 'stay' : venue.type === 'restaurant' ? 'eat' : venue.type === 'party' ? 'parties' : 'drink'}/${venue.id}.html`;
    const popup = new mapboxgl.Popup({ offset: 12, closeButton: true, maxWidth: '300px' })
      .setHTML(`
        <div class="map-popup">
          <div class="map-popup__img">
            <img src="${venue.image}" alt="${venue.name}" loading="lazy">
          </div>
          <div class="map-popup__body">
            <div class="map-popup__overline">${typeLabel} · ${venue.category}</div>
            <div class="map-popup__name"><a href="${href}">${venue.name}</a></div>
            <div class="map-popup__desc">${venue.description}</div>
          </div>
        </div>
      `);

    const marker = new mapboxgl.Marker(el)
      .setLngLat(coords)
      .setPopup(popup)
      .addTo(map);

    mapMarkers.push(marker);
  });
}

function getVenueCoords(venue) {
  const coordMap = {
    'capella-bangkok': [100.5133, 13.7080],
    'the-siam': [100.5100, 13.7825],
    'the-mustang-nero': [100.5234, 13.7273],
    'rosewood-bangkok': [100.5460, 13.7445],
    'oriental-residence': [100.5470, 13.7410],
    'mandarin-oriental': [100.5162, 13.7235],
    'le-du': [100.5250, 13.7270],
    'suhring': [100.5390, 13.7020],
    'nusara': [100.5340, 13.7190],
    'jay-fai': [100.5010, 13.7560],
    'paste-bangkok': [100.5405, 13.7465],
    'sorn': [100.5650, 13.7230],
    'baan-tepa': [100.5290, 13.7210],
    'bamboo-bar': [100.5162, 13.7235],
    'vesper': [100.5290, 13.7250],
    'sky-bar': [100.5160, 13.7220],
    'find-the-locker-room': [100.5790, 13.7320],
    'teens-of-thailand': [100.5090, 13.7400],
    'gaggan-anand': [100.5405, 13.7445],
    'potong': [100.5095, 13.7370],
    'mezzaluna': [100.5160, 13.7220],
    'samrub-samrub-thai': [100.5250, 13.7260],
    'eighty-twenty': [100.5140, 13.7260],
    'bisou': [100.5410, 13.7420],
    'clara': [100.5300, 13.7200],
    'park-hyatt-bangkok': [100.5470, 13.7440],
    'kimpton-maa-lai': [100.5400, 13.7430],
    'the-standard-bangkok': [100.5220, 13.7210],
    'sindhorn-kempinski': [100.5400, 13.7420],
    'beam-club': [100.5790, 13.7340],
    'sugar-club': [100.5530, 13.7430],
    'sing-sing-theater': [100.5720, 13.7310],
    'route-66': [100.5720, 13.7555],
    'onyx-club': [100.5720, 13.7560],
    'ce-la-vi-bangkok': [100.5280, 13.7220],
    'levels-club': [100.5535, 13.7435],
    'demo-club': [100.5785, 13.7325],
    'mod-kaew-wine-bar': [100.5340, 13.7200],
    'piche-wine-bar': [100.5620, 13.7350],
    'no-bar-wine-bar': [100.5390, 13.7720],
    'swirl-wine-bar': [100.5790, 13.7330],
    'cloud-wine': [100.5260, 13.7260],
  };
  return coordMap[venue.id] || null;
}

/* ── Tonight Section ── */
function pickRandom(arr) {
  if (!arr || arr.length === 0) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

function getVenueHref(venue) {
  const typeMap = { hotel: 'stay', restaurant: 'eat', bar: 'drink', party: 'parties' };
  return `${typeMap[venue.type] || venue.type}/${venue.id}.html`;
}

function getBangkokTime() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
}

function formatBangkokTime(date) {
  let h = date.getHours();
  const m = date.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm} BKK`;
}

function getTonightPicks(hour) {
  // Always return 4 picks mapped to the 5PM / 7PM / 9PM / 11PM time slots
  return [
    { time: '5PM', label: 'Golden Hour', venue: pickRandom(BARS.filter(b => b.category === 'Above the City')) || pickRandom(BARS) },
    { time: '7PM', label: 'Dinner', venue: pickRandom(RESTAURANTS.filter(r => r.featured || r.category === 'Grand Occasion')) || pickRandom(RESTAURANTS) },
    { time: '9PM', label: 'Post-Dinner', venue: pickRandom(BARS.filter(b => b.category === 'Behind the Door' || b.category === 'The Ritual')) || pickRandom(BARS) },
    { time: '11PM', label: 'Late Night', venue: (PARTIES.length > 0) ? pickRandom(PARTIES) : pickRandom(BARS) },
  ];
}

function renderTonightCard(pick) {
  const venue = pick.venue;
  const href = getVenueHref(venue);
  return `<a href="${href}" class="tonight__card" data-time="${pick.time}">
    <div class="tonight__card-time">${pick.time}</div>
    <div class="tonight__card-img">
      <img src="${venue.image}" alt="${venue.name}" loading="lazy">
    </div>
    <div class="tonight__card-overlay">
      <span class="tonight__card-label">${pick.label}</span>
      <div class="tonight__card-name">${venue.name}</div>
      <div class="tonight__card-meta">${venue.neighborhood}</div>
    </div>
  </a>`;
}

function updateTonightClock() {
  const timeEl = document.getElementById('tonight-time');
  if (timeEl) {
    timeEl.textContent = formatBangkokTime(getBangkokTime());
  }
}

function renderTonight() {
  const grid = document.getElementById('tonight-grid');
  if (!grid) return;

  const bkk = getBangkokTime();
  const hour = bkk.getHours();
  const picks = getTonightPicks(hour);

  grid.innerHTML = picks
    .filter(p => p.venue)
    .map(p => renderTonightCard(p))
    .join('');

  updateTonightClock();
  setInterval(updateTonightClock, 60000);
}

// Run
init();
initMap();

document.querySelectorAll('.category-strip').forEach(strip => {
  initSlider(strip);
});

// ── Scroll Reveal ──
(function() {
  const revealEls = document.querySelectorAll('.section-title, .section-subtitle, .section-overline, .venue-card, .tonight__card, .separator, .manifesto__text');

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${(i % 6) * 0.1}s, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${(i % 6) * 0.1}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
})();

// ── Card scroll reveal ──
(function() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function() {
          entry.target.classList.add('is-visible');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  function observeCards() {
    document.querySelectorAll('.venue-card').forEach(function(card) {
      observer.observe(card);
    });
  }

  // Observe on load and after filter
  observeCards();
  document.addEventListener('cardsRendered', observeCards);
})();

// ── Text Trail Cursor removed ──
