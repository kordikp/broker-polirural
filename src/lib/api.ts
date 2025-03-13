import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('farm2market_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types
export interface Product {
  id: string;
  title: string;
  type: string;
  description: string;
  location: string;
  price: string;
  image: string;
  inStock: boolean;
  organic?: boolean;
  featured?: boolean;
  farmerId: string;
  seasonalAvailability?: {
    start: number; // Month (1-12)
    end: number; // Month (1-12)
  };
  estimatedYearlyVolume?: number;
  certifications?: string[];
}

export interface Farmer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  description?: string;
  certifications: string[];
  products?: Product[];
  matchingProducts?: Product[];
  storage?: {
    type: string;
    capacity: number;
    available: number;
  }[];
  transport?: {
    type: string;
    capacity: number;
    maxDistance: number;
  }[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  requirements?: {
    products: {
      category: string;
      volumePerMonth: number;
      priceRange: { min: number; max: number };
    }[];
  };
}

export interface SuccessStory {
  id: string;
  farmerId: string;
  customerId: string;
  farmer?: Farmer;
  customer?: Customer;
  contractValue: number;
  duration: string;
  isRecurring: boolean;
  description: string;
  customerApproved: boolean;
  aiGeneratedSummary?: string;
  products?: string[]; // Product IDs
  date: string;
}

export interface MarketPrediction {
  id: string;
  productType: string;
  demandTrend: 'increasing' | 'stable' | 'decreasing';
  priceRange: { min: number; max: number };
  seasonality: {
    peak: number[]; // Months (1-12)
    low: number[]; // Months (1-12)
  };
  recommendation: string;
  confidence: number; // 0-1
}

// New interfaces for map data
export interface MapMarker {
  id: string;
  type: 'farmer' | 'customer';
  name: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
}

export interface FarmerMapMarker extends MapMarker {
  type: 'farmer';
  productCount: number;
  certifications: string[];
}

export interface CustomerMapMarker extends MapMarker {
  type: 'customer';
  demandCount: number;
  customerType: string;
}

// New interfaces for email agent
export interface PotentialContact {
  id: string;
  name: string;
  email: string;
  type: string;
  location: string;
  interests: string[];
  confidence: number; // 0-1
}

export interface EmailCampaignResult {
  success: boolean;
  sent: number;
  failed: number;
  campaignId: string;
  estimatedResponses: number;
}

// API functions
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('farm2market_token', response.data.token);
      localStorage.setItem('farm2market_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  
  register: async (userData: { email: string; password: string; name: string; userType: 'farmer' | 'customer' }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('farm2market_token');
    localStorage.removeItem('farm2market_user');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('farm2market_user');
    return user ? JSON.parse(user) : null;
  },
};

export const productsAPI = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  create: async (product: Omit<Product, 'id'>) => {
    const response = await api.post('/products', product);
    return response.data;
  },
  
  update: async (id: string, product: Partial<Product>) => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

export const farmersAPI = {
  getAll: async () => {
    const response = await api.get('/farmers');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/farmers/${id}`);
    return response.data;
  },
  
  update: async (id: string, farmer: Partial<Farmer>) => {
    const response = await api.put(`/farmers/${id}`, farmer);
    return response.data;
  },
  
  getProducts: async (farmerId: string) => {
    const response = await api.get(`/farmers/${farmerId}/products`);
    return response.data;
  },
};

export const customersAPI = {
  getAll: async () => {
    const response = await api.get('/customers');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  },
  
  update: async (id: string, customer: Partial<Customer>) => {
    const response = await api.put(`/customers/${id}`, customer);
    return response.data;
  },
  
  postRequirement: async (customerId: string, requirement: Customer['requirements']['products'][0]) => {
    const response = await api.post(`/customers/${customerId}/requirements`, requirement);
    return response.data;
  },
};

export const successStoriesAPI = {
  getAll: async () => {
    const response = await api.get('/success-stories');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/success-stories/${id}`);
    return response.data;
  },
  
  create: async (story: Omit<SuccessStory, 'id'>) => {
    const response = await api.post('/success-stories', story);
    return response.data;
  },
};

export const aiAPI = {
  getMarketPredictions: async (productType?: string) => {
    const response = await api.get('/ai/market-predictions', {
      params: { productType },
    });
    return response.data;
  },
  
  getRecommendedProducts: async (farmerId: string) => {
    const response = await api.get(`/ai/farmers/${farmerId}/recommendations`);
    return response.data;
  },
  
  getMatchingSuppliers: async (requirement: Customer['requirements']['products'][0]) => {
    const response = await api.post('/ai/match-suppliers', requirement);
    return response.data;
  },
  
  getMatchingBuyers: async (productId: string) => {
    const response = await api.get(`/ai/match-buyers/${productId}`);
    return response.data;
  },
};

export default api; 