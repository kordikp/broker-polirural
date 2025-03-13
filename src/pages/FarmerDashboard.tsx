import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { mockFarmersAPI, mockAiAPI } from '@/lib/mockApi';
import { Farmer, Product } from '@/lib/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Leaf, TrendingUp, BarChart3, Truck, Package, Users } from 'lucide-react';
import Layout from '@/components/Layout';

const FarmerDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Redirect if not logged in or not a farmer
    if (!user || user.userType !== 'farmer' || !user.farmerId) {
      navigate('/login');
      return;
    }

    const loadFarmerData = async () => {
      setIsLoading(true);
      try {
        const farmerData = await mockFarmersAPI.getById(user.farmerId);
        setFarmer(farmerData);
        
        const productsData = await mockFarmersAPI.getProducts(user.farmerId);
        setProducts(productsData);
        
        const recommendationsData = await mockAiAPI.getRecommendedProducts(user.farmerId);
        setRecommendations(recommendationsData);
      } catch (error) {
        console.error('Error loading farmer data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your data. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadFarmerData();
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

  if (!farmer) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-farm-dark-gray">Farmer data not found. Please contact support.</p>
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
            <h1 className="text-3xl font-bold text-farm-dark-gray">{farmer.name}</h1>
            <p className="text-farm-dark-gray/70">{farmer.location.address}</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            {farmer.certifications.map((cert, index) => (
              <Badge key={index} variant="outline" className="bg-farm-green/10 text-farm-green border-farm-green/20">
                {cert}
              </Badge>
            ))}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-farm-beige/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-farm-green data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-farm-green data-[state=active]:text-white">
              Products
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-farm-green data-[state=active]:text-white">
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="logistics" className="data-[state=active]:bg-farm-green data-[state=active]:text-white">
              Logistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Package className="h-5 w-5 mr-2 text-farm-green" />
                    Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{products.length}</p>
                  <p className="text-sm text-farm-dark-gray/70">Active products</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Leaf className="h-5 w-5 mr-2 text-farm-green" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{farmer.certifications.length}</p>
                  <p className="text-sm text-farm-dark-gray/70">Active certifications</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="h-5 w-5 mr-2 text-farm-green" />
                    Potential Buyers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-sm text-farm-dark-gray/70">Matching your products</p>
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
                      <p className="font-medium">Market demand for organic vegetables is up 15%</p>
                      <p className="text-sm text-farm-dark-gray/70">2 days ago</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start space-x-4">
                    <div className="h-9 w-9 rounded-full bg-farm-brown/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-farm-brown" />
                    </div>
                    <div>
                      <p className="font-medium">Fresh Market Ltd is interested in your organic tomatoes</p>
                      <p className="text-sm text-farm-dark-gray/70">5 days ago</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start space-x-4">
                    <div className="h-9 w-9 rounded-full bg-farm-light-green/10 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="h-5 w-5 text-farm-light-green" />
                    </div>
                    <div>
                      <p className="font-medium">Your sweet corn is performing above market average</p>
                      <p className="text-sm text-farm-dark-gray/70">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-farm-dark-gray">Your Products</h2>
              <Button className="bg-farm-green hover:bg-farm-green/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id}>
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{product.title}</CardTitle>
                      {product.organic && (
                        <Badge className="bg-farm-green text-white">Organic</Badge>
                      )}
                    </div>
                    <CardDescription>{product.type}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-farm-dark-gray/70">Price:</span>
                      <span className="font-medium">{product.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-farm-dark-gray/70">Availability:</span>
                      <span className="font-medium">
                        {product.seasonalAvailability ? 
                          `Months ${product.seasonalAvailability.start}-${product.seasonalAvailability.end}` : 
                          'Year-round'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-farm-dark-gray/70">Yearly Volume:</span>
                      <span className="font-medium">{product.estimatedYearlyVolume} units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-farm-dark-gray/70">Status:</span>
                      <Badge variant={product.inStock ? "outline" : "secondary"} className={product.inStock ? "bg-green-50 text-green-600 border-green-200" : "bg-red-50 text-red-600 border-red-200"}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="w-[48%]">Edit</Button>
                    <Button className="w-[48%] bg-farm-brown hover:bg-farm-brown/90">Find Buyers</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Market Recommendations</CardTitle>
                <CardDescription>
                  Based on market trends and your current production
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {recommendations.length > 0 ? (
                  recommendations.map((rec, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg capitalize">{rec.productType}</h3>
                        <Badge className="bg-farm-green/10 text-farm-green border-farm-green/20">
                          {Math.round(rec.confidence * 100)}% Confidence
                        </Badge>
                      </div>
                      <p className="text-farm-dark-gray/80">{rec.recommendation}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Potential Revenue</span>
                          <span className="font-medium">${rec.potentialRevenue.toLocaleString()}/year</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Peak Season</span>
                          <span className="font-medium">
                            {rec.seasonality.peak.map(m => {
                              const date = new Date(2023, m - 1);
                              return date.toLocaleString('default', { month: 'short' });
                            }).join(', ')}
                          </span>
                        </div>
                      </div>
                      {index < recommendations.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-farm-dark-gray/70">No recommendations available at this time.</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-farm-green hover:bg-farm-green/90">
                  Request Detailed Analysis
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="logistics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2 text-farm-green" />
                    Storage Facilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {farmer.storage && farmer.storage.length > 0 ? (
                    farmer.storage.map((storage, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium capitalize">{storage.type} Storage</span>
                          <span>{storage.available} / {storage.capacity} units</span>
                        </div>
                        <Progress 
                          value={(storage.available / storage.capacity) * 100} 
                          className="h-2"
                        />
                        <p className="text-sm text-farm-dark-gray/70">
                          {Math.round((storage.available / storage.capacity) * 100)}% Available
                        </p>
                        {index < farmer.storage.length - 1 && <Separator className="my-2" />}
                      </div>
                    ))
                  ) : (
                    <p className="text-farm-dark-gray/70">No storage facilities registered.</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Storage Facility
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-farm-green" />
                    Transport Capabilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {farmer.transport && farmer.transport.length > 0 ? (
                    farmer.transport.map((transport, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="font-medium capitalize">{transport.type} Transport</span>
                          <span>{transport.capacity} units</span>
                        </div>
                        <p className="text-sm text-farm-dark-gray/70">
                          Max Distance: {transport.maxDistance} km
                        </p>
                        {index < farmer.transport.length - 1 && <Separator className="my-2" />}
                      </div>
                    ))
                  ) : (
                    <p className="text-farm-dark-gray/70">No transport capabilities registered.</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Transport Option
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FarmerDashboard; 