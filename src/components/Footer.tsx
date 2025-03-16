import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer 
      className="bg-farm-dark-gray text-white py-12 mt-8" 
      style={{
        backgroundColor: '#333333', 
        color: 'white',
        backgroundImage: 'none' // Override any background images
      }}
    >
      <div className="container container-transparent mx-auto px-4 sm:px-6 lg:px-8" style={{backgroundColor: 'transparent', boxShadow: 'none'}}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white" style={{color: 'white'}}>Farm2Market</h3>
            <p className="text-white/80 hover:text-white transition-colors" style={{color: 'rgba(255,255,255,0.8)'}}>
              Connecting farmers and buyers for a sustainable future.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white" style={{color: 'white'}}>Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-white/80 hover:text-white transition-colors" style={{color: 'rgba(255,255,255,0.8)'}}>Home</Link></li>
              <li><Link to="/marketplace" className="text-white/80 hover:text-white transition-colors" style={{color: 'rgba(255,255,255,0.8)'}}>Marketplace</Link></li>
              <li><Link to="/ai-broker" className="text-white/80 hover:text-white transition-colors" style={{color: 'rgba(255,255,255,0.8)'}}>AI Broker</Link></li>
              <li><Link to="/success-stories" className="text-white/80 hover:text-white transition-colors" style={{color: 'rgba(255,255,255,0.8)'}}>Success Stories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white" style={{color: 'white'}}>Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors" style={{color: 'rgba(255,255,255,0.8)'}}>Blog</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors" style={{color: 'rgba(255,255,255,0.8)'}}>FAQ</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors" style={{color: 'rgba(255,255,255,0.8)'}}>Support</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors" style={{color: 'rgba(255,255,255,0.8)'}}>Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white" style={{color: 'white'}}>Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors" style={{color: 'rgba(255,255,255,0.8)'}}>Terms of Service</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors" style={{color: 'rgba(255,255,255,0.8)'}}>Privacy Policy</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors" style={{color: 'rgba(255,255,255,0.8)'}}>Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/70" style={{color: 'rgba(255,255,255,0.7)'}}>&copy; {new Date().getFullYear()} Farm2Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
