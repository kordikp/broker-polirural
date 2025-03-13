import { Product, Farmer, Customer, SuccessStory, MarketPrediction } from './api';

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Fresh Organic Vegetables',
    type: 'vegetables',
    description: 'Locally grown organic vegetables, harvested daily for maximum freshness.',
    location: 'Green Valley Farm',
    price: '$4.50/lb',
    image: '/images/product-vegetables.jpg',
    inStock: true,
    organic: true,
    featured: true,
    farmerId: '1',
    seasonalAvailability: {
      start: 4, // April
      end: 10, // October
    },
    estimatedYearlyVolume: 5000,
    certifications: ['organic', 'local'],
  },
  {
    id: '2',
    title: 'Premium Hardwood Lumber',
    type: 'forestry',
    description: 'Sustainably harvested hardwood lumber, perfect for furniture and construction.',
    location: 'Oakwood Timber',
    price: '$8.25/ft²',
    image: '/images/product-lumber.jpg',
    inStock: true,
    farmerId: '2',
    seasonalAvailability: {
      start: 1, // January
      end: 12, // December
    },
    estimatedYearlyVolume: 10000,
    certifications: ['sustainable'],
  },
  {
    id: '3',
    title: 'Artisanal Goat Cheese',
    type: 'dairy',
    description: 'Handcrafted goat cheese made from milk from our free-range goats.',
    location: 'Meadow Haven',
    price: '$6.75/8oz',
    image: '/images/product-cheese.jpg',
    inStock: false,
    organic: true,
    farmerId: '3',
    seasonalAvailability: {
      start: 3, // March
      end: 11, // November
    },
    estimatedYearlyVolume: 2000,
    certifications: ['organic', 'artisanal'],
  },
  {
    id: '4',
    title: 'Organic Sweet Corn',
    type: 'grain',
    description: 'Sweet and juicy corn, grown without pesticides or synthetic fertilizers.',
    location: 'Sunrise Farm',
    price: '$3.25/dozen',
    image: '/images/product-corn.jpg',
    inStock: true,
    organic: true,
    farmerId: '1',
    seasonalAvailability: {
      start: 6, // June
      end: 9, // September
    },
    estimatedYearlyVolume: 8000,
    certifications: ['organic'],
  },
];

