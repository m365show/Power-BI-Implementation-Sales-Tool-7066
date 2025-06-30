import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../hooks/useAuth';
import { useRealtimeCalculations } from '../hooks/useFirestore';

const { FiUser, FiLogOut, FiSettings, FiFileText, FiCalculator, FiChevronDown } = FiIcons;

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { calculations } = useRealtimeCalculations();

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
      >
        <div className="w-8 h-8 bg-powerbi-blue rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-semibold">
            {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-gray-900">
            {user.displayName || 'User'}
          </div>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>
        <SafeIcon icon={FiChevronDown} className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
        >
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-powerbi-blue rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {user.displayName || 'User'}
                </div>
                <div className="text-sm text-gray-500">{user.email}</div>
                {user.company && (
                  <div className="text-xs text-gray-400">{user.company}</div>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 border-b border-gray-100">
            <h4 className="font-medium text-gray-900 mb-3">Your Activity</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <SafeIcon icon={FiCalculator} className="w-4 h-4 text-powerbi-blue" />
                  <span className="text-xs text-gray-600">Calculations</span>
                </div>
                <div className="text-lg font-bold text-powerbi-blue">
                  {calculations.length}
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <SafeIcon icon={FiFileText} className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-gray-600">Pitch Decks</span>
                </div>
                <div className="text-lg font-bold text-green-600">0</div>
              </div>
            </div>
          </div>

          <div className="p-2">
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <SafeIcon icon={FiUser} className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Profile Settings</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <SafeIcon icon={FiSettings} className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Preferences</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
            >
              <SafeIcon icon={FiLogOut} className="w-4 h-4" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </motion.div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default UserProfile;