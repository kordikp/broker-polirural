import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { 
  Building2, 
  GraduationCap, 
  Bot, 
  Mail, 
  Search, 
  TrendingUp, 
  MessageSquare,
  Settings,
  Users
} from 'lucide-react';

const InnovationBrokerDashboard = () => {
  const [activeTab, setActiveTab] = useState('demand');

  // Simulovaná data
  const demandSide = [
    { id: 1, name: "ČEZ", type: "Korporace", interest: "Optimalizace energetické spotřeby", status: "Aktivní" },
    { id: 2, name: "Ministerstvo průmyslu", type: "Státní instituce", interest: "Zelená energetika", status: "Jednání" }
  ];

  const supplySide = [
    { id: 1, name: "UCEEB", type: "Výzkumné centrum", expertise: "Energetická efektivnost budov", successStories: 3 },
    { id: 2, name: "ČVUT", type: "Univerzita", expertise: "Smart grids", successStories: 5 }
  ];

  const successStories = [
    { id: 1, title: "Implementace smart měření v průmyslovém areálu", savings: "30% úspora energie" },
    { id: 2, title: "Optimalizace vytápění administrativní budovy", savings: "25% úspora nákladů" }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inovační Broker Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Nastavení
          </Button>
          <Button variant="outline" size="sm">
            <Users className="w-4 h-4 mr-2" />
            Můj tým
          </Button>
        </div>
      </div>

      <Tabs defaultValue="demand" className="space-y-4">
        <TabsList className="flex space-x-2">
          <TabsTrigger value="matchmaking" className="px-4 py-2">
            <TrendingUp className="w-4 h-4 mr-2" />
            Matchmaking
          </TabsTrigger>
          <TabsTrigger value="demand" className="px-4 py-2">
            <Building2 className="w-4 h-4 mr-2" />
            Poptávka
          </TabsTrigger>
          <TabsTrigger value="supply" className="px-4 py-2">
            <GraduationCap className="w-4 h-4 mr-2" />
            Nabídka
          </TabsTrigger>
          <TabsTrigger value="ai-agents" className="px-4 py-2">
            <Bot className="w-4 h-4 mr-2" />
            AI Agenti
          </TabsTrigger>
          <TabsTrigger value="success-stories" className="px-4 py-2">
            <TrendingUp className="w-4 h-4 mr-2" />
            Success Stories
          </TabsTrigger>
        </TabsList>

        <TabsContent value="demand" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Pipeline Poptávek</CardTitle>
                <CardDescription>Aktivní proces identifikace a zpracování poptávek</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demandSide.map(demand => (
                    <Card key={demand.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{demand.name}</h3>
                          <p className="text-sm text-gray-500">{demand.type}</p>
                          <p className="text-sm mt-1">{demand.interest}</p>
                        </div>
                        <Badge>{demand.status}</Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="supply" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Správa nabídky</CardTitle>
              <CardDescription>Přehled výzkumných institucí a jejich expertízy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplySide.map(institution => (
                  <Card key={institution.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{institution.name}</h3>
                        <p className="text-sm text-gray-500">{institution.type}</p>
                        <p className="text-sm">{institution.expertise}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">
                          {institution.successStories} success stories
                        </Badge>
                        <Button size="sm">Detail</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="success-stories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Success Stories</CardTitle>
              <CardDescription>Přehled úspěšných případových studií</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {successStories.map(story => (
                  <Card key={story.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{story.title}</h3>
                        <p className="text-sm text-green-600">{story.savings}</p>
                      </div>
                      <Button size="sm">Detail</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InnovationBrokerDashboard; 