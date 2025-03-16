import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/AuthContext";

// Layout
import Layout from "@/components/Layout";

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import FarmerDashboard from "@/pages/FarmerDashboard";
import CustomerDashboard from "@/pages/CustomerDashboard";
import Marketplace from "@/pages/Marketplace";
import AIBroker from "@/pages/AIBroker";
import SuccessStoriesPage from "@/pages/SuccessStoriesPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="dashboard" element={<FarmerDashboard />} />
                <Route path="customer-dashboard" element={<CustomerDashboard />} />
                <Route path="marketplace" element={<Marketplace />} />
                <Route path="ai-broker" element={<AIBroker />} />
                <Route path="success-stories" element={<SuccessStoriesPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </HashRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
