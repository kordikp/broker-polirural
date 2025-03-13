
import React from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { ChevronRight } from "lucide-react";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80";

const MarketplaceSection: React.FC = () => {
  const products = [
    {
      title: "Fresh Organic Vegetables",
      type: "Produce",
      location: "Green Valley Farm",
      price: "$4.50/lb",
      image: "https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      inStock: true,
      organic: true,
      featured: true,
    },
    {
      title: "Premium Hardwood Lumber",
      type: "Forestry",
      location: "Oakwood Timber",
      price: "$8.25/ft²",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      inStock: true,
    },
    {
      title: "Artisanal Goat Cheese",
      type: "Dairy",
      location: "Meadow Haven",
      price: "$6.75/8oz",
      image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      inStock: false,
      organic: true,
    },
    {
      title: "Organic Sweet Corn",
      type: "Grain",
      location: "Sunrise Farm",
      price: "$3.25/dozen",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      inStock: true,
      organic: true,
    },
  ];

  return (
    <section className="py-24 bg-farm-beige relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div className="max-w-2xl animate-on-scroll">
            <div className="inline-flex items-center px-3 py-1 text-sm border border-farm-brown/20 bg-farm-brown/5 text-farm-brown rounded-full mb-5">
              <span>Featured Products</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-farm-dark-gray mb-4">
              Browse Local Farm Products
            </h2>
            <p className="text-lg text-farm-dark-gray/70">
              Discover fresh, high-quality products directly from local farms and 
              forest owners. Connect with suppliers for your business needs.
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="text-farm-brown hover:text-farm-brown hover:bg-farm-brown/10 mt-4 md:mt-0 animate-on-scroll"
          >
            View All Products
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <div key={index} className="animate-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
        
        <div className="mt-16 rounded-xl overflow-hidden border border-farm-brown/10 animate-on-scroll">
          <div className="bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <div className="text-farm-brown font-medium mb-2">For Buyers</div>
              <h3 className="text-2xl font-semibold mb-2">Need Specific Products?</h3>
              <p className="text-farm-dark-gray/70 max-w-xl">
                Post your requirements and let our AI connect you with the perfect local suppliers.
              </p>
            </div>
            <Button className="bg-farm-brown hover:bg-farm-light-brown text-white">
              Post Buying Request
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
