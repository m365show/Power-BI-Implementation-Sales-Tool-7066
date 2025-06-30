import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../hooks/useAuth';
import UserProfile from './UserProfile';
import AuthModal from './AuthModal';

const { FiHome, FiPresentation, FiCalculator, FiMenu, FiX, FiUser } = FiIcons;

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const { user, loading } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/pitch-deck', label: 'Pitch Deck', icon: FiPresentation },
    { path: '/cost-calculator', label: 'Cost Calculator', icon: FiCalculator }
  ];

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-powerbi-yellow rounded-lg flex items-center justify-center">
                <span className="text-powerbi-dark font-bold text-sm">BI</span>
              </div>
              <span className="text-lg md:text-xl font-bold text-powerbi-dark">
                Power BI Solutions
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <div className={`flex items-center space-x-2 ${
                      location.pathname === item.path
                        ? 'text-powerbi-blue'
                        : 'text-gray-600 hover:text-powerbi-blue'
                    }`}>
                      <SafeIcon icon={item.icon} className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-powerbi-light rounded-lg -z-10"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                ))}
              </div>

              {/* Auth Section */}
              {loading ? (
                <div className="w-8 h-8 border-2 border-powerbi-blue border-t-transparent rounded-full animate-spin"></div>
              ) : user ? (
                <UserProfile />
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openAuthModal('signin')}
                    className="px-4 py-2 text-powerbi-blue hover:bg-powerbi-light rounded-lg transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="px-4 py-2 bg-powerbi-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {user && <UserProfile />}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-powerbi-blue transition-colors"
              >
                <SafeIcon icon={mobileMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-powerbi-light text-powerbi-blue'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-powerbi-blue'
                    }`}
                  >
                    <SafeIcon icon={item.icon} className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                
                {!user && (
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <button
                      onClick={() => {
                        openAuthModal('signin');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-powerbi-blue hover:bg-powerbi-light rounded-lg transition-colors"
                    >
                      <SafeIcon icon={FiUser} className="w-5 h-5" />
                      <span className="font-medium">Sign In</span>
                    </button>
                    <button
                      onClick={() => {
                        openAuthModal('signup');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 bg-powerbi-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <SafeIcon icon={FiUser} className="w-5 h-5" />
                      <span className="font-medium">Sign Up</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
      />
    </>
  );
};

export default Navigation;