import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-farm-dark-gray text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Farm2Market</h3>
            <p className="text-white/70">
              Connecting farmers and buyers for a sustainable future.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/70 hover:text-white">Home</Link></li>
              <li><Link to="/marketplace" className="text-white/70 hover:text-white">Marketplace</Link></li>
              <li><Link to="/ai-broker" className="text-white/70 hover:text-white">AI Broker</Link></li>
              <li><Link to="/success-stories" className="text-white/70 hover:text-white">Success Stories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-white/70 hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-white/70 hover:text-white">Support</a></li>
              <li><a href="#" className="text-white/70 hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-white/70 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/50">
          <p>&copy; {new Date().getFullYear()} Farm2Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
