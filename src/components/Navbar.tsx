import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, LogOut, Settings } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    return user.userType === 'farmer' ? '/dashboard' : '/customer-dashboard';
  };

  return (
    <nav className="bg-white border-b border-farm-beige/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="/logo.svg"
                alt="Farm2Market"
                onError={(e) => {
                  // Hide the image if it fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="ml-2 text-xl font-bold text-farm-green">Farm2Market</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link
                to="/marketplace"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/marketplace")
                    ? "bg-farm-green text-white"
                    : "text-farm-dark-gray hover:bg-farm-green/10 hover:text-farm-green"
                }`}
              >
                Marketplace
              </Link>
              <Link
                to="/ai-broker"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/ai-broker")
                    ? "bg-farm-brown text-white"
                    : "text-farm-dark-gray hover:bg-farm-brown/10 hover:text-farm-brown"
                }`}
              >
                AI Broker
              </Link>
              <Link
                to="/success-stories"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/success-stories")
                    ? "bg-farm-green text-white"
                    : "text-farm-dark-gray hover:bg-farm-green/10 hover:text-farm-green"
                }`}
              >
                Success Stories
              </Link>
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-farm-green text-farm-green">
                    <User className="h-4 w-4 mr-2" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate(getDashboardLink())}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-farm-green text-farm-green">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-farm-green hover:bg-farm-green/90">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-farm-dark-gray hover:text-farm-green hover:bg-farm-green/10 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/marketplace"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/marketplace")
                  ? "bg-farm-green text-white"
                  : "text-farm-dark-gray hover:bg-farm-green/10 hover:text-farm-green"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link
              to="/ai-broker"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/ai-broker")
                  ? "bg-farm-brown text-white"
                  : "text-farm-dark-gray hover:bg-farm-brown/10 hover:text-farm-brown"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              AI Broker
            </Link>
            <Link
              to="/success-stories"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/success-stories")
                  ? "bg-farm-green text-white"
                  : "text-farm-dark-gray hover:bg-farm-green/10 hover:text-farm-green"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Success Stories
            </Link>
            {user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="block px-3 py-2 rounded-md text-base font-medium text-farm-dark-gray hover:bg-farm-green/10 hover:text-farm-green"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-farm-dark-gray hover:bg-farm-green/10 hover:text-farm-green"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-farm-dark-gray hover:bg-farm-green/10 hover:text-farm-green"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-farm-dark-gray hover:bg-farm-green/10 hover:text-farm-green"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-farm-dark-gray hover:bg-farm-green/10 hover:text-farm-green"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
