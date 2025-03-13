export type ProductCategory = 'wood' | 'milk' | 'vegetables' | 'corn' | 'other';

export type Certification = 'organic' | 'bio' | 'conventional';

export interface GeoLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface StorageCapability {
  type: 'cold' | 'dry' | 'frozen';
  capacity: number; // in cubic meters
  available: number;
}

export interface TransportCapability {
  type: 'own' | 'contracted';
  maxDistance: number; // in km
  capacity: number; // in tons
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  seasonalAvailability: {
    start: number; // month number (1-12)
    end: number;
  };
  certifications: Certification[];
  estimatedYearlyVolume: number;
  priceRange: {
    min: number;
    max: number;
  };
}

export interface Farmer {
  id: string;
  name: string;
  location: GeoLocation;
  products: Product[];
  storage: StorageCapability[];
  transport: TransportCapability[];
  certifications: Certification[];
}

export type CustomerType = 'supermarket' | 'school' | 'hospital' | 'restaurant' | 'company' | 'other';

export interface Customer {
  id: string;
  name: string;
  type: CustomerType;
  location: GeoLocation;
  requirements: {
    products: {
      category: ProductCategory;
      volumePerMonth: number;
      priceRange: {
        min: number;
        max: number;
      };
    }[];
  };
}

export interface SuccessStory {
  id: string;
  farmer: Farmer;
  customer: Customer;
  contractValue: number;
  duration: string;
  description: string;
  isRecurring: boolean;
  testimonial?: string;
  aiGeneratedSummary: string;
  customerApproved: boolean;
}

export interface WeatherForecast {
  date: Date;
  temperature: {
    min: number;
    max: number;
  };
  precipitation: number;
  conditions: string;
}

export interface ClimateModel {
  year: number;
  predictedChanges: {
    temperature: number;
    precipitation: number;
    extremeWeatherLikelihood: number;
  };
}

export interface MarketPrediction {
  product: ProductCategory;
  predictedPrice: {
    min: number;
    max: number;
  };
  demandTrend: 'increasing' | 'stable' | 'decreasing';
  confidence: number;
} 