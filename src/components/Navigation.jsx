import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiPresentation, FiCalculator, FiMenu, FiX } = FiIcons;

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/pitch-deck', label: 'Pitch Deck', icon: FiPresentation },
    { path: '/cost-calculator', label: 'Cost Calculator', icon: FiCalculator }
  ];

  return (
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
          <div className="hidden md:flex space-x-1">
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-powerbi-blue transition-colors"
            >
              <SafeIcon 
                icon={mobileMenuOpen ? FiX : FiMenu} 
                className="w-6 h-6" 
              />
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
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;