// Mock Farmers
export const mockFarmers: Farmer[] = [
  {
    id: '1',
    name: 'Green Valley Farm',
    email: 'contact@greenvalleyfarm.com',
    phone: '(555) 123-4567',
    location: {
      address: '123 Farm Road, Green Valley, CA 95446',
      lat: 38.4057,
      lng: -122.8478,
    },
    description: 'Family-owned organic farm specializing in vegetables and grains.',
    certifications: ['organic', 'sustainable'],
    storage: [
      {
        type: 'cold',
        capacity: 5000,
        available: 2000,
      },
      {
        type: 'dry',
        capacity: 10000,
        available: 5000,
      },
    ],
    transport: [
      {
        type: 'refrigerated',
        capacity: 2000,
        maxDistance: 100,
      },
    ],
  },
  {
    id: '2',
    name: 'Oakwood Timber',
    email: 'info@oakwoodtimber.com',
    phone: '(555) 987-6543',
    location: {
      address: '456 Forest Lane, Woodland, OR 97068',
      lat: 45.3738,
      lng: -122.7654,
    },
    description: 'Sustainable forestry operation providing quality hardwood lumber.',
    certifications: ['sustainable', 'fsc'],
    storage: [
      {
        type: 'covered',
        capacity: 20000,
        available: 8000,
      },
    ],
    transport: [
      {
        type: 'flatbed',
        capacity: 5000,
        maxDistance: 200,
      },
    ],
  },
  {
    id: '3',
    name: 'Meadow Haven',
    email: 'hello@meadowhaven.com',
    phone: '(555) 456-7890',
    location: {
      address: '789 Meadow Lane, Dairyland, WI 54729',
      lat: 45.4231,
      lng: -91.8369,
    },
    description: 'Small-scale dairy farm producing artisanal cheeses and dairy products.',
    certifications: ['organic', 'humane', 'artisanal'],
    storage: [
      {
        type: 'cold',
        capacity: 1000,
        available: 300,
      },
    ],
    transport: [
      {
        type: 'refrigerated',
        capacity: 500,
        maxDistance: 50,
      },
    ],
  },
  // New farmers in Czech Republic and Bavaria
  {
    id: '4',
    name: 'Bohemian Organic Farm',
    email: 'info@bohemianfarm.cz',
    phone: '+420 123 456 789',
    location: {
      address: 'Polní 123, Plzeň, Czech Republic',
      lat: 49.7384,
      lng: 13.3736,
    },
    description: 'Traditional Czech farm specializing in organic vegetables and heritage grains.',
    certifications: ['organic', 'eu-bio'],
    storage: [
      {
        type: 'cold',
        capacity: 3000,
        available: 1500,
      },
      {
        type: 'dry',
        capacity: 8000,
        available: 4000,
      },
    ],
    transport: [
      {
        type: 'refrigerated',
        capacity: 1500,
        maxDistance: 150,
      },
    ],
  },
  {
    id: '5',
    name: 'Bavarian Forest Lumber',
    email: 'kontakt@bavarianforest.de',
    phone: '+49 8551 12345',
    location: {
      address: 'Waldweg 45, Passau, Germany',
      lat: 48.5667,
      lng: 13.4667,
    },
    description: 'Sustainable forestry operation in the Bavarian Forest providing premium lumber.',
    certifications: ['sustainable', 'fsc', 'pefc'],
    storage: [
      {
        type: 'covered',
        capacity: 25000,
        available: 10000,
      },
    ],
    transport: [
      {
        type: 'flatbed',
        capacity: 7000,
        maxDistance: 250,
      },
    ],
  },
  {
    id: '6',
    name: 'Šumava Honey Farm',
    email: 'med@sumavafarm.cz',
    phone: '+420 777 888 999',
    location: {
      address: 'Včelařská 78, Klatovy, Czech Republic',
      lat: 49.3953,
      lng: 13.2932,
    },
    description: 'Family-owned apiary producing organic honey and bee products from the Šumava mountains.',
    certifications: ['organic', 'artisanal'],
    storage: [
      {
        type: 'temperature-controlled',
        capacity: 1000,
        available: 600,
      },
    ],
    transport: [
      {
        type: 'standard',
        capacity: 500,
        maxDistance: 100,
      },
    ],
  },
  {
    id: '7',
    name: 'Bavarian Alps Dairy',
    email: 'info@alpdairy.de',
    phone: '+49 8652 9876',
    location: {
      address: 'Bergstraße 12, Berchtesgaden, Germany',
      lat: 47.6307,
      lng: 13.0048,
    },
    description: 'Traditional Alpine dairy producing artisanal cheeses and dairy products from grass-fed cows.',
    certifications: ['organic', 'alpine', 'artisanal'],
    storage: [
      {
        type: 'cold',
        capacity: 2000,
        available: 800,
      },
    ],
    transport: [
      {
        type: 'refrigerated',
        capacity: 1000,
        maxDistance: 120,
      },
    ],
  },
  {
    id: '8',
    name: 'Moravian Vineyard',
    email: 'vino@moravianvineyard.cz',
    phone: '+420 606 707 808',
    location: {
      address: 'Vinařská 45, Mikulov, Czech Republic',
      lat: 48.8066,
      lng: 16.6377,
    },
    description: 'Family vineyard producing premium wines using traditional methods in South Moravia.',
    certifications: ['sustainable', 'artisanal'],
    storage: [
      {
        type: 'temperature-controlled',
        capacity: 5000,
        available: 2000,
      },
    ],
    transport: [
      {
        type: 'standard',
        capacity: 1500,
        maxDistance: 200,
      },
    ],
  },
];

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Fresh Market Ltd',
    email: 'orders@freshmarket.com',
    phone: '(555) 111-2222',
    type: 'supermarket',
    location: {
      address: '101 Market Street, Cityville, CA 94110',
      lat: 37.7599,
      lng: -122.4148,
    },
    requirements: {
      products: [
        {
          category: 'vegetables',
          volumePerMonth: 2000,
          priceRange: { min: 3, max: 5 },
        },
        {
          category: 'dairy',
          volumePerMonth: 1000,
          priceRange: { min: 5, max: 8 },
        },
      ],
    },
  },
  {
    id: '2',
    name: 'Greenfield Elementary',
    email: 'nutrition@greenfield.edu',
    phone: '(555) 333-4444',
    type: 'school',
    location: {
      address: '202 School Road, Greenfield, MA 01301',
      lat: 42.5878,
      lng: -72.5995,
    },
    requirements: {
      products: [
        {
          category: 'vegetables',
          volumePerMonth: 500,
          priceRange: { min: 2, max: 4 },
        },
        {
          category: 'grain',
          volumePerMonth: 300,
          priceRange: { min: 2, max: 3 },
        },
      ],
    },
  },
  {
    id: '3',
    name: 'Harvest Restaurant',
    email: 'chef@harvestrestaurant.com',
    phone: '(555) 555-6666',
    type: 'restaurant',
    location: {
      address: '303 Dining Avenue, Foodville, NY 10012',
      lat: 40.7259,
      lng: -73.9950,
    },
    requirements: {
      products: [
        {
          category: 'vegetables',
          volumePerMonth: 800,
          priceRange: { min: 4, max: 6 },
        },
        {
          category: 'dairy',
          volumePerMonth: 400,
          priceRange: { min: 6, max: 9 },
        },
      ],
    },
  },
  // New customers in Czech Republic and Bavaria
  {
    id: '4',
    name: 'Prague Farmers Market',
    email: 'info@praguemarket.cz',
    phone: '+420 234 567 890',
    type: 'farmers market',
    location: {
      address: 'Náplavka, Prague, Czech Republic',
      lat: 50.0755,
      lng: 14.4144,
    },
    requirements: {
      products: [
        {
          category: 'vegetables',
          volumePerMonth: 1500,
          priceRange: { min: 2, max: 5 },
        },
        {
          category: 'dairy',
          volumePerMonth: 800,
          priceRange: { min: 4, max: 7 },
        },
        {
          category: 'honey',
          volumePerMonth: 200,
          priceRange: { min: 8, max: 12 },
        },
      ],
    },
  },
  {
    id: '5',
    name: 'Bavarian Gasthaus',
    email: 'kuche@bavarianhaus.de',
    phone: '+49 8921 34567',
    type: 'restaurant',
    location: {
      address: 'Hauptstraße 28, Munich, Germany',
      lat: 48.1351,
      lng: 11.5820,
    },
    requirements: {
      products: [
        {
          category: 'vegetables',
          volumePerMonth: 600,
          priceRange: { min: 3, max: 6 },
        },
        {
          category: 'dairy',
          volumePerMonth: 500,
          priceRange: { min: 5, max: 10 },
        },
        {
          category: 'forestry',
          volumePerMonth: 100,
          priceRange: { min: 7, max: 12 },
        },
      ],
    },
  },
  {
    id: '6',
    name: 'Pilsen Organic Co-op',
    email: 'obchod@pilsenorganic.cz',
    phone: '+420 377 123 456',
    type: 'co-op',
    location: {
      address: 'Náměstí Republiky 12, Plzeň, Czech Republic',
      lat: 49.7474,
      lng: 13.3775,
    },
    requirements: {
      products: [
        {
          category: 'vegetables',
          volumePerMonth: 1200,
          priceRange: { min: 2, max: 4 },
        },
        {
          category: 'grain',
          volumePerMonth: 500,
          priceRange: { min: 1, max: 3 },
        },
        {
          category: 'honey',
          volumePerMonth: 150,
          priceRange: { min: 7, max: 10 },
        },
      ],
    },
  },
  {
    id: '7',
    name: 'Regensburg Biohof',
    email: 'kontakt@regensburgbio.de',
    phone: '+49 941 87654',
    type: 'organic store',
    location: {
      address: 'Biostraße 45, Regensburg, Germany',
      lat: 49.0134,
      lng: 12.1016,
    },
    requirements: {
      products: [
        {
          category: 'vegetables',
          volumePerMonth: 900,
          priceRange: { min: 3, max: 5 },
        },
        {
          category: 'dairy',
          volumePerMonth: 600,
          priceRange: { min: 6, max: 9 },
        },
      ],
    },
  },
  {
    id: '8',
    name: 'Brno Farm-to-Table',
    email: 'jidlo@brnotable.cz',
    phone: '+420 541 234 567',
    type: 'restaurant',
    location: {
      address: 'Zelný trh 8, Brno, Czech Republic',
      lat: 49.1922,
      lng: 16.6080,
    },
    requirements: {
      products: [
        {
          category: 'vegetables',
          volumePerMonth: 700,
          priceRange: { min: 3, max: 5 },
        },
        {
          category: 'dairy',
          volumePerMonth: 300,
          priceRange: { min: 5, max: 8 },
        },
      ],
    },
  },
  {
    id: '9',
    name: 'Passau Eco Hotel',
    email: 'hotel@passaueco.de',
    phone: '+49 851 56789',
    type: 'hotel',
    location: {
      address: 'Donauufer 23, Passau, Germany',
      lat: 48.5665,
      lng: 13.4312,
    },
    requirements: {
      products: [
        {
          category: 'vegetables',
          volumePerMonth: 1000,
          priceRange: { min: 3, max: 6 },
        },
        {
          category: 'dairy',
          volumePerMonth: 500,
          priceRange: { min: 5, max: 9 },
        },
        {
          category: 'forestry',
          volumePerMonth: 200,
          priceRange: { min: 6, max: 10 },
        },
      ],
    },
  },
  {
    id: '10',
    name: 'České Budějovice School District',
    email: 'skoly@budejovice.cz',
    phone: '+420 387 654 321',
    type: 'school district',
    location: {
      address: 'Školní 56, České Budějovice, Czech Republic',
      lat: 48.9747,
      lng: 14.4744,
    },
    requirements: {
      products: [
        {
          category: 'vegetables',
          volumePerMonth: 2000,
          priceRange: { min: 2, max: 4 },
        },
        {
          category: 'dairy',
          volumePerMonth: 1500,
          priceRange: { min: 4, max: 7 },
        },
        {
          category: 'grain',
          volumePerMonth: 1000,
          priceRange: { min: 1, max: 3 },
        },
      ],
    },
  },
  {
    id: '11',
    name: 'Nuremberg Organic Market',
    email: 'markt@nurembergorganic.de',
    phone: '+49 911 23456',
    type: 'farmers market',
    location: {
      address: 'Hauptmarkt 1, Nuremberg, Germany',
      lat: 49.4539,
      lng: 11.0775,
    },
    requirements: {
      products: [
        {
          category: 'vegetables',
          volumePerMonth: 1800,
          priceRange: { min: 3, max: 5 },
        },
        {
          category: 'dairy',
          volumePerMonth: 1000,
          priceRange: { min: 5, max: 8 },
        },
        {
          category: 'honey',
          volumePerMonth: 300,
          priceRange: { min: 8, max: 12 },
        },
      ],
    },
  },
  {
    id: '12',
    name: 'Karlovy Vary Spa Resort',
    email: 'spa@karlovyvary.cz',
    phone: '+420 353 987 654',
    type: 'resort',
    location: {
      address: 'Lázeňská 5, Karlovy Vary, Czech Republic',
      lat: 50.2304,
      lng: 12.8712,
    },
    requirements: {
      products: [
        {
          category: 'vegetables',
          volumePerMonth: 1200,
          priceRange: { min: 3, max: 6 },
        },
        {
          category: 'dairy',
          volumePerMonth: 600,
          priceRange: { min: 5, max: 9 },
        },
        {
          category: 'honey',
          volumePerMonth: 200,
          priceRange: { min: 7, max: 11 },
        },
      ],
    },
  },
  {
    id: '13',
    name: 'Linz Farm Cooperative',
    email: 'coop@linzfarm.at',
    phone: '+43 732 12345',
    type: 'cooperative',
    location: {
      address: 'Landstraße 45, Linz, Austria',
      lat: 48.3064,
      lng: 14.2858,
    },
    requirements: {
      products: [
        {
          category: 'vegetables',
          volumePerMonth: 1500,
          priceRange: { min: 2, max: 5 },
        },
        {
          category: 'dairy',
          volumePerMonth: 800,
          priceRange: { min: 4, max: 8 },
        },
        {
          category: 'grain',
          volumePerMonth: 600,
          priceRange: { min: 2, max: 4 },
        },
      ],
    },
  },
];

