import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { mockAiAPI } from '@/lib/mockApi';
import { MarketPrediction, MapMarker, PotentialContact, EmailCampaignResult } from '@/lib/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Send, Sparkles, TrendingUp, BarChart3, Calendar, ArrowRight, Mail, MapPin, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom CSS for tooltips
import './AIBroker.css';

// Fix for default marker icons in Leaflet with webpack/vite
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom icons for farmers and customers by country
const farmerIconCZ = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [30, 45], // Larger size for farmers
  iconAnchor: [15, 45],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const farmerIconDE = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [30, 45], // Larger size for farmers
  iconAnchor: [15, 45],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const farmerIconAT = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [30, 45], // Larger size for farmers
  iconAnchor: [15, 45],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const customerIconCZ = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41], // Standard size for customers
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const customerIconDE = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41], // Standard size for customers
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const customerIconAT = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-pink.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41], // Standard size for customers
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIBroker: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [predictions, setPredictions] = useState<MarketPrediction[]>([]);
  const [isLoadingPredictions, setIsLoadingPredictions] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI Broker assistant. I can help you find the best matches between farmers and buyers, analyze market trends, suggest pricing strategies, and identify collaboration opportunities. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Map state
  const [mapMarkers, setMapMarkers] = useState<MapMarker[]>([]);
  const [isLoadingMap, setIsLoadingMap] = useState(true);
  const [mapCenter, setMapCenter] = useState<[number, number]>([49.3953, 13.2931]); // Center on Klatovy
  const [mapZoom, setMapZoom] = useState(9); // Higher zoom level for more local view
  
  // Email agent state
  const [searchQuery, setSearchQuery] = useState('');
  const [potentialContacts, setPotentialContacts] = useState<PotentialContact[]>([]);
  const [isSearchingContacts, setIsSearchingContacts] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailResult, setEmailResult] = useState<EmailCampaignResult | null>(null);
  const [automatedConversations, setAutomatedConversations] = useState<Array<{
    contactId: string;
    contactName: string;
    messages: Array<{ sender: 'ai' | 'contact'; content: string; timestamp: Date }>;
    status: 'active' | 'completed' | 'pending';
  }>>([]);
  const [showConversationDetails, setShowConversationDetails] = useState<string | null>(null);
  const [followUpMessage, setFollowUpMessage] = useState('');

  useEffect(() => {
    const loadPredictions = async () => {
      setIsLoadingPredictions(true);
      try {
        const predictionsData = await mockAiAPI.getMarketPredictions();
        setPredictions(predictionsData);
      } catch (error) {
        console.error('Error loading market predictions:', error);
        toast({
          title: 'Error',
          description: 'Failed to load market predictions. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingPredictions(false);
      }
    };

    loadPredictions();
  }, [toast]);

  // Load map data
  useEffect(() => {
    const loadMapData = async () => {
      setIsLoadingMap(true);
      try {
        const mapData = await mockAiAPI.getMapData();
        
        // Filter to only show locations within 100km of Klatovy
        const klatovyCoords = { lat: 49.3953, lng: 13.2931 }; // Klatovy coordinates
        const localMarkers = mapData.filter(marker => {
          // Calculate distance using Haversine formula
          const distance = calculateDistance(
            klatovyCoords.lat, 
            klatovyCoords.lng, 
            marker.location.lat, 
            marker.location.lng
          );
          
          // Add distance to marker for display in popup
          (marker as any).distanceFromKlatovy = Math.round(distance * 10) / 10;
          
          // Add country information for color-coding
          if (marker.location.address) {
            const country = marker.location.address.split(', ').pop();
            (marker as any).country = country;
          }
          
          return distance <= 100; // 100km radius
        });
        
        setMapMarkers(localMarkers as MapMarker[]);
        
        // Keep map centered on Klatovy
        setMapCenter([49.3953, 13.2931]);
      } catch (error) {
        console.error('Error loading map data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load map data. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingMap(false);
      }
    };

    if (activeTab === 'chat') {
      loadMapData();
    }
  }, [activeTab, toast]);

  // Calculate distance between two coordinates using Haversine formula (in km)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  };
  
  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180);
  };

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || isProcessing) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsProcessing(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(newMessage),
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1500);
  };

  // Email agent handlers
  const handleSearchContacts = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearchingContacts(true);
    try {
      const contacts = await mockAiAPI.getPotentialContacts(searchQuery);
      setPotentialContacts(contacts);
    } catch (error) {
      console.error('Error searching contacts:', error);
      toast({
        title: 'Error',
        description: 'Failed to search for contacts. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSearchingContacts(false);
    }
  };

  const handleToggleContact = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSendEmailCampaign = async () => {
    if (selectedContacts.length === 0 || !emailSubject.trim() || !emailMessage.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please select at least one contact and provide a subject and message.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSendingEmail(true);
    try {
      const result = await mockAiAPI.sendEmailCampaign(selectedContacts, emailSubject, emailMessage);
      setEmailResult(result);
      
      if (result.success) {
        toast({
          title: 'Success',
          description: `Email campaign sent to ${result.sent} contacts.`,
        });
        
        // Create automated conversations for each contact
        const newConversations = selectedContacts.map(contactId => {
          const contact = potentialContacts.find(c => c.id === contactId);
          return {
            contactId,
            contactName: contact?.name || 'Unknown Contact',
            messages: [
              {
                sender: 'ai' as const,
                content: emailMessage,
                timestamp: new Date(),
              }
            ],
            status: 'pending' as const,
          };
        });
        
        setAutomatedConversations(prev => [...prev, ...newConversations]);
        
        // Simulate responses after a delay
        setTimeout(() => {
          setAutomatedConversations(prev => 
            prev.map(conv => {
              if (selectedContacts.includes(conv.contactId) && conv.messages.length === 1) {
                const contact = potentialContacts.find(c => c.id === conv.contactId);
                const responseTime = new Date();
                responseTime.setMinutes(responseTime.getMinutes() + Math.floor(Math.random() * 30));
                
                return {
                  ...conv,
                  status: 'active' as const,
                  messages: [
                    ...conv.messages,
                    {
                      sender: 'contact' as const,
                      content: generateContactResponse(contact, emailSubject),
                      timestamp: responseTime,
                    }
                  ]
                };
              }
              return conv;
            })
          );
        }, 3000);
        
        // Reset form
        setSelectedContacts([]);
        setEmailSubject('');
        setEmailMessage('');
      }
    } catch (error) {
      console.error('Error sending email campaign:', error);
      toast({
        title: 'Error',
        description: 'Failed to send email campaign. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const generateContactResponse = (contact: PotentialContact | undefined, subject: string): string => {
    if (!contact) return "Thank you for reaching out. I'd like to learn more about your products.";
    
    const responses = [
      `Thank you for your email about "${subject}". We're always looking for quality ${contact.interests[0]} suppliers. Could you provide more details about your production capacity and delivery options?`,
      `I appreciate your message regarding "${subject}". As a ${contact.type} in ${contact.location}, we're interested in sourcing local products. What certifications do your products have?`,
      `Thanks for contacting ${contact.name}. Your products sound interesting, especially if they align with our focus on ${contact.interests.join(', ')}. Do you offer samples before establishing a regular supply?`,
      `Your email about "${subject}" caught my attention. We're currently expanding our ${contact.interests[0]} offerings. Could you share your price list and minimum order quantities?`,
      `Thank you for reaching out to ${contact.name}. We're potentially interested in your products. What makes your offerings stand out from other suppliers in the region?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendFollowUp = (contactId: string, message: string) => {
    if (!message.trim()) return;
    
    // Add AI follow-up message
    setAutomatedConversations(prev => 
      prev.map(conv => {
        if (conv.contactId === contactId) {
          const newMessages = [
            ...conv.messages,
            {
              sender: 'ai' as const,
              content: message,
              timestamp: new Date(),
            }
          ];
          
          return {
            ...conv,
            messages: newMessages,
          };
        }
        return conv;
      })
    );
    
    // Simulate contact response after a delay
    setTimeout(() => {
      setAutomatedConversations(prev => 
        prev.map(conv => {
          if (conv.contactId === contactId && conv.messages[conv.messages.length - 1].sender === 'ai') {
            const contact = potentialContacts.find(c => c.id === conv.contactId);
            const responseTime = new Date();
            responseTime.setMinutes(responseTime.getMinutes() + Math.floor(Math.random() * 20));
            
            // If this is the third exchange, mark as completed
            const isCompleted = conv.messages.length >= 4;
            
            return {
              ...conv,
              status: isCompleted ? 'completed' as const : 'active' as const,
              messages: [
                ...conv.messages,
                {
                  sender: 'contact' as const,
                  content: generateFollowUpResponse(contact, message, isCompleted),
                  timestamp: responseTime,
                }
              ]
            };
          }
          return conv;
        })
      );
    }, 2000);
  };

  const generateFollowUpResponse = (contact: PotentialContact | undefined, message: string, isCompleted: boolean): string => {
    if (!contact) return "Thank you for the additional information. I'll get back to you soon.";
    
    if (isCompleted) {
      const completionResponses = [
        "Great! I'd like to schedule a meeting to discuss this further. Please let me know your availability for next week.",
        "This sounds promising. I'll discuss with our purchasing team and get back to you with a formal inquiry.",
        "Thank you for all the information. We're interested in proceeding. Could you send us a sample order to evaluate?",
        "Perfect! This aligns with our needs. Let's arrange a call to discuss contract details.",
        "Excellent. We'd like to start with a small order to test the logistics. Please send us your order form."
      ];
      return completionResponses[Math.floor(Math.random() * completionResponses.length)];
    }
    
    const followUpResponses = [
      `Thanks for the quick response. Could you clarify your delivery schedule to ${contact.location}? We typically need deliveries on Mondays and Thursdays.`,
      `That's helpful information. What about seasonal availability? We're particularly interested in consistent supply throughout the year.`,
      `I appreciate the details. Our customers are very interested in the story behind their food. Could you share more about your farming practices?`,
      `Thank you for explaining. Do you offer any volume discounts? We're potentially looking at larger orders as our ${contact.type} expands.`,
      `That sounds promising. How quickly can you fulfill orders once placed? Our business requires reliable just-in-time delivery.`
    ];
    
    return followUpResponses[Math.floor(Math.random() * followUpResponses.length)];
  };

  const handleApproveAllConversations = () => {
    // Simulate AI continuing all pending conversations
    const pendingConversations = automatedConversations.filter(conv => conv.status === 'pending');
    
    if (pendingConversations.length === 0) {
      toast({
        title: 'No pending conversations',
        description: 'There are no pending conversations to approve.',
      });
      return;
    }
    
    pendingConversations.forEach(conv => {
      const aiResponse = "Thank you for your interest. I'd be happy to provide more details about our products. We offer organic, locally grown produce with sustainable farming practices. Our delivery schedule is flexible, and we can accommodate various order sizes. Would you like to know more about specific products or pricing?";
      
      handleSendFollowUp(conv.contactId, aiResponse);
    });
    
    toast({
      title: 'Conversations Approved',
      description: `AI will now manage ${pendingConversations.length} conversations automatically.`,
    });
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('market') && lowerCaseMessage.includes('trend')) {
      return "Based on our market analysis, we're seeing increasing demand for organic vegetables and specialty dairy products. Prices for these categories have risen by 8-12% in the last quarter. Would you like more specific information about a particular product category?";
    }
    
    if (lowerCaseMessage.includes('match') && (lowerCaseMessage.includes('supplier') || lowerCaseMessage.includes('farmer'))) {
      return "I can help you find matching suppliers! To provide the best recommendations, I need to know: 1) What products are you looking for? 2) What volume do you need monthly? 3) What's your location? Once you provide this information, I'll analyze our database to find the most suitable farmers for your needs.";
    }
    
    if (lowerCaseMessage.includes('match') && (lowerCaseMessage.includes('buyer') || lowerCaseMessage.includes('customer'))) {
      return "I'd be happy to help you find potential buyers for your products! To give you the best matches, please tell me: 1) What products do you offer? 2) What quantities can you supply? 3) Do you have any certifications (organic, etc.)? With this information, I can identify buyers who are looking for exactly what you produce.";
    }
    
    if (lowerCaseMessage.includes('price') && lowerCaseMessage.includes('strategy')) {
      return "For effective pricing strategies, I recommend considering: 1) Current market rates for similar products, 2) Your production costs plus desired margin, 3) Seasonal fluctuations in demand, and 4) Value-added aspects like organic certification. Would you like me to analyze pricing for a specific product you offer?";
    }
    
    if (lowerCaseMessage.includes('recommend') || lowerCaseMessage.includes('suggestion')) {
      return "Based on current market trends and your profile, I recommend exploring opportunities in specialty crops with high margins, such as heirloom vegetables or specialty grains. Additionally, consider forming partnerships with local restaurants or schools for stable, recurring orders. Would you like more specific recommendations for your business?";
    }
    
    return "Thank you for your message. I'm here to help with market analysis, finding matches between farmers and buyers, suggesting pricing strategies, and identifying collaboration opportunities. Could you please provide more details about what you're looking for?";
  };

  const formatDate = (month: number): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
  };

  const getMarkerIcon = (type: string, country: string | undefined): L.Icon<L.IconOptions> => {
    if (type === 'farmer') {
      if (country === 'Czech Republic') {
        return farmerIconCZ;
      } else if (country === 'Germany') {
        return farmerIconDE;
      } else if (country === 'Austria') {
        return farmerIconAT;
      }
      return farmerIconCZ; // Default to Czech Republic
    } else if (type === 'customer') {
      if (country === 'Czech Republic') {
        return customerIconCZ;
      } else if (country === 'Germany') {
        return customerIconDE;
      } else if (country === 'Austria') {
        return customerIconAT;
      }
      return customerIconCZ; // Default to Czech Republic
    } else {
      // Default to farmer icon if type is unknown
      return farmerIconCZ;
    }
  };

  if (isLoadingPredictions && activeTab === 'predictions') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-farm-green" />
          <p className="text-farm-dark-gray">Loading market predictions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-farm-dark-gray">AI Broker</h1>
          <p className="text-farm-dark-gray/70">Get insights, recommendations, and matches powered by AI</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full md:w-[600px]">
          <TabsTrigger value="chat">AI Assistant</TabsTrigger>
          <TabsTrigger value="predictions">Market Predictions</TabsTrigger>
          <TabsTrigger value="matching">Smart Matching</TabsTrigger>
          <TabsTrigger value="email">Email Agent</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-farm-green/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-farm-green" />
                  AI Assistant
                </CardTitle>
                <CardDescription>
                  Chat with our AI to get personalized advice and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] overflow-y-auto mb-4 space-y-4 p-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-farm-green text-white'
                            : 'bg-farm-beige/20 text-farm-dark-gray'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === 'user'
                              ? 'text-white/70'
                              : 'text-farm-dark-gray/50'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={isProcessing}
                    className="flex-grow"
                  />
                  <Button 
                    type="submit" 
                    className="bg-farm-green hover:bg-farm-green/90"
                    disabled={isProcessing || !newMessage.trim()}
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-farm-green/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-farm-green" />
                  Local Farms & Buyers Map
                </CardTitle>
                <CardDescription>
                  Visualize farms and potential buyers in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingMap ? (
                  <div className="h-[400px] flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-farm-green" />
                  </div>
                ) : (
                  <div className="h-[400px] rounded-md overflow-hidden border border-gray-200">
                    <MapContainer 
                      center={mapCenter} 
                      zoom={mapZoom} 
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      
                      {/* Šumava Region circle around Klatovy */}
                      <Circle 
                        center={[49.3953, 13.2931]}
                        radius={100000} // 100km in meters
                        pathOptions={{ 
                          color: '#4CAF50', 
                          fillColor: '#4CAF50', 
                          fillOpacity: 0.03,
                          weight: 1,
                          dashArray: '5, 5'
                        }}
                      >
                        <Tooltip permanent direction="center" className="bg-transparent border-0 shadow-none">
                          <div className="text-xs font-semibold text-green-700 bg-white px-2 py-1 rounded shadow">Šumava Region</div>
                        </Tooltip>
                      </Circle>
                      
                      {/* Local area circle */}
                      <Circle 
                        center={[49.3953, 13.2931]}
                        radius={30000} // 30km in meters
                        pathOptions={{ 
                          color: '#2196F3', 
                          fillColor: '#2196F3', 
                          fillOpacity: 0.02,
                          weight: 1,
                          dashArray: '3, 6'
                        }}
                      />
                      
                      {/* Klatovy center marker */}
                      <Marker 
                        position={[49.3953, 13.2931]}
                        icon={new L.Icon({
                          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                          iconSize: [25, 41],
                          iconAnchor: [12, 41],
                          popupAnchor: [1, -34],
                          shadowSize: [41, 41]
                        })}
                      >
                        <Popup>
                          <div className="p-1">
                            <h3 className="font-semibold">Klatovy</h3>
                            <p className="text-xs">Regional center of Šumava</p>
                          </div>
                        </Popup>
                      </Marker>
                      
                      {mapMarkers.map((marker) => (
                        <React.Fragment key={marker.id}>
                          <Marker 
                            position={[marker.location.lat, marker.location.lng]}
                            icon={getMarkerIcon(marker.type, (marker as any).country)}
                          >
                            <Tooltip 
                              permanent={false} 
                              direction="top" 
                              className={marker.type === 'farmer' ? 'farmer-tooltip' : 'buyer-tooltip'}
                            >
                              <div className="text-xs font-semibold">
                                {marker.type === 'farmer' ? '🌱 ' : '🛒 '}
                                {marker.name}
                              </div>
                            </Tooltip>
                            <Popup>
                              <div className="p-1">
                                <h3 className="font-semibold">
                                  {marker.type === 'farmer' ? '🌱 ' : '🛒 '}
                                  {marker.name}
                                </h3>
                                <p className="text-sm">{marker.location.address}</p>
                                <p className="text-xs mt-1 text-gray-500">
                                  <strong>{marker.type === 'farmer' ? 'Producer' : 'Buyer'}</strong> • 
                                  {(marker as any).distanceFromKlatovy && ` ${(marker as any).distanceFromKlatovy} km from Klatovy`}
                                </p>
                                {marker.type === 'farmer' && (marker as any).products && (
                                  <div className="text-sm mt-1">
                                    <span className="font-medium">Products:</span>
                                    <ul className="list-disc pl-5 text-xs mt-1">
                                      {(marker as any).products.map((product: string, idx: number) => (
                                        <li key={idx}>{product}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {marker.type === 'customer' && (marker as any).requirements && (
                                  <div className="text-sm mt-1">
                                    <span className="font-medium">Looking for:</span>
                                    <ul className="list-disc pl-5 text-xs mt-1">
                                      {(marker as any).requirements.map((requirement: string, idx: number) => (
                                        <li key={idx}>{requirement}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </Popup>
                          </Marker>
                          
                          {/* Activity circles */}
                          {marker.type === 'farmer' && (marker as any).productCount > 0 && (
                            <Circle 
                              center={[marker.location.lat, marker.location.lng]}
                              radius={(marker as any).productCount * 2000}
                              pathOptions={{ 
                                color: 'green', 
                                fillColor: 'green', 
                                fillOpacity: 0.1,
                                dashArray: '5, 5',
                                weight: 2
                              }}
                              className="farmer-activity-circle"
                            />
                          )}
                          {marker.type === 'customer' && (marker as any).demandCount > 0 && (
                            <Circle 
                              center={[marker.location.lat, marker.location.lng]}
                              radius={(marker as any).demandCount * 2000}
                              pathOptions={{ 
                                color: 'blue', 
                                fillColor: 'blue', 
                                fillOpacity: 0.1,
                                dashArray: '3, 3',
                                weight: 2
                              }}
                              className="buyer-activity-circle"
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </MapContainer>
                  </div>
                )}
                <div className="mt-4 text-sm text-farm-dark-gray/70">
                  <h4 className="font-medium mb-2">Map Legend</h4>
                  <div className="grid grid-cols-1 gap-y-3">
                    <div className="bg-gray-50 p-2 rounded-md border border-gray-200">
                      <p className="font-medium mb-2">Marker Types:</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <div className="flex items-center">
                          <div className="w-6 h-6 flex items-center justify-center bg-green-500 text-white rounded-full mr-2 text-xs">🌱</div>
                          <span><strong>Farmers</strong> (Producers)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full mr-2 text-xs">🛒</div>
                          <span><strong>Buyers</strong> (Customers)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-2 rounded-md border border-gray-200">
                      <p className="font-medium mb-2">Countries:</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span>Czech Republic (Farmers)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                          <span>Czech Republic (Buyers)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                          <span>Germany (Farmers)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-violet-500 mr-2"></div>
                          <span>Germany (Buyers)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                          <span>Austria (Farmers)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                          <span>Austria (Buyers)</span>
                        </div>
                        <div className="flex items-center col-span-2">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                          <span>Klatovy (center point)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-2 rounded-md border border-gray-200">
                      <p className="font-medium mb-2">Activity Circles:</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <div className="flex items-center">
                          <div className="w-6 h-3 border-t-2 border-dashed border-green-500 mr-2"></div>
                          <span>Farmer product range</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-6 h-3 border-t-2 border-dotted border-blue-500 mr-2"></div>
                          <span>Buyer demand range</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2 bg-gray-50 rounded-md border border-gray-200">
                      <p className="text-xs font-medium mb-1">Šumava Region Highlights:</p>
                      <ul className="text-xs list-disc pl-5 space-y-1">
                        <li>Cross-border agricultural region spanning Czech Republic, Germany, and Austria</li>
                        <li>Known for organic farming, sustainable forestry, and traditional food production</li>
                        <li>Growing farm-to-table movement connecting local producers with buyers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictions.map((prediction) => (
              <Card key={prediction.id} className="border-farm-green/20">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl capitalize">{prediction.productType}</CardTitle>
                    <Badge className={`${
                      prediction.demandTrend === 'increasing' 
                        ? 'bg-green-100 text-green-800 border-green-200' 
                        : prediction.demandTrend === 'stable'
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : 'bg-red-100 text-red-800 border-red-200'
                    }`}>
                      {prediction.demandTrend === 'increasing' 
                        ? 'Increasing Demand' 
                        : prediction.demandTrend === 'stable'
                          ? 'Stable Demand'
                          : 'Decreasing Demand'}
                    </Badge>
                  </div>
                  <CardDescription>
                    Market analysis and predictions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-farm-dark-gray/70">Price Range:</span>
                      <span className="font-medium">${prediction.priceRange.min} - ${prediction.priceRange.max} per unit</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-farm-dark-gray/70">Confidence:</span>
                      <span className="font-medium">{Math.round(prediction.confidence * 100)}%</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-farm-dark-gray/70">Peak Season:</span>
                      <span className="font-medium">
                        {prediction.seasonality.peak.map(month => formatDate(month)).join(', ')}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-farm-dark-gray/70">Low Season:</span>
                      <span className="font-medium">
                        {prediction.seasonality.low.map(month => formatDate(month)).join(', ')}
                      </span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1 text-farm-green" />
                      Recommendation
                    </h4>
                    <p className="text-sm text-farm-dark-gray/80">
                      {prediction.recommendation}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-farm-green text-farm-green hover:bg-farm-green/10"
                    onClick={() => setActiveTab('chat')}
                  >
                    Ask AI for Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="matching" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-farm-green/20">
              <CardHeader>
                <CardTitle>Find Suppliers</CardTitle>
                <CardDescription>
                  Discover farmers that match your requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-category">Product Category</Label>
                  <select 
                    id="product-category"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select a category</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="dairy">Dairy</option>
                    <option value="grain">Grain</option>
                    <option value="forestry">Forestry</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="volume">Monthly Volume Required</Label>
                  <Input 
                    id="volume"
                    type="number"
                    placeholder="e.g., 500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price-range">Price Range (per unit)</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="price-min"
                      type="number"
                      placeholder="Min $"
                    />
                    <Input 
                      id="price-max"
                      type="number"
                      placeholder="Max $"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="requirements">Additional Requirements</Label>
                  <Textarea 
                    id="requirements"
                    placeholder="Describe any specific requirements or preferences..."
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-farm-green hover:bg-farm-green/90">
                  Find Matching Suppliers
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border-farm-green/20">
              <CardHeader>
                <CardTitle>Find Buyers</CardTitle>
                <CardDescription>
                  Discover customers interested in your products
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="your-products">Your Products</Label>
                  <select 
                    id="your-products"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select a product</option>
                    <option value="organic-vegetables">Organic Vegetables</option>
                    <option value="artisanal-cheese">Artisanal Cheese</option>
                    <option value="premium-lumber">Premium Lumber</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="available-volume">Available Monthly Volume</Label>
                  <Input 
                    id="available-volume"
                    type="number"
                    placeholder="e.g., 1000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="certifications">Certifications</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="organic" 
                        className="h-4 w-4 text-farm-green focus:ring-farm-green border-gray-300 rounded"
                      />
                      <Label htmlFor="organic">Organic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="sustainable" 
                        className="h-4 w-4 text-farm-green focus:ring-farm-green border-gray-300 rounded"
                      />
                      <Label htmlFor="sustainable">Sustainable</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="local" 
                        className="h-4 w-4 text-farm-green focus:ring-farm-green border-gray-300 rounded"
                      />
                      <Label htmlFor="local">Local</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="delivery-options">Delivery Options</Label>
                  <Textarea 
                    id="delivery-options"
                    placeholder="Describe your delivery capabilities and limitations..."
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-farm-green hover:bg-farm-green/90">
                  Find Potential Buyers
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-6">
          <Card className="border-farm-green/20">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-farm-green" />
                AI Email Agent
              </CardTitle>
              <CardDescription>
                Find and contact potential customers for your products
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Find Potential Contacts</h3>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Search by product type, location, or business type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow"
                  />
                  <Button 
                    onClick={handleSearchContacts}
                    disabled={isSearchingContacts || !searchQuery.trim()}
                    className="bg-farm-green hover:bg-farm-green/90"
                  >
                    {isSearchingContacts ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                {isSearchingContacts ? (
                  <div className="h-40 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-farm-green" />
                  </div>
                ) : potentialContacts.length > 0 ? (
                  <div className="space-y-3 max-h-60 overflow-y-auto p-1">
                    {potentialContacts.map((contact) => (
                      <div 
                        key={contact.id}
                        className={`p-3 rounded-md border ${
                          selectedContacts.includes(contact.id)
                            ? 'border-farm-green bg-farm-green/5'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{contact.name}</h4>
                            <p className="text-sm text-farm-dark-gray/70">{contact.email}</p>
                            <p className="text-sm text-farm-dark-gray/70">{contact.type} • {contact.location}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {contact.interests.map((interest, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`rounded-full ${
                                selectedContacts.includes(contact.id)
                                  ? 'text-farm-green'
                                  : 'text-farm-dark-gray/50'
                              }`}
                              onClick={() => handleToggleContact(contact.id)}
                            >
                              {selectedContacts.includes(contact.id) ? (
                                <CheckCircle2 className="h-5 w-5" />
                              ) : (
                                <div className="h-5 w-5 rounded-full border border-current" />
                              )}
                            </Button>
                            <div className="text-xs text-center mt-1">
                              {Math.round(contact.confidence * 100)}% match
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchQuery.trim() !== '' && (
                  <div className="h-40 flex items-center justify-center text-farm-dark-gray/70">
                    No contacts found matching your search criteria.
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Compose Email Campaign</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="email-subject">Subject</Label>
                    <Input
                      id="email-subject"
                      placeholder="Enter email subject..."
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email-message">Message</Label>
                    <Textarea
                      id="email-message"
                      placeholder="Compose your email message..."
                      value={emailMessage}
                      onChange={(e) => setEmailMessage(e.target.value)}
                      className="min-h-[150px]"
                    />
                  </div>
                </div>
              </div>
              
              {emailResult && (
                <div className={`p-4 rounded-md ${
                  emailResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-start">
                    {emailResult.success ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                    )}
                    <div>
                      <h4 className="font-medium">
                        {emailResult.success ? 'Email Campaign Sent' : 'Failed to Send Campaign'}
                      </h4>
                      <p className="text-sm mt-1">
                        {emailResult.success
                          ? `Successfully sent to ${emailResult.sent} contacts. Estimated responses: ${emailResult.estimatedResponses}.`
                          : 'There was an error sending your email campaign. Please try again.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-farm-green hover:bg-farm-green/90"
                disabled={
                  isSendingEmail || 
                  selectedContacts.length === 0 || 
                  !emailSubject.trim() || 
                  !emailMessage.trim()
                }
                onClick={handleSendEmailCampaign}
              >
                {isSendingEmail ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send to {selectedContacts.length} Contact{selectedContacts.length !== 1 ? 's' : ''}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIBroker; 