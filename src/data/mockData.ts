export const biharDistricts = [
  'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Bihar Sharif',
  'Arrah', 'Begusarai', 'Katihar', 'Munger', 'Chhapra', 'Danapur',
  'Saharsa', 'Hajipur', 'Sasaram', 'Dehri', 'Siwan', 'Motihari',
  'Nawada', 'Bagaha', 'Buxar', 'Kishanganj', 'Sitamarhi', 'Jamalpur',
  'Jehanabad', 'Aurangabad', 'Lakhisarai', 'Sheikhpura', 'Supaul',
  'Madhubani', 'Araria', 'Samastipur', 'Purnia', 'Madhepura', 'Khagaria',
  'Banka', 'Jamui', 'Rohtas', 'Kaimur', 'West Champaran', 'East Champaran'
];

export const serviceCategories = [
  {
    id: 'salon',
    name: 'Beauty & Salon',
    icon: '✂️',
    description: 'Hair, beauty, and grooming services'
  },
  {
    id: 'decorator',
    name: 'Event Decorators',
    icon: '🎨',
    description: 'Wedding and event decoration services'
  },
  {
    id: 'car-rental',
    name: 'Car Rental',
    icon: '🚗',
    description: 'Vehicle rental for any occasion'
  },
  {
    id: 'dj',
    name: 'DJ Services',
    icon: '🎵',
    description: 'Music and entertainment for events'
  },
  {
    id: 'hotel',
    name: 'Hotels',
    icon: '🏨',
    description: 'Accommodation and lodging services'
  },
  {
    id: 'catering',
    name: 'Catering',
    icon: '🍽️',
    description: 'Food and catering services'
  }
];

