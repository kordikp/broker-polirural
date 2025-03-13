
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-farm-green/10 rounded-full blur-3xl transform translate-x-1/2" />
        <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-farm-brown/10 rounded-full blur-3xl transform -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl lg:max-w-xl animate-fade-up">
            <div className="inline-flex items-center px-3 py-1 text-sm border border-farm-green/20 bg-farm-green/5 text-farm-green rounded-full mb-5">
              <span className="animate-pulse-subtle">Connecting Farms to Tables</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance tracking-tight text-farm-dark-gray mb-6">
              Direct From <span className="text-farm-green">Farmers</span> To <span className="text-farm-brown">Local Buyers</span>
            </h1>
            <p className="text-lg md:text-xl text-farm-dark-gray/70 mb-8 text-pretty">
              Empowering farmers with AI-driven market insights while connecting them directly to schools, hospitals, restaurants, and supermarkets. Grow smarter, sell better.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                className="bg-farm-green text-white hover:bg-farm-light-green transition-all duration-300 text-lg px-8 py-6 h-auto"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="border-farm-brown text-farm-brown hover:bg-farm-brown hover:text-white transition-all duration-300 text-lg px-8 py-6 h-auto"
              >
                Explore Marketplace
              </Button>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0 relative animate-fade-in">
            {/* Glass card */}
            <div className="relative overflow-hidden rounded-2xl glass-card p-4 md:p-6">
              <div className="flex flex-col space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-farm-dark-gray/70 uppercase tracking-wider">Products Available</span>
                  <span className="text-farm-green font-display font-semibold">+1,240</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-white/80 p-3 border border-farm-green/10 flex flex-col space-y-2">
                    <div className="w-12 h-12 rounded-md bg-farm-green/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-farm-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-medium text-farm-dark-gray">Organic Produce</span>
                  </div>
                  
                  <div className="rounded-lg bg-white/80 p-3 border border-farm-brown/10 flex flex-col space-y-2">
                    <div className="w-12 h-12 rounded-md bg-farm-brown/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-farm-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <span className="font-medium text-farm-dark-gray">Wood Products</span>
                  </div>
                  
                  <div className="rounded-lg bg-white/80 p-3 border border-farm-brown/10 flex flex-col space-y-2">
                    <div className="w-12 h-12 rounded-md bg-farm-light-brown/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-farm-light-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <span className="font-medium text-farm-dark-gray">Grains & Corn</span>
                  </div>
                  
                  <div className="rounded-lg bg-white/80 p-3 border border-farm-green/10 flex flex-col space-y-2">
                    <div className="w-12 h-12 rounded-md bg-farm-light-green/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-farm-light-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <span className="font-medium text-farm-dark-gray">Dairy Products</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                  <span className="text-xs text-farm-dark-gray/70">AI actively monitoring markets for new opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
