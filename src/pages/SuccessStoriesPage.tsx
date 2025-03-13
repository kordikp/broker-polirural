import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockSuccessStoriesAPI } from '@/lib/mockApi';
import { SuccessStory } from '@/lib/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Calendar, DollarSign, Repeat, ThumbsUp, ArrowRight } from 'lucide-react';

const SuccessStoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStories = async () => {
      setIsLoading(true);
      try {
        const storiesData = await mockSuccessStoriesAPI.getAll();
        setStories(storiesData);
      } catch (error) {
        console.error('Error loading success stories:', error);
        toast({
          title: 'Error',
          description: 'Failed to load success stories. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadStories();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-farm-green" />
          <p className="text-farm-dark-gray">Loading success stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-farm-dark-gray mb-4">Success Stories</h1>
        <p className="text-farm-dark-gray/70 text-lg">
          Discover how our platform has helped farmers and buyers create sustainable, 
          profitable partnerships that benefit local communities.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 mb-12">
        {stories.map((story) => (
          <Card key={story.id} className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 bg-farm-beige/20 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Partnership</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge className="bg-farm-green text-white">
                      {story.farmer?.name}
                    </Badge>
                    <span>→</span>
                    <Badge className="bg-farm-brown text-white">
                      {story.customer?.name}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-farm-green mr-2" />
                      <div>
                        <p className="text-sm text-farm-dark-gray/70">Contract Value</p>
                        <p className="font-medium">${story.contractValue.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-farm-green mr-2" />
                      <div>
                        <p className="text-sm text-farm-dark-gray/70">Duration</p>
                        <p className="font-medium">{story.duration}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Repeat className="h-5 w-5 text-farm-green mr-2" />
                      <div>
                        <p className="text-sm text-farm-dark-gray/70">Type</p>
                        <p className="font-medium">{story.isRecurring ? 'Recurring Contract' : 'One-time Deal'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <ThumbsUp className="h-5 w-5 text-farm-green mr-2" />
                      <div>
                        <p className="text-sm text-farm-dark-gray/70">Status</p>
                        <p className="font-medium">{story.customerApproved ? 'Customer Approved' : 'Pending Approval'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-farm-green hover:bg-farm-green/90"
                  onClick={() => navigate(`/success-stories/${story.id}`)}
                >
                  View Full Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="md:col-span-2 p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-2">
                    {story.farmer?.name} + {story.customer?.name}
                  </h2>
                  <p className="text-farm-dark-gray/70">
                    Started {new Date(story.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">The Story</h3>
                    <p className="text-farm-dark-gray/80">{story.description}</p>
                  </div>
                  
                  {story.aiGeneratedSummary && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-2">AI Analysis</h3>
                        <div className="bg-farm-green/5 border border-farm-green/20 rounded-md p-4">
                          <p className="text-farm-dark-gray/80 italic">{story.aiGeneratedSummary}</p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Products Involved</h3>
                      <div className="space-y-2">
                        {story.farmer?.products
                          ?.filter(p => story.products?.includes(p.id))
                          .map((product) => (
                            <div key={product.id} className="flex items-center space-x-2">
                              <Badge variant="outline" className="bg-farm-green/10 text-farm-green border-farm-green/20">
                                {product.type}
                              </Badge>
                              <span>{product.title}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Customer Requirements</h3>
                      <div className="space-y-2">
                        {story.customer?.requirements?.products.map((req, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Badge variant="outline" className="bg-farm-brown/10 text-farm-brown border-farm-brown/20">
                              {req.category}
                            </Badge>
                            <span>{req.volumePerMonth} units/month</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="bg-farm-green text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Create Your Own Success Story</h2>
        <p className="text-white/80 mb-6 max-w-2xl mx-auto">
          Join our platform today to connect with local farmers or buyers and start building 
          sustainable partnerships that benefit your business and community.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            className="bg-white text-farm-green hover:bg-farm-beige"
            onClick={() => navigate('/register')}
          >
            Join as Farmer
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white/20"
            onClick={() => navigate('/register')}
          >
            Register as Buyer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoriesPage; 