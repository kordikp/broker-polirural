import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Settings } from './Settings';
import { TeamManagement } from './TeamManagement';
import { FarmerManagement } from './FarmerManagement';
import { CustomerManagement } from './CustomerManagement';
import { SuccessStoryManagement } from './SuccessStoryManagement';
import { AIAssistant } from './AIAssistant';
import { Farmer, Customer, SuccessStory } from '../types';

const InnovationBrokerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('supply');
  const [showSettings, setShowSettings] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  // Mock data
  const [farmers] = useState<Farmer[]>([
    {
      id: '1',
      name: 'John Smith Farm',
      location: {
        lat: 50.0755,
        lng: 14.4378,
        address: '123 Farm Road, Rural County',
      },
      products: [
        {
          id: '1',
          name: 'Organic Tomatoes',
          category: 'vegetables',
          seasonalAvailability: {
            start: 4, // April
            end: 10, // October
          },
          estimatedYearlyVolume: 6000, // 500kg * 12 months
          priceRange: { min: 2, max: 3 },
          certifications: ['organic'],
        },
      ],
      storage: [
        {
          type: 'cold',
          capacity: 1000,
          available: 500,
        },
      ],
      transport: [
        {
          type: 'own',
          capacity: 2000,
          maxDistance: 100,
        },
      ],
      certifications: ['organic'],
    },
  ]);

  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Fresh Market Ltd',
      type: 'supermarket',
      location: {
        lat: 50.0875,
        lng: 14.4213,
        address: '456 Market Street, City Center',
      },
      requirements: {
        products: [
          {
            category: 'vegetables',
            volumePerMonth: 2000,
            priceRange: { min: 2, max: 4 },
          },
        ],
      },
    },
  ]);

  const [successStories] = useState<SuccessStory[]>([
    {
      id: '1',
      farmer: farmers[0],
      customer: customers[0],
      contractValue: 50000,
      duration: '12 months',
      isRecurring: true,
      description: 'Successful partnership in organic vegetable supply',
      customerApproved: true,
      aiGeneratedSummary: 'This partnership demonstrates the successful matching of local organic produce with retail demand.',
    },
  ]);

  const handleFarmerUpdate = (updatedFarmer: Farmer) => {
    // Implementation of handleFarmerUpdate
  };

  const handleCustomerUpdate = (updatedCustomer: Customer) => {
    // Implementation of handleCustomerUpdate
  };

  const handleSuccessStoryUpdate = (updatedStory: SuccessStory) => {
    // Implementation of handleSuccessStoryUpdate
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Innovation Broker Dashboard</h1>
        <div className="space-x-4">
          <button
            onClick={() => setShowAIAssistant(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            AI Assistant
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Settings
          </button>
          <button
            onClick={() => setShowTeam(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Team
          </button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="supply">Supply Side</TabsTrigger>
          <TabsTrigger value="demand">Demand Side</TabsTrigger>
          <TabsTrigger value="success">Success Stories</TabsTrigger>
        </TabsList>

        <TabsContent value="supply" className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Farmers & Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {farmers.map(farmer => (
              <Card key={farmer.id}>
                <CardHeader>
                  <CardTitle>{farmer.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <FarmerManagement farmer={farmer} onUpdateFarmer={handleFarmerUpdate} />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="demand" className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Customers & Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customers.map(customer => (
              <Card key={customer.id}>
                <CardHeader>
                  <CardTitle>{customer.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CustomerManagement customer={customer} onUpdateCustomer={handleCustomerUpdate} />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="success" className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Success Stories</h2>
          <div className="space-y-4">
            {successStories.map(story => (
              <Card key={story.id}>
                <CardHeader>
                  <CardTitle>
                    {story.farmer.name} ↔ {story.customer.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SuccessStoryManagement story={story} onUpdateStory={handleSuccessStoryUpdate} />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <Settings onClose={() => setShowSettings(false)} />
        </DialogContent>
      </Dialog>

      <Sheet open={showTeam} onOpenChange={setShowTeam}>
        <SheetContent side="right" className="w-[800px] sm:max-w-[800px]">
          <SheetHeader>
            <SheetTitle>Team Management</SheetTitle>
          </SheetHeader>
          <TeamManagement onClose={() => setShowTeam(false)} />
        </SheetContent>
      </Sheet>

      <Dialog open={showAIAssistant} onOpenChange={setShowAIAssistant}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>AI Assistant</DialogTitle>
          </DialogHeader>
          <AIAssistant onClose={() => setShowAIAssistant(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InnovationBrokerDashboard;