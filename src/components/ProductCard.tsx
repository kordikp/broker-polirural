
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  title: string;
  type: string;
  location: string;
  price: string;
  image: string;
  inStock: boolean;
  organic?: boolean;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  type,
  location,
  price,
  image,
  inStock,
  organic = false,
  featured = false,
}) => {
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md ${
      featured ? "ring-1 ring-farm-green" : "border border-border"
    }`}>
      <div className="relative overflow-hidden aspect-square">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {organic && (
            <Badge variant="outline" className="bg-white text-farm-green border-farm-green">
              Organic
            </Badge>
          )}
          {featured && (
            <Badge className="bg-farm-brown text-white">
              Featured
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className="py-4">
        <div className="text-sm text-farm-dark-gray/60 mb-1">
          {type} • {location}
        </div>
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <div className="flex items-center justify-between">
          <span className="font-display font-semibold text-farm-dark-gray">{price}</span>
          {inStock ? (
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
              In Stock
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
              Low Stock
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4">
        <Button className="w-full bg-farm-green text-white hover:bg-farm-light-green">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
