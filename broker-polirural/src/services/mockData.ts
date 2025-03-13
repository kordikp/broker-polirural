import { 
  Farmer, 
  Customer, 
  Product, 
  SuccessStory,
  WeatherForecast,
  ClimateModel,
  MarketPrediction,
  ProductCategory
} from '../types';

export const mockFarmers: Farmer[] = [
  {
    id: 'f1',
    name: 'Green Valley Farm',
    location: {
      lat: 50.0755,
      lng: 14.4378,
      address: 'Dlouhá 123, Prague, Czech Republic'
    },
    products: [
      {
        id: 'p1',
        name: 'Organic Milk',
        category: 'milk',
        seasonalAvailability: {
          start: 1,
          end: 12
        },
        certifications: ['organic'],
        estimatedYearlyVolume: 50000,
        priceRange: {
          min: 0.5,
          max: 0.8
        }
      },
      {
        id: 'p2',
        name: 'Fresh Vegetables',
        category: 'vegetables',
        seasonalAvailability: {
          start: 4,
          end: 10
        },
        certifications: ['organic', 'bio'],
        estimatedYearlyVolume: 20000,
        priceRange: {
          min: 1.2,
          max: 2.5
        }
      }
    ],
    storage: [
      {
        type: 'cold',
        capacity: 500,
        available: 300
      },
      {
        type: 'dry',
        capacity: 1000,
        available: 800
      }
    ],
    transport: [
      {
        type: 'own',
        maxDistance: 100,
        capacity: 5
      }
    ],
    certifications: ['organic', 'bio']
  }
];

export const mockCustomers: Customer[] = [
  {
    id: 'c1',
    name: 'City School District',
    type: 'school',
    location: {
      lat: 50.0875,
      lng: 14.4213,
      address: 'Školní 456, Prague, Czech Republic'
    },
    requirements: {
      products: [
        {
          category: 'milk',
          volumePerMonth: 2000,
          priceRange: {
            min: 0.4,
            max: 0.7
          }
        },
        {
          category: 'vegetables',
          volumePerMonth: 1500,
          priceRange: {
            min: 1.0,
            max: 2.0
          }
        }
      ]
    }
  }
];

export const mockSuccessStories: SuccessStory[] = [
  {
    id: 's1',
    farmer: mockFarmers[0],
    customer: mockCustomers[0],
    contractValue: 50000,
    duration: '1 year',
    description: 'Successful partnership providing organic milk and vegetables to local schools',
    isRecurring: true,
    testimonial: 'Great quality products and reliable delivery',
    aiGeneratedSummary: 'This partnership demonstrates the value of local sourcing for educational institutions',
    customerApproved: true
  }
];

export const mockWeatherForecast: WeatherForecast[] = [
  {
    date: new Date(),
    temperature: {
      min: 15,
      max: 25
    },
    precipitation: 20,
    conditions: 'Partly cloudy'
  }
];

export const mockClimateModel: ClimateModel = {
  year: 2024,
  predictedChanges: {
    temperature: 1.5,
    precipitation: -5,
    extremeWeatherLikelihood: 0.3
  }
};

export const mockMarketPredictions: MarketPrediction[] = [
  {
    product: 'milk',
    predictedPrice: {
      min: 0.45,
      max: 0.75
    },
    demandTrend: 'increasing',
    confidence: 0.85
  },
  {
    product: 'vegetables',
    predictedPrice: {
      min: 1.1,
      max: 2.3
    },
    demandTrend: 'stable',
    confidence: 0.75
  }
]; 