// Mock Success Stories
export const mockSuccessStories: SuccessStory[] = [
  {
    id: '1',
    farmerId: '1',
    customerId: '1',
    contractValue: 50000,
    duration: '12 months',
    isRecurring: true,
    description: 'Green Valley Farm has been supplying Fresh Market with organic vegetables for over a year, establishing a reliable partnership that benefits both parties.',
    customerApproved: true,
    aiGeneratedSummary: 'This partnership demonstrates the successful matching of local organic produce with retail demand, resulting in reduced food miles and fresher products for consumers.',
    products: ['1', '4'],
    date: '2023-06-15',
  },
  {
    id: '2',
    farmerId: '3',
    customerId: '3',
    contractValue: 25000,
    duration: '6 months',
    isRecurring: true,
    description: 'Meadow Haven provides Harvest Restaurant with artisanal cheeses that have become a signature ingredient in many of their popular dishes.',
    customerApproved: true,
    aiGeneratedSummary: 'This farm-to-table partnership showcases how specialty products can enhance a restaurant\'s menu offerings while supporting local producers.',
    products: ['3'],
    date: '2023-09-22',
  },
  {
    id: '3',
    farmerId: '1',
    customerId: '2',
    contractValue: 15000,
    duration: '9 months',
    isRecurring: true,
    description: 'Green Valley Farm supplies Greenfield Elementary with fresh vegetables for their school lunch program, helping to improve student nutrition.',
    customerApproved: true,
    aiGeneratedSummary: 'This partnership demonstrates how local farms can contribute to improved nutrition in schools while providing stable income for farmers.',
    products: ['1'],
    date: '2023-08-10',
  },
];

