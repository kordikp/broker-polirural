import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { SuccessStory } from '../types';

interface Props {
  story: SuccessStory;
  onUpdateStory: (updatedStory: SuccessStory) => void;
}

export const SuccessStoryManagement: React.FC<Props> = ({ story, onUpdateStory }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>
              {story.farmer.name} ↔ {story.customer.name}
            </CardTitle>
            <CardDescription>
              Contract Value: €{story.contractValue} • Duration: {story.duration}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant={story.isRecurring ? "secondary" : "outline"}>
              {story.isRecurring ? "Recurring" : "One-time"}
            </Badge>
            <Badge variant={story.customerApproved ? "default" : "outline"}>
              {story.customerApproved ? "Approved" : "Pending Approval"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-gray-600">{story.description}</p>
          </div>

          {story.testimonial && (
            <div>
              <h4 className="font-semibold mb-2">Customer Testimonial</h4>
              <blockquote className="border-l-4 border-gray-200 pl-4 italic text-gray-600">
                "{story.testimonial}"
              </blockquote>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-2">AI Analysis</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">{story.aiGeneratedSummary}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Products Involved</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {story.farmer.products.map(product => (
                <div key={product.id} className="p-4 border rounded-lg">
                  <h5 className="font-medium">{product.name}</h5>
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
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Customer Requirements Met</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {story.customer.requirements.products.map((requirement, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h5 className="font-medium capitalize">{requirement.category}</h5>
                  <p className="text-sm text-gray-600">
                    Volume: {requirement.volumePerMonth}kg/month
                  </p>
                  <p className="text-sm text-gray-600">
                    Budget: €{requirement.priceRange.min}-{requirement.priceRange.max}/kg
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