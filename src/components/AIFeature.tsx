
import React from "react";
import { Sparkles, TrendingUp, CloudLightning, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const AIFeature: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-farm-green/5 rounded-full blur-3xl transform -translate-x-1/2" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <div className="inline-flex items-center px-3 py-1 text-sm border border-farm-green/20 bg-farm-green/5 text-farm-green rounded-full mb-5">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>AI-Powered Market Insights</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-farm-dark-gray mb-4">
            Smart Farming Meets Intelligent Market Analysis
          </h2>
          <p className="text-lg text-farm-dark-gray/70 text-pretty">
            Our AI agents monitor market demand in real-time, helping farmers optimize production 
            and connect with the perfect buyers for their products.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-card rounded-xl p-6 animate-on-scroll">
            <div className="w-12 h-12 rounded-lg bg-farm-green/10 flex items-center justify-center mb-5">
              <TrendingUp className="h-6 w-6 text-farm-green" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-farm-dark-gray">Market Demand Analysis</h3>
            <p className="text-farm-dark-gray/70 mb-4">
              AI continuously monitors local market needs from schools, hospitals, 
              restaurants, and retailers to identify emerging opportunities.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="h-5 w-5 text-farm-green mr-2">✓</span>
                <span className="text-sm text-farm-dark-gray/70">Real-time demand tracking</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-farm-green mr-2">✓</span>
                <span className="text-sm text-farm-dark-gray/70">Local buyer trend insights</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-farm-green mr-2">✓</span>
                <span className="text-sm text-farm-dark-gray/70">Seasonal prediction models</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full border-farm-green text-farm-green hover:bg-farm-green hover:text-white">
              Learn More
            </Button>
          </div>
          
          <div className="glass-card rounded-xl p-6 animate-on-scroll" style={{ transitionDelay: "100ms" }}>
            <div className="w-12 h-12 rounded-lg bg-farm-brown/10 flex items-center justify-center mb-5">
              <CloudLightning className="h-6 w-6 text-farm-brown" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-farm-dark-gray">Smart Inventory Matching</h3>
            <p className="text-farm-dark-gray/70 mb-4">
              Our AI matches your available inventory with the perfect buyers, 
              facilitating direct connections and reduced time to market.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="h-5 w-5 text-farm-brown mr-2">✓</span>
                <span className="text-sm text-farm-dark-gray/70">Intelligent buyer matching</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-farm-brown mr-2">✓</span>
                <span className="text-sm text-farm-dark-gray/70">Contract recommendation</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-farm-brown mr-2">✓</span>
                <span className="text-sm text-farm-dark-gray/70">Direct relationship building</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full border-farm-brown text-farm-brown hover:bg-farm-brown hover:text-white">
              Learn More
            </Button>
          </div>
          
          <div className="glass-card rounded-xl p-6 md:col-span-2 lg:col-span-1 animate-on-scroll" style={{ transitionDelay: "200ms" }}>
            <div className="w-12 h-12 rounded-lg bg-farm-light-green/10 flex items-center justify-center mb-5">
              <Leaf className="h-6 w-6 text-farm-light-green" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-farm-dark-gray">Growth Optimization</h3>
            <p className="text-farm-dark-gray/70 mb-4">
              Receive tailored recommendations for what to grow next season based on market 
              forecasts, buyer demand, and optimal yield strategies.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="h-5 w-5 text-farm-light-green mr-2">✓</span>
                <span className="text-sm text-farm-dark-gray/70">Data-driven planting advice</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-farm-light-green mr-2">✓</span>
                <span className="text-sm text-farm-dark-gray/70">Sustainable farming practices</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 text-farm-light-green mr-2">✓</span>
                <span className="text-sm text-farm-dark-gray/70">Profitability projections</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full border-farm-light-green text-farm-light-green hover:bg-farm-light-green hover:text-white">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFeature;
