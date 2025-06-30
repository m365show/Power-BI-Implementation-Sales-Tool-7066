import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../hooks/useAuth';

const { FiX, FiUser, FiMail, FiLock, FiBuilding, FiUserCheck } = FiIcons;

const AuthModal = ({ isOpen, onClose, mode = 'signin' }) => {
  const [currentMode, setCurrentMode] = useState(mode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    company: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signUp, resetPassword } = useAuth();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (currentMode === 'signin') {
        await signIn(formData.email, formData.password);
        onClose();
      } else if (currentMode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          return;
        }
        await signUp(formData.email, formData.password, {
          displayName: formData.displayName,
          company: formData.company,
          role: formData.role
        });
        onClose();
      } else if (currentMode === 'reset') {
        await resetPassword(formData.email);
        setError('Password reset email sent! Check your inbox.');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setCurrentMode(newMode);
    setError('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      displayName: '',
      company: '',
      role: ''
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-md"
        >
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-powerbi-dark">
              {currentMode === 'signin' && 'Sign In'}
              {currentMode === 'signup' && 'Create Account'}
              {currentMode === 'reset' && 'Reset Password'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiX} className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className={`p-3 rounded-lg text-sm ${
                error.includes('sent') 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-red-50 text-red-700'
              }`}>
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SafeIcon icon={FiMail} className="inline w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            {currentMode !== 'reset' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <SafeIcon icon={FiLock} className="inline w-4 h-4 mr-2" />
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            )}

            {currentMode === 'signup' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <SafeIcon icon={FiLock} className="inline w-4 h-4 mr-2" />
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <SafeIcon icon={FiUser} className="inline w-4 h-4 mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <SafeIcon icon={FiBuilding} className="inline w-4 h-4 mr-2" />
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <SafeIcon icon={FiUserCheck} className="inline w-4 h-4 mr-2" />
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
                  >
                    <option value="">Select your role</option>
                    <option value="executive">Executive</option>
                    <option value="manager">Manager</option>
                    <option value="analyst">Business Analyst</option>
                    <option value="it">IT Professional</option>
                    <option value="consultant">Consultant</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-powerbi-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  {currentMode === 'signin' && 'Sign In'}
                  {currentMode === 'signup' && 'Create Account'}
                  {currentMode === 'reset' && 'Send Reset Email'}
                </>
              )}
            </button>
          </form>

          <div className="px-6 pb-6 space-y-3">
            {currentMode === 'signin' && (
              <>
                <button
                  onClick={() => switchMode('reset')}
                  className="text-powerbi-blue hover:underline text-sm"
                >
                  Forgot your password?
                </button>
                <div className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => switchMode('signup')}
                    className="text-powerbi-blue hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </div>
              </>
            )}

            {currentMode === 'signup' && (
              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => switchMode('signin')}
                  className="text-powerbi-blue hover:underline font-medium"
                >
                  Sign in
                </button>
              </div>
            )}

            {currentMode === 'reset' && (
              <div className="text-center text-sm text-gray-600">
                Remember your password?{' '}
                <button
                  onClick={() => switchMode('signin')}
                  className="text-powerbi-blue hover:underline font-medium"
                >
                  Sign in
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;