import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBarChart3, FiTrendingUp, FiUsers, FiZap, FiArrowRight, FiGlobe } = FiIcons;

const Home = () => {
  const features = [
    {
      icon: FiBarChart3,
      title: 'Interactive Dashboards',
      description: 'Create stunning, interactive dashboards that bring your data to life'
    },
    {
      icon: FiTrendingUp,
      title: 'Real-time Analytics',
      description: 'Get instant insights with real-time data processing and visualization'
    },
    {
      icon: FiUsers,
      title: 'Collaborative Platform',
      description: 'Share insights across your organization with secure, role-based access'
    },
    {
      icon: FiZap,
      title: 'AI-Powered Insights',
      description: 'Leverage machine learning to uncover hidden patterns in your data'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-powerbi-light via-white to-gray-50">
      {/* SEO Meta Tags would be handled by React Helmet or similar */}
      
      {/* Hero Section */}
      <section className="pt-12 md:pt-20 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-powerbi-dark mb-4 md:mb-6">
              Transform Your Business with{' '}
              <span className="text-powerbi-blue block mt-2">Power BI</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto">
              Unlock the full potential of your data with Microsoft Power BI. Get professional implementation guidance and accurate cost estimates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pitch-deck"
                className="bg-powerbi-blue text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <span>View Pitch Deck</span>
                <SafeIcon icon={FiArrowRight} className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
              <Link
                to="/cost-calculator"
                className="bg-powerbi-yellow text-powerbi-dark px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg hover:bg-yellow-400 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Calculate Costs</span>
                <SafeIcon icon={FiArrowRight} className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-powerbi-dark mb-4">
              Why Choose Power BI?
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Power BI delivers enterprise-grade business intelligence that scales with your organization
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-powerbi-light rounded-lg flex items-center justify-center mb-4">
                  <SafeIcon icon={feature.icon} className="w-6 h-6 text-powerbi-blue" />
                </div>
                <h3 className="text-xl font-semibold text-powerbi-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-powerbi-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-powerbi-yellow mb-2">97%</div>
              <div className="text-white">Customer Satisfaction</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-powerbi-yellow mb-2">50%</div>
              <div className="text-white">Faster Decision Making</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-powerbi-yellow mb-2">300%</div>
              <div className="text-white">Average ROI</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-powerbi-dark mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-8">
              Explore our comprehensive pitch deck or get an instant cost estimate for your Power BI implementation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/pitch-deck"
                className="bg-powerbi-blue text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Explore Pitch Deck
              </Link>
              <Link
                to="/cost-calculator"
                className="border-2 border-powerbi-blue text-powerbi-blue px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold hover:bg-powerbi-blue hover:text-white transition-colors"
              >
                Calculate Implementation Cost
              </Link>
            </div>
            
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-powerbi-dark mb-4">About Our Services</h3>
              <p className="text-gray-600 mb-4">
                Learn more about our comprehensive Power BI solutions and Microsoft 365 expertise.
              </p>
              <a
                href="https://www.linkedin.com/school/m365-show/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-powerbi-yellow text-powerbi-dark px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                <SafeIcon icon={FiGlobe} className="w-4 h-4" />
                <span>Visit M365 Show</span>
              </a>
            </div>
            
            <div className="mt-6 text-sm text-gray-600">
              <p>
                Developed by{' '}
                <a
                  href="https://www.linkedin.com/in/m365-summit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-powerbi-blue hover:underline font-medium"
                >
                  Mirko - M365 Summit
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;