import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGavel } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <nav className="bg-theme-gradient text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <FaGavel className="text-2xl group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-bold">Auction Bazaar</span>
          </Link>
          <div className="flex gap-4">
            {user ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2 bg-white text-theme-primary rounded-full hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md"
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/signin')}
                  className="px-6 py-2 bg-white text-theme-primary rounded-full hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-theme-primary transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
