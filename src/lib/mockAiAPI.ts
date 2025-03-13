import { farmers, customers } from './mockData';

export interface MapMarker {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  type: 'farmer' | 'customer' | 'both';
  productCount?: number;
  products?: string[];
  demandCount?: number;
  requirements?: string[];
}

export interface PotentialContact {
  id: string;
  name: string;
  email: string;
  type: string;
  location: string;
  interests: string[];
}

export interface EmailCampaignResult {
  success: boolean;
  sent: number;
  failed: number;
  errors?: string[];
}

// Mock AI API service
const mockAiAPI = {
  // Get map data for farmers and customers
  getMapData: async (): Promise<MapMarker[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Convert farmers and customers to map markers
    const farmerMarkers: MapMarker[] = farmers.map(farmer => ({
      id: farmer.id,
      name: farmer.name,
      location: {
        lat: farmer.location.coordinates.lat,
        lng: farmer.location.coordinates.lng,
        address: `${farmer.location.city}, ${farmer.location.country}`
      },
      type: 'farmer',
      productCount: farmer.products.length,
      products: farmer.products
    }));
    
    const customerMarkers: MapMarker[] = customers.map(customer => ({
      id: customer.id,
      name: customer.name,
      location: {
        lat: customer.location.coordinates.lat,
        lng: customer.location.coordinates.lng,
        address: `${customer.location.city}, ${customer.location.country}`
      },
      type: 'customer',
      demandCount: customer.requirements.length,
      requirements: customer.requirements
    }));
    
    // Combine and return all markers
    return [...farmerMarkers, ...customerMarkers];
  },
  
  // Get potential contacts based on search query
  getPotentialContacts: async (query: string): Promise<PotentialContact[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter customers based on query
    const filteredCustomers = customers.filter(customer => {
      const searchTerms = query.toLowerCase().split(' ');
      const customerText = `${customer.name} ${customer.location.city} ${customer.location.country} ${customer.requirements.join(' ')}`.toLowerCase();
      
      return searchTerms.some(term => customerText.includes(term));
    });
    
    // Convert to potential contacts
    return filteredCustomers.map(customer => ({
      id: customer.id,
      name: customer.name,
      email: `contact@${customer.name.toLowerCase().replace(/\s+/g, '')}.com`,
      type: customer.type,
      location: `${customer.location.city}, ${customer.location.country}`,
      interests: customer.requirements
    }));
  },
  
  // Send email campaign to selected contacts
  sendEmailCampaign: async (
    contactIds: string[], 
    subject: string, 
    message: string
  ): Promise<EmailCampaignResult> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate some failures (10% chance of failure per contact)
    const failures = contactIds.filter(() => Math.random() < 0.1);
    
    return {
      success: true,
      sent: contactIds.length - failures.length,
      failed: failures.length,
      errors: failures.length > 0 ? ['Some emails could not be delivered'] : undefined
    };
  },
};

export default mockAiAPI; 