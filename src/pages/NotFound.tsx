import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-farm-beige/10 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 text-farm-green">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-24 h-24 mx-auto"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-farm-dark-gray mb-4">404 - Page Not Found</h1>
        <p className="text-farm-dark-gray/70 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="bg-farm-green hover:bg-farm-green/90">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      <div className="mt-16 text-farm-dark-gray/50 text-sm">
        <p>
          Lost? Try checking the navigation menu for available pages or contact our support team.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
