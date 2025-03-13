import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Farmer, Product } from '../types';

interface Props {
  farmer: Farmer;
  onUpdateFarmer: (updatedFarmer: Farmer) => void;
}

export const FarmerManagement: React.FC<Props> = ({ farmer, onUpdateFarmer }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  const handleProductUpdate = (updatedProduct: Product) => {
    const updatedProducts = farmer.products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    onUpdateFarmer({ ...farmer, products: updatedProducts });
    setEditedProduct(null);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{farmer.name}</CardTitle>
            <CardDescription>{farmer.location.address}</CardDescription>
          </div>
          <div className="flex gap-2">
            {farmer.certifications.map(cert => (
              <Badge key={cert} variant="secondary">
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Products</h4>
            <div className="grid gap-4">
              {farmer.products.map(product => (
                <div
                  key={product.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">{product.name}</h5>
                      <p className="text-sm text-gray-600">
                        Available: {product.seasonalAvailability.start} - {product.seasonalAvailability.end}
                      </p>
                      <p className="text-sm text-gray-600">
                        Volume: {product.estimatedYearlyVolume}kg/year
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: €{product.priceRange.min}-{product.priceRange.max}/kg
                      </p>
                      <div className="flex gap-2 mt-2">
                        {product.certifications.map(cert => (
                          <Badge key={cert} variant="outline">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setEditedProduct(product);
                        setIsEditing(true);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Storage Facilities</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {farmer.storage.map((facility, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h5 className="font-medium capitalize">{facility.type} Storage</h5>
                  <p className="text-sm text-gray-600">
                    Capacity: {facility.capacity}m³
                  </p>
                  <p className="text-sm text-gray-600">
                    Available: {facility.available}m³
                  </p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(facility.available / facility.capacity) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Transport Capabilities</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {farmer.transport.map((transport, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h5 className="font-medium capitalize">{transport.type} Transport</h5>
                  <p className="text-sm text-gray-600">
                    Max Distance: {transport.maxDistance}km
                  </p>
                  <p className="text-sm text-gray-600">
                    Capacity: {transport.capacity} tons
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 