import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useVendor } from '../contexts/VendorContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isVendor } = useVendor();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BS</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Bihar Services
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                {isVendor ? (
                  <Link
                    to="/vendor/dashboard"
                    className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    <User size={20} />
                    <span>Vendor Panel</span>
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/vendor/apply"
                      className="text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      Become a Vendor
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      <User size={20} />
                      <span>{user.name}</span>
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
              >
                Login / Signup
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-purple-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            {user ? (
              <div className="space-y-3">
                {isVendor ? (
                  <Link
                    to="/vendor/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-purple-600"
                  >
                    <User size={20} />
                    <span>Vendor Panel</span>
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/vendor/apply"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:text-purple-600"
                    >
                      Become a Vendor
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-purple-600"
                    >
                      <User size={20} />
                      <span>{user.name}</span>
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 w-full text-left"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsMenuOpen(false)}
                className="block mx-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg text-center"
              >
                Login / Signup
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;