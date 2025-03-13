import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Customer } from '../types';

interface Props {
  customer: Customer;
  onUpdateCustomer: (updatedCustomer: Customer) => void;
}

export const CustomerManagement: React.FC<Props> = ({ customer, onUpdateCustomer }) => {
  const [isEditing, setIsEditing] = useState(false);

  const getCustomerTypeColor = (type: string) => {
    const colors = {
      supermarket: 'bg-blue-100 text-blue-800',
      school: 'bg-green-100 text-green-800',
      hospital: 'bg-red-100 text-red-800',
      restaurant: 'bg-yellow-100 text-yellow-800',
      company: 'bg-purple-100 text-purple-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[type as keyof typeof colors] || colors.other;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{customer.name}</CardTitle>
            <CardDescription>{customer.location.address}</CardDescription>
          </div>
          <Badge className={getCustomerTypeColor(customer.type)}>
            {customer.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Product Requirements</h4>
            <div className="grid gap-4">
              {customer.requirements.products.map((requirement, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium capitalize">{requirement.category}</h5>
                      <p className="text-sm text-gray-600">
                        Volume: {requirement.volumePerMonth}kg/month
                      </p>
                      <p className="text-sm text-gray-600">
                        Budget: €{requirement.priceRange.min}-{requirement.priceRange.max}/kg
                      </p>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
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
            <h4 className="font-semibold mb-2">Delivery Location</h4>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-600">{customer.location.address}</p>
              <div className="mt-2 text-sm text-gray-600">
                Coordinates: {customer.location.lat}, {customer.location.lng}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 