// Mock Market Predictions
export const mockMarketPredictions: MarketPrediction[] = [
  {
    id: '1',
    productType: 'vegetables',
    demandTrend: 'increasing',
    priceRange: { min: 3, max: 6 },
    seasonality: {
      peak: [5, 6, 7, 8, 9], // May to September
      low: [1, 2, 12], // January, February, December
    },
    recommendation: 'Consider expanding organic vegetable production, with focus on leafy greens and heirloom varieties which are showing strong price premiums.',
    confidence: 0.85,
  },
  {
    id: '2',
    productType: 'dairy',
    demandTrend: 'stable',
    priceRange: { min: 5, max: 9 },
    seasonality: {
      peak: [3, 4, 5, 9, 10, 11], // Spring and Fall
      low: [7, 8], // Summer
    },
    recommendation: 'Specialty and artisanal cheeses continue to command premium prices. Consider diversifying your cheese offerings.',
    confidence: 0.78,
  },
  {
    id: '3',
    productType: 'grain',
    demandTrend: 'increasing',
    priceRange: { min: 2, max: 4 },
    seasonality: {
      peak: [8, 9, 10], // August to October
      low: [2, 3, 4], // February to April
    },
    recommendation: 'Organic and specialty grains like ancient varieties are seeing increased demand from both consumers and food manufacturers.',
    confidence: 0.82,
  },
  {
    id: '4',
    productType: 'forestry',
    demandTrend: 'stable',
    priceRange: { min: 7, max: 12 },
    seasonality: {
      peak: [3, 4, 5, 9, 10, 11], // Spring and Fall
      low: [12, 1, 2], // Winter
    },
    recommendation: 'Sustainable and certified wood products continue to see steady demand, particularly for specialty and hardwood varieties.',
    confidence: 0.75,
  },
];

