import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockAuthAPI } from './mockApi';
import { useToast } from '@/components/ui/use-toast';

// Define user types
export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'farmer' | 'customer';
}

// Define the shape of the auth context
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, userType: 'farmer' | 'customer') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'John Farmer',
    email: 'farmer@example.com',
    userType: 'farmer',
  },
  {
    id: '2',
    name: 'Alice Buyer',
    email: 'customer@example.com',
    userType: 'customer',
  },
];

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAuthenticated = !!user;

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    // In a real app, you would make an API call here
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(u => u.email === email);
        
        if (foundUser && password === 'password') {
          setUser(foundUser);
          localStorage.setItem('user', JSON.stringify(foundUser));
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000); // Simulate network delay
    });
  };

  // Register function
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    userType: 'farmer' | 'customer'
  ): Promise<void> => {
    // In a real app, you would make an API call here
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if email already exists
        const existingUser = MOCK_USERS.find(u => u.email === email);
        
        if (existingUser) {
          reject(new Error('Email already in use'));
          return;
        }
        
        // Create new user (in a real app, this would be done on the server)
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          email,
          userType,
        };
        
        // Add to mock users (this is just for demo purposes)
        MOCK_USERS.push(newUser);
        
        resolve();
      }, 1000); // Simulate network delay
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 