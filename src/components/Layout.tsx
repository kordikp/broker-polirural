import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-farm-light">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