// Farmers data
export const farmers = [
  {
    id: 'farmer-1',
    name: 'Bohemian Organic Farm',
    description: 'Family-owned organic farm specializing in heirloom vegetables and heritage grains.',
    location: {
      city: 'Plzeň',
      country: 'Czech Republic',
      coordinates: {
        lat: 49.7384,
        lng: 13.3736
      }
    },
    products: ['Organic vegetables', 'Heritage grains'],
    certifications: ['Organic', 'Sustainable Farming'],
    contactInfo: {
      email: 'info@bohemianorganicfarm.cz',
      phone: '+420 123 456 789'
    }
  },
  {
    id: 'farmer-2',
    name: 'Bavarian Forest Lumber',
    description: 'Sustainable forestry operation providing premium lumber and wood products.',
    location: {
      city: 'Passau',
      country: 'Germany',
      coordinates: {
        lat: 48.5667,
        lng: 13.4667
      }
    },
    products: ['Premium lumber', 'Wood products'],
    certifications: ['FSC Certified', 'Sustainable Forestry'],
    contactInfo: {
      email: 'info@bavarianforestlumber.de',
      phone: '+49 851 123 4567'
    }
  },
  {
    id: 'farmer-3',
    name: 'Šumava Honey Farm',
    description: 'Traditional beekeeping operation producing organic honey and beeswax products.',
    location: {
      city: 'Klatovy',
      country: 'Czech Republic',
      coordinates: {
        lat: 49.3953,
        lng: 13.2931
      }
    },
    products: ['Organic honey', 'Beeswax products'],
    certifications: ['Organic', 'Bee-Friendly'],
    contactInfo: {
      email: 'info@sumavahoney.cz',
      phone: '+420 376 123 456'
    }
  },
  {
    id: 'farmer-4',
    name: 'Bavarian Alps Dairy',
    description: 'Mountain dairy farm producing artisanal cheeses and dairy products.',
    location: {
      city: 'Berchtesgaden',
      country: 'Germany',
      coordinates: {
        lat: 47.6307,
        lng: 13.0048
      }
    },
    products: ['Artisanal cheese', 'Dairy products'],
    certifications: ['Traditional Craftsmanship', 'Mountain Quality'],
    contactInfo: {
      email: 'info@bavarianalpsdairy.de',
      phone: '+49 8652 123 456'
    }
  },
  {
    id: 'farmer-5',
    name: 'Moravian Vineyard',
    description: 'Family vineyard producing premium wines using traditional methods.',
    location: {
      city: 'Mikulov',
      country: 'Czech Republic',
      coordinates: {
        lat: 48.8056,
        lng: 16.6378
      }
    },
    products: ['Premium wines', 'Wine tourism'],
    certifications: ['Organic Viticulture', 'Traditional Winemaking'],
    contactInfo: {
      email: 'info@moravianvineyard.cz',
      phone: '+420 519 123 456'
    }
  },
  {
    id: 'farmer-6',
    name: 'Šumava Trout Farm',
    description: 'Sustainable fish farm specializing in rainbow trout and other freshwater fish.',
    location: {
      city: 'Železná Ruda',
      country: 'Czech Republic',
      coordinates: {
        lat: 49.1392,
        lng: 13.2356
      }
    },
    products: ['Rainbow trout', 'Freshwater fish'],
    certifications: ['Sustainable Aquaculture', 'Clean Water'],
    contactInfo: {
      email: 'info@sumavatrout.cz',
      phone: '+420 376 987 654'
    }
  },
  {
    id: 'farmer-7',
    name: 'Bayerischer Bio-Hof',
    description: 'Organic farm producing a variety of vegetables, fruits, and herbs using biodynamic methods.',
    location: {
      city: 'Freyung',
      country: 'Germany',
      coordinates: {
        lat: 48.8086,
        lng: 13.5469
      }
    },
    products: ['Organic vegetables', 'Herbs', 'Fruits'],
    certifications: ['Demeter', 'EU Organic'],
    contactInfo: {
      email: 'kontakt@bayerischerbio.de',
      phone: '+49 8551 987 654'
    }
  },
  {
    id: 'farmer-8',
    name: 'Mühlviertel Grain Collective',
    description: 'Farmer collective specializing in ancient grain varieties and organic flour production.',
    location: {
      city: 'Freistadt',
      country: 'Austria',
      coordinates: {
        lat: 48.5111,
        lng: 14.5047
      }
    },
    products: ['Ancient grains', 'Organic flour', 'Bread mixes'],
    certifications: ['Austria Bio Guarantee', 'Traditional Seeds'],
    contactInfo: {
      email: 'info@muehlviertelgrain.at',
      phone: '+43 7942 12345'
    }
  },
  {
    id: 'farmer-9',
    name: 'Domažlice Herb Garden',
    description: 'Family farm growing medicinal herbs and producing herbal teas and remedies.',
    location: {
      city: 'Domažlice',
      country: 'Czech Republic',
      coordinates: {
        lat: 49.4404,
        lng: 12.9278
      }
    },
    products: ['Medicinal herbs', 'Herbal teas', 'Natural remedies'],
    certifications: ['Organic', 'Traditional Medicine'],
    contactInfo: {
      email: 'info@domazliceherbs.cz',
      phone: '+420 379 123 456'
    }
  },
  {
    id: 'farmer-10',
    name: 'Waldkraiburg Mushroom Farm',
    description: 'Specialized farm growing gourmet and medicinal mushrooms using sustainable methods.',
    location: {
      city: 'Waldkraiburg',
      country: 'Germany',
      coordinates: {
        lat: 48.2047,
        lng: 12.3969
      }
    },
    products: ['Gourmet mushrooms', 'Medicinal mushrooms', 'Mushroom growing kits'],
    certifications: ['Organic', 'Forest Stewardship'],
    contactInfo: {
      email: 'info@waldpilze.de',
      phone: '+49 8638 98765'
    }
  }
];

