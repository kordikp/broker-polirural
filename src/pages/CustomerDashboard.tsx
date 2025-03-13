import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { mockCustomersAPI, mockAiAPI } from '@/lib/mockApi';
import { Customer, Farmer } from '@/lib/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Search, MapPin, TrendingUp, BarChart3, ShoppingCart, Users } from 'lucide-react';
import Layout from '@/components/Layout';

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [matchingFarmers, setMatchingFarmers] = useState<Farmer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Redirect if not logged in or not a customer
    if (!user || user.userType !== 'customer' || !user.customerId) {
      navigate('/login');
      return;
    }

    const loadCustomerData = async () => {
      setIsLoading(true);
      try {
        const customerData = await mockCustomersAPI.getById(user.customerId);
        setCustomer(customerData);
        
        // Get matching farmers for the first requirement
        if (customerData.requirements?.products && customerData.requirements.products.length > 0) {
          const matchingFarmersData = await mockAiAPI.getMatchingSuppliers(
            customerData.requirements.products[0]
          );
          setMatchingFarmers(matchingFarmersData);
        }
      } catch (error) {
        console.error('Error loading customer data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your data. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCustomerData();
  }, [user, navigate, toast]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-farm-green" />
            <p className="text-farm-dark-gray">Loading your dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!customer) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-farm-dark-gray">Customer data not found. Please contact support.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-farm-dark-gray">{customer.name}</h1>
            <p className="text-farm-dark-gray/70">{customer.location.address}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Badge variant="outline" className="bg-farm-brown/10 text-farm-brown border-farm-brown/20 capitalize">
              {customer.type}
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-farm-beige/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-farm-green data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="requirements" className="data-[state=active]:bg-farm-green data-[state=active]:text-white">
              Requirements
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="data-[state=active]:bg-farm-green data-[state=active]:text-white">
              Suppliers
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-farm-green data-[state=active]:text-white">
              Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2 text-farm-green" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{customer.requirements?.products.length || 0}</p>
                  <p className="text-sm text-farm-dark-gray/70">Active requirements</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="h-5 w-5 mr-2 text-farm-green" />
                    Suppliers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{matchingFarmers.length}</p>
                  <p className="text-sm text-farm-dark-gray/70">Matching suppliers</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-farm-green" />
                    Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-sm text-farm-dark-gray/70">Active orders</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest updates and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="h-9 w-9 rounded-full bg-farm-green/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-farm-green" />
                    </div>
                    <div>
                      <p className="font-medium">New supplier match found for your vegetable requirements</p>
                      <p className="text-sm text-farm-dark-gray/70">1 day ago</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start space-x-4">
                    <div className="h-9 w-9 rounded-full bg-farm-brown/10 flex items-center justify-center flex-shrink-0">
                      <ShoppingCart className="h-5 w-5 text-farm-brown" />
                    </div>
                    <div>
                      <p className="font-medium">Order #1234 from Green Valley Farm has been shipped</p>
                      <p className="text-sm text-farm-dark-gray/70">3 days ago</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start space-x-4">
                    <div className="h-9 w-9 rounded-full bg-farm-light-green/10 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="h-5 w-5 text-farm-light-green" />
                    </div>
                    <div>
                      <p className="font-medium">Price alert: Organic vegetables prices are trending down</p>
                      <p className="text-sm text-farm-dark-gray/70">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-farm-dark-gray">Your Requirements</h2>
              <Button className="bg-farm-green hover:bg-farm-green/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Requirement
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customer.requirements?.products.map((req, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="capitalize">{req.category}</CardTitle>
                    <CardDescription>Product Requirement</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-farm-dark-gray/70">Volume:</span>
                        <span className="font-medium">{req.volumePerMonth} units/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-farm-dark-gray/70">Price Range:</span>
                        <span className="font-medium">${req.priceRange.min} - ${req.priceRange.max}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-farm-dark-gray/70">Matching Suppliers:</span>
                        <span className="font-medium">{index === 0 ? matchingFarmers.length : '2'}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge className="bg-green-50 text-green-600 border-green-200">
                        Active
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="w-[48%]">Edit</Button>
                    <Button className="w-[48%] bg-farm-brown hover:bg-farm-brown/90">Find Suppliers</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-farm-dark-gray">Matching Suppliers</h2>
              <Button variant="outline" className="border-farm-green text-farm-green hover:bg-farm-green/10">
                <Search className="h-4 w-4 mr-2" />
                Search All Suppliers
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {matchingFarmers.map((farmer) => (
                <Card key={farmer.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{farmer.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1 text-farm-brown" />
                          {farmer.location.address}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-1">
                        {farmer.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="bg-farm-green/10 text-farm-green border-farm-green/20">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Matching Products</h3>
                      <div className="space-y-3">
                        {farmer.matchingProducts?.map((product) => (
                          <div key={product.id} className="flex justify-between items-center p-3 bg-farm-beige/10 rounded-md">
                            <div>
                              <p className="font-medium">{product.title}</p>
                              <p className="text-sm text-farm-dark-gray/70">
                                {product.estimatedYearlyVolume && `${Math.round(product.estimatedYearlyVolume / 12)} units/month`}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{product.price}</p>
                              {product.organic && (
                                <Badge className="bg-farm-green text-white text-xs">Organic</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-farm-dark-gray/70">Storage Facilities:</span>
                        <span className="font-medium">{farmer.storage?.length || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-farm-dark-gray/70">Transport Options:</span>
                        <span className="font-medium">{farmer.transport?.length || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-farm-dark-gray/70">Distance:</span>
                        <span className="font-medium">
                          {Math.round(
                            Math.sqrt(
                              Math.pow(farmer.location.lat - customer.location.lat, 2) +
                              Math.pow(farmer.location.lng - customer.location.lng, 2)
                            ) * 111
                          )} km
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="w-[48%]">View Details</Button>
                    <Button className="w-[48%] bg-farm-green hover:bg-farm-green/90">Contact</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Orders</CardTitle>
                <CardDescription>Track and manage your orders from suppliers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-farm-green/20 rounded-lg bg-farm-green/5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">Order #1234</h3>
                        <p className="text-sm text-farm-dark-gray/70">Green Valley Farm</p>
                      </div>
                      <Badge className="bg-blue-50 text-blue-600 border-blue-200">
                        Shipped
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-farm-dark-gray/70">Products:</span>
                        <span className="font-medium">Organic Vegetables</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-farm-dark-gray/70">Quantity:</span>
                        <span className="font-medium">500 units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-farm-dark-gray/70">Total:</span>
                        <span className="font-medium">$2,250.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-farm-dark-gray/70">Delivery Date:</span>
                        <span className="font-medium">June 15, 2023</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">Track Order</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-farm-green/20 rounded-lg bg-farm-green/5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">Order #1235</h3>
                        <p className="text-sm text-farm-dark-gray/70">Meadow Haven</p>
                      </div>
                      <Badge className="bg-green-50 text-green-600 border-green-200">
                        Delivered
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-farm-dark-gray/70">Products:</span>
                        <span className="font-medium">Artisanal Goat Cheese</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-farm-dark-gray/70">Quantity:</span>
                        <span className="font-medium">100 units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-farm-dark-gray/70">Total:</span>
                        <span className="font-medium">$675.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-farm-dark-gray/70">Delivery Date:</span>
                        <span className="font-medium">May 28, 2023</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-farm-green/20 rounded-lg bg-farm-green/5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">Order #1236</h3>
                        <p className="text-sm text-farm-dark-gray/70">Sunrise Farm</p>
                      </div>
                      <Badge className="bg-yellow-50 text-yellow-600 border-yellow-200">
                        Processing
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-farm-dark-gray/70">Products:</span>
                        <span className="font-medium">Organic Sweet Corn</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-farm-dark-gray/70">Quantity:</span>
                        <span className="font-medium">300 units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-farm-dark-gray/70">Total:</span>
                        <span className="font-medium">$975.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-farm-dark-gray/70">Delivery Date:</span>
                        <span className="font-medium">June 22, 2023</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">Track Order</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-farm-green hover:bg-farm-green/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Place New Order
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CustomerDashboard; 