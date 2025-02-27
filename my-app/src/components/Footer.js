import React from 'react';
import { Link } from 'react-router-dom';
import { FaGavel, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-neutral text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <FaGavel className="text-2xl text-theme-secondary" />
              <span className="text-xl text-red-600 font-bold">Auction Hub</span>
            </div>
            <p className="text-gray-400">
              Your trusted platform for online auctions
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/auctions" className="text-gray-400 hover:text-white">Browse Auctions</Link></li>
              <li><Link to="/create-auction" className="text-gray-400 hover:text-white">Create Auction</Link></li>
              <li><Link to="/user-auctions" className="text-gray-400 hover:text-white">My Auctions</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-theme-secondary hover:text-theme-primary transition">
                <FaGithub className="text-2xl" />
              </a>
              <a href="#" className="text-theme-secondary hover:text-theme-primary transition">
                <FaLinkedin className="text-2xl" />
              </a>
              <a href="#" className="text-theme-secondary hover:text-theme-primary transition">
                <FaEnvelope className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Auction Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
