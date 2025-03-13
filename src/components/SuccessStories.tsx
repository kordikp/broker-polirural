
import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const SuccessStories: React.FC = () => {
  const stories = [
    {
      name: "Oakridge Elementary School",
      role: "School Cafeteria",
      avatar: "OE",
      testimonial: "We've formed a direct relationship with three local farms that now supply our cafeteria with fresh produce year-round. Our students are eating healthier and we've reduced our food costs by 15%.",
      image: "https://images.unsplash.com/photo-1570975640108-2292e898025c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Green Valley Farms",
      role: "Organic Produce Supplier",
      avatar: "GV",
      testimonial: "The AI recommended expanding our kale and spinach production based on local hospital demand. We secured a 2-year contract within weeks and have increased our revenue by 30%.",
      image: "https://images.unsplash.com/photo-1520052203542-d3095f1b6cf0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Community Regional Hospital",
      role: "Healthcare Food Services",
      avatar: "CR",
      testimonial: "We've partnered with 5 local farms to supply our cafeteria and patient meals. The quality has improved dramatically and we've built relationships that benefit our entire community.",
      image: "https://images.unsplash.com/photo-1578991624414-276ef23a534f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-farm-green/5 rounded-full blur-3xl transform translate-x-1/2" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <div className="inline-flex items-center px-3 py-1 text-sm border border-farm-brown/20 bg-farm-brown/5 text-farm-brown rounded-full mb-5">
            <Award className="h-4 w-4 mr-2" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-farm-dark-gray mb-4">
            Real Connections, Real Results
          </h2>
          <p className="text-lg text-farm-dark-gray/70 text-pretty">
            See how farmers and local businesses are building sustainable relationships 
            through our platform, creating value for their communities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <Card 
              key={index} 
              className="p-6 border border-farm-gray glass-card flex flex-col animate-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-6">
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                  <AvatarImage src="" alt={story.name} />
                  <AvatarFallback className="bg-farm-green text-white">
                    {story.avatar}
                  </AvatarFallback>
                </Avatar>
                <Quote className="h-8 w-8 text-farm-green/20" />
              </div>
              
              <p className="text-farm-dark-gray/80 mb-6 flex-grow">{story.testimonial}</p>
              
              <div className="mt-auto">
                <div className="border-t border-farm-gray pt-4">
                  <h4 className="font-semibold text-farm-dark-gray">{story.name}</h4>
                  <p className="text-sm text-farm-dark-gray/60">{story.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 animate-on-scroll">
          <Card className="overflow-hidden border border-farm-gray rounded-xl shadow-md">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1591086489821-58ce80bed54c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Success story highlight" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center bg-white">
                <div className="inline-flex items-center px-3 py-1 text-sm bg-farm-green/10 text-farm-green rounded-full mb-4 w-fit">
                  <span>Featured Story</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-farm-dark-gray">
                  From Farm to School: A Community Success
                </h3>
                <p className="text-farm-dark-gray/70 mb-6">
                  Riverview School District partnered with 7 local farms to supply fresh produce 
                  to all 12 of their schools, creating $1.2M in annual contracts for local farmers 
                  while improving student nutrition and reducing environmental impact.
                </p>
                <Button 
                  className="bg-farm-green hover:bg-farm-light-green text-white w-fit mt-2 inline-flex items-center"
                >
                  Read Full Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