export const mockServices = [
  // Salon Services
  {
    id: '1',
    name: 'Glamour Beauty Salon',
    category: 'salon',
    location: 'Patna',
    price: 1500,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Premium beauty salon offering hair styling, facial treatments, and complete makeover services.',
    features: ['Hair Cut & Styling', 'Facial Treatments', 'Bridal Makeup', 'Nail Art', 'Threading']
  },
  {
    id: '2',
    name: 'Royal Cuts Unisex Salon',
    category: 'salon',
    location: 'Gaya',
    price: 1200,
    rating: 4.3,
    image: 'https://images.pexels.com/photos/3992856/pexels-photo-3992856.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Modern unisex salon with expert stylists and premium products.',
    features: ['Men & Women Hair Cut', 'Hair Color', 'Beard Styling', 'Spa Treatments']
  },
  {
    id: '13',
    name: 'Elite Beauty Lounge',
    category: 'salon',
    location: 'Muzaffarpur',
    price: 1800,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Luxury beauty salon with premium services and expert beauticians.',
    features: ['Premium Hair Styling', 'Advanced Facial', 'Bridal Packages', 'Hair Treatments']
  },
  
  // Event Decorators
  {
    id: '3',
    name: 'Dream Wedding Decorators',
    category: 'decorator',
    location: 'Patna',
    price: 25000,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Complete wedding decoration services with floral arrangements and lighting.',
    features: ['Stage Decoration', 'Floral Arrangements', 'Lighting Setup', 'Theme Decoration', 'Photography Setup']
  },
  {
    id: '4',
    name: 'Elite Event Planners',
    category: 'decorator',
    location: 'Muzaffarpur',
    price: 18000,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Professional event planning and decoration for all occasions.',
    features: ['Birthday Parties', 'Corporate Events', 'Anniversary Celebrations', 'Custom Themes']
  },
  {
    id: '14',
    name: 'Royal Decorators',
    category: 'decorator',
    location: 'Gaya',
    price: 22000,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Traditional and modern decoration services for all events.',
    features: ['Wedding Decoration', 'Reception Setup', 'Mandap Decoration', 'Lighting']
  },

  // Car Rental
  {
    id: '5',
    name: 'Bihar Car Rentals',
    category: 'car-rental',
    location: 'Patna',
    price: 2500,
    rating: 4.4,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Premium car rental service with well-maintained vehicles and professional drivers.',
    features: ['Sedan Cars', 'SUV Available', 'Professional Drivers', 'AC Vehicles', '24/7 Service']
  },
  {
    id: '6',
    name: 'Royal Ride Car Service',
    category: 'car-rental',
    location: 'Gaya',
    price: 2200,
    rating: 4.2,
    image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Affordable car rental with luxury and economy options.',
    features: ['Economy Cars', 'Luxury Vehicles', 'Airport Pickup', 'Long Distance Travel']
  },
  {
    id: '15',
    name: 'Premium Car Hire',
    category: 'car-rental',
    location: 'Muzaffarpur',
    price: 2800,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Luxury car rental service with premium vehicles.',
    features: ['Luxury Cars', 'Wedding Cars', 'Corporate Travel', 'Airport Transfer']
  },

  // DJ Services
  {
    id: '7',
    name: 'Beat Drop DJ Services',
    category: 'dj',
    location: 'Patna',
    price: 8000,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Professional DJ services with high-quality sound systems and lighting.',
    features: ['Professional DJ', 'Sound System', 'LED Lighting', 'Wireless Mics', 'Dance Floor Setup']
  },
  {
    id: '8',
    name: 'Party Beats DJ',
    category: 'dj',
    location: 'Bhagalpur',
    price: 6500,
    rating: 4.3,
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Energetic DJ services for weddings, parties, and corporate events.',
    features: ['Wedding DJ', 'Party Music', 'Corporate Events', 'Sound Equipment']
  },
  {
    id: '16',
    name: 'Music Masters DJ',
    category: 'dj',
    location: 'Gaya',
    price: 7500,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Professional DJ services with latest music and equipment.',
    features: ['Latest Music', 'Professional Setup', 'Event Management', 'Lighting Effects']
  },

  // Hotels
  {
    id: '9',
    name: 'Grand Bihar Hotel',
    category: 'hotel',
    location: 'Patna',
    price: 3500,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Luxury hotel with modern amenities and excellent service.',
    features: ['AC Rooms', 'Room Service', 'Free WiFi', 'Restaurant', 'Conference Hall']
  },
  {
    id: '10',
    name: 'Comfort Inn Bihar',
    category: 'hotel',
    location: 'Gaya',
    price: 2800,
    rating: 4.2,
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Comfortable accommodation with all basic amenities.',
    features: ['Clean Rooms', 'Parking', 'Breakfast', '24hr Front Desk']
  },
  {
    id: '17',
    name: 'Heritage Hotel',
    category: 'hotel',
    location: 'Muzaffarpur',
    price: 4200,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Premium heritage hotel with traditional hospitality.',
    features: ['Heritage Rooms', 'Traditional Cuisine', 'Event Halls', 'Spa Services']
  },

  // Catering
  {
    id: '11',
    name: 'Taste of Bihar Catering',
    category: 'catering',
    location: 'Patna',
    price: 350,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Authentic Bihari cuisine and multi-cuisine catering services.',
    features: ['Bihari Cuisine', 'Multi-Cuisine', 'Veg & Non-Veg', 'Bulk Orders', 'Event Catering']
  },
  {
    id: '12',
    name: 'Royal Feast Catering',
    category: 'catering',
    location: 'Muzaffarpur',
    price: 400,
    rating: 4.4,
    image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Premium catering service for weddings and special occasions.',
    features: ['Wedding Catering', 'Live Counters', 'Dessert Section', 'Professional Service']
  }
];

export const coupons = [
  { code: 'WELCOME10', discount: 10, description: 'Welcome offer - 10% off' },
  { code: 'SAVE20', discount: 20, description: 'Save big - 20% off' },
  { code: 'FIRST50', discount: 50, description: 'First booking - ₹50 off' },
  { code: 'BIHAR25', discount: 25, description: 'Bihar special - 25% off' }
];