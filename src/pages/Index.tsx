import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { ArrowRight, Leaf, TrendingUp, Users, ShoppingCart, BarChart4 } from "lucide-react";

const Index: React.FC = () => {
  const { user } = useAuth();

  const getStartedLink = () => {
    if (!user) return '/register';
    return user.userType === 'farmer' ? '/dashboard' : '/customer-dashboard';
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-farm-beige to-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
            <img 
              src="/images/pattern-farm.svg" 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-farm-dark-gray leading-tight">
                Connecting <span className="text-farm-green">Farmers</span> with <span className="text-farm-green">Buyers</span>
              </h1>
              <p className="mt-6 text-lg text-farm-dark-gray/80 max-w-lg">
                Farm2Market is a digital platform that helps local farmers connect with buyers, 
                optimize their supply chains, and grow their businesses sustainably.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to={getStartedLink()}>
                  <Button className="bg-farm-green hover:bg-farm-green/90 text-white px-8 py-6 text-lg">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/marketplace">
                  <Button variant="outline" className="border-farm-green text-farm-green hover:bg-farm-green/10 px-8 py-6 text-lg">
                    Explore Marketplace
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0">
              <img 
                src="/images/hero-image.jpg" 
                alt="Farmer with produce" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-farm-dark-gray">
              How Farm2Market Works
            </h2>
            <p className="mt-4 text-lg text-farm-dark-gray/70 max-w-2xl mx-auto">
              Our platform provides tools and services to help farmers and buyers create 
              sustainable and profitable relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-farm-beige/20 rounded-lg p-8 transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-farm-green/10 rounded-full flex items-center justify-center mb-6">
                <ShoppingCart className="h-6 w-6 text-farm-green" />
              </div>
              <h3 className="text-xl font-semibold text-farm-dark-gray mb-4">Digital Marketplace</h3>
              <p className="text-farm-dark-gray/70">
                Browse and list agricultural products with detailed information on quality, 
                availability, and pricing.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-farm-beige/20 rounded-lg p-8 transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-farm-green/10 rounded-full flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-farm-green" />
              </div>
              <h3 className="text-xl font-semibold text-farm-dark-gray mb-4">Smart Matching</h3>
              <p className="text-farm-dark-gray/70">
                Our AI-powered system connects farmers with the most suitable buyers based on 
                requirements, location, and preferences.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-farm-beige/20 rounded-lg p-8 transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-farm-green/10 rounded-full flex items-center justify-center mb-6">
                <BarChart4 className="h-6 w-6 text-farm-green" />
              </div>
              <h3 className="text-xl font-semibold text-farm-dark-gray mb-4">Market Insights</h3>
              <p className="text-farm-dark-gray/70">
                Access data-driven insights on market trends, pricing strategies, and demand 
                forecasts to make informed decisions.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-farm-beige/20 rounded-lg p-8 transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-farm-green/10 rounded-full flex items-center justify-center mb-6">
                <Leaf className="h-6 w-6 text-farm-green" />
              </div>
              <h3 className="text-xl font-semibold text-farm-dark-gray mb-4">Sustainability Focus</h3>
              <p className="text-farm-dark-gray/70">
                Promote sustainable farming practices and reduce food miles by connecting 
                local producers with nearby buyers.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-farm-beige/20 rounded-lg p-8 transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-farm-green/10 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-farm-green" />
              </div>
              <h3 className="text-xl font-semibold text-farm-dark-gray mb-4">Growth Opportunities</h3>
              <p className="text-farm-dark-gray/70">
                Discover new markets, expand your customer base, and grow your agricultural 
                business with our platform.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-farm-beige/20 rounded-lg p-8 transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 bg-farm-green/10 rounded-full flex items-center justify-center mb-6">
                <ArrowRight className="h-6 w-6 text-farm-green" />
              </div>
              <h3 className="text-xl font-semibold text-farm-dark-gray mb-4">AI Broker Assistant</h3>
              <p className="text-farm-dark-gray/70">
                Get personalized recommendations and assistance from our AI broker to optimize 
                your farming business or procurement strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Preview */}
      <section className="py-20 bg-farm-beige/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-farm-dark-gray">
              Success Stories
            </h2>
            <p className="mt-4 text-lg text-farm-dark-gray/70 max-w-2xl mx-auto">
              See how farmers and buyers are benefiting from our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Success Story 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="/images/success-story-1.jpg" 
                alt="Success Story" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-farm-dark-gray mb-2">
                  Local Farm Increases Revenue by 40%
                </h3>
                <p className="text-farm-dark-gray/70 mb-4">
                  "Farm2Market helped us connect with local restaurants and expand our customer base significantly."
                </p>
                <p className="text-sm text-farm-green font-medium">
                  - Maria Johnson, Green Valley Farm
                </p>
              </div>
            </div>

            {/* Success Story 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="/images/success-story-2.jpg" 
                alt="Success Story" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-farm-dark-gray mb-2">
                  Restaurant Chain Sources 80% Locally
                </h3>
                <p className="text-farm-dark-gray/70 mb-4">
                  "We've been able to source fresh, local ingredients consistently thanks to Farm2Market's platform."
                </p>
                <p className="text-sm text-farm-green font-medium">
                  - Chef David Chen, Fresh Bites Restaurants
                </p>
              </div>
            </div>

            {/* Success Story 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="/images/success-story-3.jpg" 
                alt="Success Story" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-farm-dark-gray mb-2">
                  Cooperative Expands to New Markets
                </h3>
                <p className="text-farm-dark-gray/70 mb-4">
                  "The AI broker helped us identify new market opportunities we hadn't considered before."
                </p>
                <p className="text-sm text-farm-green font-medium">
                  - Robert Smith, Sunrise Farmers Cooperative
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/success-stories">
              <Button variant="outline" className="border-farm-green text-farm-green hover:bg-farm-green/10">
                View All Success Stories <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-farm-green text-white" style={{backgroundColor: 'var(--farm-green)', color: 'white'}}>
        <div className="container container-transparent mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Transform Your Agricultural Business?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Join Farm2Market today and discover new opportunities for growth, 
              sustainability, and profitability.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to={getStartedLink()}>
                <Button className="bg-white text-farm-green hover:bg-white/90 px-8 py-6 text-lg">
                  Get Started Now
                </Button>
              </Link>
              <Link to="/ai-broker">
                <Button className="bg-farm-brown text-white hover:bg-farm-light-brown px-8 py-6 text-lg border-2 border-white/20">
                  Try AI Broker
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-farm-dark-gray text-white py-12" style={{backgroundColor: 'var(--farm-dark-gray)', color: 'white'}}>
        <div className="container container-transparent mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Farm2Market</h3>
              <p className="text-white/70">
                Connecting farmers and buyers for a sustainable future.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-white/70 hover:text-white">Home</Link></li>
                <li><Link to="/marketplace" className="text-white/70 hover:text-white">Marketplace</Link></li>
                <li><Link to="/ai-broker" className="text-white/70 hover:text-white">AI Broker</Link></li>
                <li><Link to="/success-stories" className="text-white/70 hover:text-white">Success Stories</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">FAQ</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Support</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/50">
            <p>&copy; {new Date().getFullYear()} Farm2Market. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