// Customers data
export const customers = [
  {
    id: 'customer-1',
    name: 'Prague Farmers Market',
    type: 'Farmers Market',
    description: 'Weekly farmers market in Prague featuring local producers.',
    location: {
      city: 'Prague',
      country: 'Czech Republic',
      coordinates: {
        lat: 50.0755,
        lng: 14.4378
      }
    },
    requirements: ['Vegetables', 'Dairy', 'Honey', 'Wine'],
    contactInfo: {
      email: 'info@praguefarmersmarket.cz',
      phone: '+420 224 123 456'
    }
  },
  {
    id: 'customer-2',
    name: 'Bavarian Gasthaus',
    type: 'Restaurant',
    description: 'Traditional Bavarian restaurant focusing on local ingredients.',
    location: {
      city: 'Munich',
      country: 'Germany',
      coordinates: {
        lat: 48.1351,
        lng: 11.5820
      }
    },
    requirements: ['Vegetables', 'Dairy', 'Lumber'],
    contactInfo: {
      email: 'info@bavariangasthaus.de',
      phone: '+49 89 123 4567'
    }
  },
  {
    id: 'customer-3',
    name: 'Pilsen Organic Co-op',
    type: 'Food Co-op',
    description: 'Community-owned organic food cooperative.',
    location: {
      city: 'Plzeň',
      country: 'Czech Republic',
      coordinates: {
        lat: 49.7474,
        lng: 13.3776
      }
    },
    requirements: ['Vegetables', 'Grains', 'Honey'],
    contactInfo: {
      email: 'info@pilsenorganic.cz',
      phone: '+420 377 123 456'
    }
  },
  {
    id: 'customer-4',
    name: 'Regensburg Biohof',
    type: 'Organic Store',
    description: 'Organic grocery store specializing in local products.',
    location: {
      city: 'Regensburg',
      country: 'Germany',
      coordinates: {
        lat: 49.0134,
        lng: 12.1016
      }
    },
    requirements: ['Vegetables', 'Dairy'],
    contactInfo: {
      email: 'info@regensburgbiohof.de',
      phone: '+49 941 123 4567'
    }
  },
  {
    id: 'customer-5',
    name: 'Brno Farm-to-Table',
    type: 'Restaurant',
    description: 'Farm-to-table restaurant focusing on seasonal menus.',
    location: {
      city: 'Brno',
      country: 'Czech Republic',
      coordinates: {
        lat: 49.1951,
        lng: 16.6068
      }
    },
    requirements: ['Vegetables', 'Dairy'],
    contactInfo: {
      email: 'info@brnofarmtotable.cz',
      phone: '+420 542 123 456'
    }
  },
  {
    id: 'customer-6',
    name: 'Passau Eco Hotel',
    type: 'Hotel',
    description: 'Eco-friendly hotel with farm-to-table restaurant.',
    location: {
      city: 'Passau',
      country: 'Germany',
      coordinates: {
        lat: 48.5747,
        lng: 13.4567
      }
    },
    requirements: ['Vegetables', 'Dairy', 'Lumber'],
    contactInfo: {
      email: 'info@passauecohotel.de',
      phone: '+49 851 123 4567'
    }
  },
  {
    id: 'customer-7',
    name: 'České Budějovice School District',
    type: 'School District',
    description: 'Public school district implementing farm-to-school program.',
    location: {
      city: 'České Budějovice',
      country: 'Czech Republic',
      coordinates: {
        lat: 48.9747,
        lng: 14.4744
      }
    },
    requirements: ['Vegetables', 'Dairy', 'Honey', 'Grains'],
    contactInfo: {
      email: 'info@cbudejoviceschools.cz',
      phone: '+420 387 123 456'
    }
  },
  {
    id: 'customer-8',
    name: 'Nuremberg Organic Market',
    type: 'Grocery Store',
    description: 'Organic grocery store chain with multiple locations.',
    location: {
      city: 'Nuremberg',
      country: 'Germany',
      coordinates: {
        lat: 49.4521,
        lng: 11.0767
      }
    },
    requirements: ['Vegetables', 'Dairy', 'Honey'],
    contactInfo: {
      email: 'info@nurembergorganic.de',
      phone: '+49 911 123 4567'
    }
  },
  {
    id: 'customer-9',
    name: 'Karlovy Vary Spa Resort',
    type: 'Resort',
    description: 'Luxury spa resort with wellness-focused cuisine.',
    location: {
      city: 'Karlovy Vary',
      country: 'Czech Republic',
      coordinates: {
        lat: 50.2309,
        lng: 12.8716
      }
    },
    requirements: ['Vegetables', 'Dairy', 'Honey'],
    contactInfo: {
      email: 'info@karlovyvaryspa.cz',
      phone: '+420 353 123 456'
    }
  },
  {
    id: 'customer-10',
    name: 'Linz Farm Cooperative',
    type: 'Cooperative',
    description: 'Farmer-owned cooperative connecting producers with buyers.',
    location: {
      city: 'Linz',
      country: 'Austria',
      coordinates: {
        lat: 48.3059,
        lng: 14.2862
      }
    },
    requirements: ['Vegetables', 'Dairy', 'Grains'],
    contactInfo: {
      email: 'info@linzfarmcoop.at',
      phone: '+43 732 123 4567'
    }
  },
  {
    id: 'customer-11',
    name: 'Klatovy Regional Hospital',
    type: 'Healthcare',
    description: 'Regional hospital implementing a farm-to-patient nutrition program.',
    location: {
      city: 'Klatovy',
      country: 'Czech Republic',
      coordinates: {
        lat: 49.3953,
        lng: 13.2931
      }
    },
    requirements: ['Organic vegetables', 'Dairy', 'Honey', 'Medicinal herbs'],
    contactInfo: {
      email: 'nutrition@klatovyhospital.cz',
      phone: '+420 376 555 123'
    }
  },
  {
    id: 'customer-12',
    name: 'Šumava National Park Visitor Center',
    type: 'Tourism',
    description: 'Visitor center promoting local products and sustainable tourism.',
    location: {
      city: 'Železná Ruda',
      country: 'Czech Republic',
      coordinates: {
        lat: 49.1392,
        lng: 13.2356
      }
    },
    requirements: ['Honey', 'Herbal teas', 'Handcrafts', 'Local foods'],
    contactInfo: {
      email: 'shop@sumavapark.cz',
      phone: '+420 376 666 123'
    }
  },
  {
    id: 'customer-13',
    name: 'Deggendorf Craft Brewery',
    type: 'Brewery',
    description: 'Craft brewery using local ingredients for specialty beers.',
    location: {
      city: 'Deggendorf',
      country: 'Germany',
      coordinates: {
        lat: 48.8414,
        lng: 12.9577
      }
    },
    requirements: ['Organic grains', 'Hops', 'Herbs', 'Fruits'],
    contactInfo: {
      email: 'braumeister@deggendorfbrew.de',
      phone: '+49 991 123 456'
    }
  },
  {
    id: 'customer-14',
    name: 'Waldkirchen Wellness Retreat',
    type: 'Wellness Center',
    description: 'Holistic wellness center offering natural treatments and organic cuisine.',
    location: {
      city: 'Waldkirchen',
      country: 'Germany',
      coordinates: {
        lat: 48.7275,
        lng: 13.6006
      }
    },
    requirements: ['Medicinal herbs', 'Organic vegetables', 'Honey', 'Mushrooms'],
    contactInfo: {
      email: 'wellness@waldkirchen-retreat.de',
      phone: '+49 8581 987 654'
    }
  },
  {
    id: 'customer-15',
    name: 'Rohrbach Farm-to-School Initiative',
    type: 'Education',
    description: 'Program connecting local farms with schools in the Rohrbach district.',
    location: {
      city: 'Rohrbach',
      country: 'Austria',
      coordinates: {
        lat: 48.5706,
        lng: 13.9914
      }
    },
    requirements: ['Fresh vegetables', 'Dairy', 'Fruits', 'Educational farm visits'],
    contactInfo: {
      email: 'education@rohrbach-schools.at',
      phone: '+43 7289 12345'
    }
  }
]; 