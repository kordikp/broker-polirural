import { 
  Product, 
  Farmer, 
  Customer, 
  SuccessStory, 
  MarketPrediction 
} from './api';
import { 
  mockProducts, 
  mockFarmers, 
  mockCustomers, 
  mockSuccessStories, 
  mockMarketPredictions 
} from './mockData';

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const mockUsers = [
  { id: 'f1', email: 'farmer@example.com', password: 'password', name: 'John Farmer', userType: 'farmer', farmerId: '1' },
  { id: 'c1', email: 'customer@example.com', password: 'password', name: 'Jane Customer', userType: 'customer', customerId: '1' },
  { id: 'a1', email: 'admin@example.com', password: 'password', name: 'Admin User', userType: 'admin' },
];

// Mock Auth API
export const mockAuthAPI = {
  login: async (email: string, password: string) => {
    await delay(500); // Simulate network delay
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const token = `mock-jwt-token-${user.id}-${Date.now()}`;
    
    // Store in localStorage to simulate real auth
    localStorage.setItem('farm2market_token', token);
    localStorage.setItem('farm2market_user', JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      userType: user.userType,
      farmerId: user.farmerId,
      customerId: user.customerId,
    }));
    
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        farmerId: user.farmerId,
        customerId: user.customerId,
      }
    };
  },
  
  register: async (userData: { email: string; password: string; name: string; userType: 'farmer' | 'customer' }) => {
    await delay(800); // Simulate network delay
    
    // Check if user already exists
    if (mockUsers.some(u => u.email === userData.email)) {
      throw new Error('User with this email already exists');
    }
    
    // In a real app, we would create a new user in the database
    // For mock purposes, we'll just return success
    return { success: true, message: 'Registration successful. Please log in.' };
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

// Mock Products API
export const mockProductsAPI = {
  getAll: async () => {
    await delay(300);
    return [...mockProducts];
  },
  
  getById: async (id: string) => {
    await delay(200);
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return { ...product };
  },
  
  create: async (product: Omit<Product, 'id'>) => {
    await delay(500);
    const newProduct = {
      ...product,
      id: `${mockProducts.length + 1}`,
    };
    // In a real app, we would add this to the database
    return { ...newProduct };
  },
  
  update: async (id: string, product: Partial<Product>) => {
    await delay(400);
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    // In a real app, we would update the database
    return { ...mockProducts[index], ...product };
  },
  
  delete: async (id: string) => {
    await delay(300);
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    // In a real app, we would remove from the database
    return { success: true };
  },
};

// Mock Farmers API
export const mockFarmersAPI = {
  getAll: async () => {
    await delay(400);
    return [...mockFarmers];
  },
  
  getById: async (id: string) => {
    await delay(200);
    const farmer = mockFarmers.find(f => f.id === id);
    if (!farmer) {
      throw new Error('Farmer not found');
    }
    
    // Add products to farmer
    const products = mockProducts.filter(p => p.farmerId === id);
    return { ...farmer, products };
  },
  
  update: async (id: string, farmer: Partial<Farmer>) => {
    await delay(500);
    const index = mockFarmers.findIndex(f => f.id === id);
    if (index === -1) {
      throw new Error('Farmer not found');
    }
    // In a real app, we would update the database
    return { ...mockFarmers[index], ...farmer };
  },
  
  getProducts: async (farmerId: string) => {
    await delay(300);
    return mockProducts.filter(p => p.farmerId === farmerId);
  },
};

// Mock Customers API
export const mockCustomersAPI = {
  getAll: async () => {
    await delay(400);
    return [...mockCustomers];
  },
  
  getById: async (id: string) => {
    await delay(200);
    const customer = mockCustomers.find(c => c.id === id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    return { ...customer };
  },
  
  update: async (id: string, customer: Partial<Customer>) => {
    await delay(500);
    const index = mockCustomers.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Customer not found');
    }
    // In a real app, we would update the database
    return { ...mockCustomers[index], ...customer };
  },
  
  postRequirement: async (customerId: string, requirement: Customer['requirements']['products'][0]) => {
    await delay(400);
    const index = mockCustomers.findIndex(c => c.id === customerId);
    if (index === -1) {
      throw new Error('Customer not found');
    }
    // In a real app, we would update the database
    return { success: true, requirement };
  },
};

// Mock Success Stories API
export const mockSuccessStoriesAPI = {
  getAll: async () => {
    await delay(500);
    
    // Enrich success stories with farmer and customer data
    const enrichedStories = await Promise.all(
      mockSuccessStories.map(async (story) => {
        const farmer = mockFarmers.find(f => f.id === story.farmerId);
        const customer = mockCustomers.find(c => c.id === story.customerId);
        return { ...story, farmer, customer };
      })
    );
    
    return enrichedStories;
  },
  
  getById: async (id: string) => {
    await delay(300);
    const story = mockSuccessStories.find(s => s.id === id);
    if (!story) {
      throw new Error('Success story not found');
    }
    
    // Enrich with farmer and customer data
    const farmer = mockFarmers.find(f => f.id === story.farmerId);
    const customer = mockCustomers.find(c => c.id === story.customerId);
    
    return { ...story, farmer, customer };
  },
  
  create: async (story: Omit<SuccessStory, 'id'>) => {
    await delay(600);
    const newStory = {
      ...story,
      id: `${mockSuccessStories.length + 1}`,
    };
    // In a real app, we would add this to the database
    return { ...newStory };
  },
};

// Mock AI API
export const mockAiAPI = {
  getMarketPredictions: async (productType?: string) => {
    await delay(700); // AI takes longer!
    
    if (productType) {
      return mockMarketPredictions.filter(p => p.productType === productType);
    }
    
    return mockMarketPredictions;
  },
  
  getRecommendedProducts: async (farmerId: string) => {
    await delay(800);
    
    // Get the farmer's current products
    const farmerProducts = mockProducts.filter(p => p.farmerId === farmerId);
    const farmerProductTypes = new Set(farmerProducts.map(p => p.type));
    
    // Find market predictions for product types the farmer doesn't already produce
    // but that have increasing demand
    const recommendations = mockMarketPredictions
      .filter(p => !farmerProductTypes.has(p.productType) && p.demandTrend === 'increasing')
      .map(p => ({
        productType: p.productType,
        recommendation: p.recommendation,
        confidence: p.confidence,
        potentialRevenue: Math.round((p.priceRange.min + p.priceRange.max) / 2 * 1000),
        seasonality: p.seasonality,
      }));
    
    return recommendations;
  },
  
  getMatchingSuppliers: async (requirement: Customer['requirements']['products'][0]) => {
    await delay(600);
    
    // Find farmers that produce products matching the requirement
    const matchingProducts = mockProducts.filter(p => 
      p.type === requirement.category &&
      p.inStock &&
      p.estimatedYearlyVolume && (p.estimatedYearlyVolume / 12 >= requirement.volumePerMonth * 0.8)
    );
    
    // Get unique farmer IDs
    const farmerIds = [...new Set(matchingProducts.map(p => p.farmerId))];
    
    // Get farmer details
    const matchingFarmers = mockFarmers
      .filter(f => farmerIds.includes(f.id))
      .map(farmer => {
        const products = matchingProducts.filter(p => p.farmerId === farmer.id);
        return { ...farmer, matchingProducts: products };
      });
    
    return matchingFarmers;
  },
  
  getMatchingBuyers: async (productId: string) => {
    await delay(600);
    
    const product = mockProducts.find(p => p.id === productId);
    if (!product) {
      throw new Error('Product not found');
    }
    
    // Find customers with requirements matching the product
    const matchingCustomers = mockCustomers.filter(c => 
      c.requirements?.products.some(req => 
        req.category === product.type &&
        req.priceRange.min <= parseFloat(product.price.replace(/[^0-9.]/g, '')) &&
        req.priceRange.max >= parseFloat(product.price.replace(/[^0-9.]/g, ''))
      )
    );
    
    return matchingCustomers.map(customer => {
      const matchingRequirements = customer.requirements?.products.filter(req => 
        req.category === product.type
      );
      
      return { ...customer, matchingRequirements };
    });
  },

  // New function to get map data for farmers and customers
  getMapData: async () => {
    await delay(500);
    
    const farmerMarkers = mockFarmers.map(farmer => ({
      id: farmer.id,
      type: 'farmer',
      name: farmer.name,
      location: farmer.location,
      productCount: mockProducts.filter(p => p.farmerId === farmer.id).length,
      certifications: farmer.certifications,
    }));
    
    const customerMarkers = mockCustomers.map(customer => ({
      id: customer.id,
      type: 'customer',
      name: customer.name,
      location: customer.location,
      demandCount: customer.requirements?.products.length || 0,
      customerType: customer.type,
    }));
    
    return [...farmerMarkers, ...customerMarkers];
  },
  
  // New function to get potential email contacts
  getPotentialContacts: async (query: string) => {
    await delay(800);
    
    // Simulate finding potential contacts based on a search query
    const potentialContacts = [
      {
        id: 'c1',
        name: 'Organic Grocers Co-op',
        email: 'purchasing@organicgrocers.com',
        type: 'retailer',
        location: 'Portland, OR',
        interests: ['organic vegetables', 'dairy', 'specialty grains'],
        confidence: 0.92,
      },
      {
        id: 'c2',
        name: 'Farm-to-Table Restaurants Group',
        email: 'suppliers@farmtotablegroup.com',
        type: 'restaurant chain',
        location: 'Seattle, WA',
        interests: ['seasonal produce', 'artisanal cheese', 'sustainable meat'],
        confidence: 0.87,
      },
      {
        id: 'c3',
        name: 'Green Schools Initiative',
        email: 'nutrition@greenschools.org',
        type: 'education',
        location: 'San Francisco, CA',
        interests: ['fresh produce', 'dairy', 'educational farm visits'],
        confidence: 0.79,
      },
      {
        id: 'c4',
        name: 'Wellness Retreat Centers',
        email: 'kitchen@wellnessretreats.com',
        type: 'hospitality',
        location: 'Sedona, AZ',
        interests: ['organic produce', 'specialty herbs', 'superfoods'],
        confidence: 0.85,
      },
      {
        id: 'c5',
        name: 'Community Supported Agriculture Network',
        email: 'partners@csanetwork.org',
        type: 'non-profit',
        location: 'Boulder, CO',
        interests: ['seasonal vegetables', 'fruit', 'community partnerships'],
        confidence: 0.91,
      },
    ].filter(contact => 
      contact.name.toLowerCase().includes(query.toLowerCase()) || 
      contact.interests.some(interest => interest.toLowerCase().includes(query.toLowerCase()))
    );
    
    return potentialContacts;
  },
  
  // New function to simulate sending an email campaign
  sendEmailCampaign: async (contacts: string[], subject: string, message: string) => {
    await delay(1000);
    
    // Simulate sending emails
    return {
      success: true,
      sent: contacts.length,
      failed: 0,
      campaignId: `campaign-${Date.now()}`,
      estimatedResponses: Math.floor(contacts.length * 0.4), // 40% response rate
    };
  },
}; 