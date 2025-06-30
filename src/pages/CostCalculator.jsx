import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore';
import AuthModal from '../components/AuthModal';

const { 
  FiUsers, 
  FiDatabase, 
  FiClock, 
  FiDollarSign, 
  FiDownload, 
  FiMail, 
  FiFileText, 
  FiTrendingUp,
  FiBuilding,
  FiSettings,
  FiShield,
  FiGlobe,
  FiChevronLeft,
  FiChevronRight,
  FiSave
} = FiIcons;

const CostCalculator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const { saveCalculation, saveUserActivity } = useFirestore();
  
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    industry: 'manufacturing',
    companySize: '51-200',
    annualRevenue: 'not_specified',
    
    // User & Licensing
    users: 50,
    powerBILicenseType: 'pro',
    premiumCapacity: false,
    
    // Data Infrastructure
    dataInfrastructure: 'sql',
    dataSources: 3,
    dataVolume: 'medium',
    updateFrequency: 'daily',
    cloudVsOnPrem: 'hybrid',
    
    // Reporting Requirements
    reportsCount: 10,
    dashboardComplexity: 'medium',
    customVisuals: false,
    mobileReporting: false,
    
    // Integration & Connectivity
    systemIntegrations: [],
    apiConnections: 0,
    gatewayRequired: false,
    
    // Security & Compliance
    securityRequirements: [],
    complianceNeeds: [],
    rowLevelSecurity: false,
    
    // Implementation Details
    itTeam: 'limited',
    timeline: '3-6-months',
    training: 'comprehensive',
    supportLevel: 'standard',
    
    // Advanced Features
    aiFeatures: false,
    automatedInsights: false,
    dataFlows: false,
    paginatedReports: false,
    
    // Infrastructure Costs
    azureServices: [],
    bandwidthRequirements: 'standard',
    storageNeeds: 'standard',
    
    // Maintenance & Operations
    maintenanceLevel: 'standard',
    monitoringTools: false,
    backupStrategy: 'basic',
    
    // Geographic Distribution
    multiRegion: false,
    internationalUsers: 0,
    
    // Migration Complexity
    legacySystemMigration: false,
    dataQualityIssues: 'minimal',
    historicalDataMigration: '1-year'
  });

  const [results, setResults] = useState({
    licensingCosts: 0,
    developmentCosts: 0,
    trainingCosts: 0,
    infrastructureCosts: 0,
    maintenanceCosts: 0,
    totalCosts: 0,
    timeline: 0,
    roi: 0,
    packageTier: 'Basic'
  });

  const steps = [
    {
      title: 'Company Information',
      description: 'Tell us about your organization',
      icon: FiBuilding
    },
    {
      title: 'User & Licensing',
      description: 'Define your user base and licensing needs',
      icon: FiUsers
    },
    {
      title: 'Data Infrastructure',
      description: 'Current data environment and sources',
      icon: FiDatabase
    },
    {
      title: 'Reporting Requirements',
      description: 'Dashboard and reporting specifications',
      icon: FiFileText
    },
    {
      title: 'Integration & Security',
      description: 'System integrations and security requirements',
      icon: FiShield
    },
    {
      title: 'Implementation Details',
      description: 'Timeline, training, and support needs',
      icon: FiSettings
    },
    {
      title: 'Advanced Features',
      description: 'AI, automation, and premium capabilities',
      icon: FiTrendingUp
    },
    {
      title: 'Results & Estimate',
      description: 'Your personalized cost breakdown',
      icon: FiDollarSign
    }
  ];

  useEffect(() => {
    calculateCosts();
  }, [formData]);

  useEffect(() => {
    // Track page visit
    if (saveUserActivity) {
      saveUserActivity({
        action: 'page_visit',
        page: 'cost_calculator',
        details: { step: currentStep }
      });
    }
  }, [currentStep, saveUserActivity]);

  const calculateCosts = () => {
    const {
      users,
      industry,
      dataInfrastructure,
      reportsCount,
      dataSources,
      itTeam,
      timeline,
      training,
      powerBILicenseType,
      premiumCapacity,
      systemIntegrations,
      securityRequirements,
      aiFeatures,
      dataVolume,
      cloudVsOnPrem
    } = formData;

    // Base licensing costs
    let licensingCosts = 0;
    if (powerBILicenseType === 'pro') {
      licensingCosts = users * 10 * 12; // $10/user/month
    } else if (powerBILicenseType === 'premium_per_user') {
      licensingCosts = users * 20 * 12; // $20/user/month
    }

    if (premiumCapacity) {
      licensingCosts += 5000 * 12; // $5000/month for Premium capacity
    }

    // Development costs
    let developmentCosts = reportsCount * 2500 + dataSources * 2000;
    
    // Apply industry multipliers
    const industryMultipliers = {
      retail: 1.0,
      healthcare: 1.4,
      manufacturing: 1.2,
      finance: 1.5,
      education: 0.9,
      government: 1.3,
      technology: 1.1,
      logistics: 1.2,
      energy: 1.3,
      real_estate: 1.1
    };

    const infraMultipliers = {
      excel: 1.0,
      sql: 1.2,
      cloud: 1.1,
      apis: 1.4,
      mixed: 1.5,
      hybrid: 1.3
    };

    const timelineMultipliers = {
      'asap': 1.6,
      '1-3-months': 1.3,
      '3-6-months': 1.0,
      '6-12-months': 0.9,
      '12-months+': 0.8
    };

    developmentCosts *= (industryMultipliers[industry] || 1.0);
    developmentCosts *= (infraMultipliers[dataInfrastructure] || 1.0);
    developmentCosts *= (timelineMultipliers[timeline] || 1.0);

    // Integration costs
    const integrationCost = systemIntegrations.length * 5000;
    developmentCosts += integrationCost;

    // Security costs
    const securityCost = securityRequirements.length * 3000;
    developmentCosts += securityCost;

    // AI features cost
    if (aiFeatures) {
      developmentCosts += 15000;
    }

    // Training costs
    let trainingCosts = training === 'comprehensive' ? users * 75 : users * 35;

    // Infrastructure costs
    let infrastructureCosts = 0;
    if (dataVolume === 'large') infrastructureCosts += 2000;
    if (dataVolume === 'very_large') infrastructureCosts += 5000;
    if (dataVolume === 'enterprise') infrastructureCosts += 10000;

    if (cloudVsOnPrem === 'cloud') infrastructureCosts += 1500;
    if (cloudVsOnPrem === 'on_premise') infrastructureCosts += 8000;
    if (cloudVsOnPrem === 'hybrid') infrastructureCosts += 4000;

    // Maintenance costs (annual)
    let maintenanceCosts = (developmentCosts + infrastructureCosts) * 0.2;

    // IT team adjustment
    const itMultipliers = {
      'none': 1.4,
      'limited': 1.2,
      'moderate': 1.0,
      'extensive': 0.8,
      'outsourced': 1.1
    };

    const itMultiplier = itMultipliers[itTeam] || 1.0;
    developmentCosts *= itMultiplier;
    trainingCosts *= itMultiplier;

    const totalCosts = licensingCosts + developmentCosts + trainingCosts + infrastructureCosts + maintenanceCosts;

    // Calculate timeline
    let timelineWeeks = 12;
    if (timeline === 'asap') timelineWeeks = 8;
    else if (timeline === '1-3-months') timelineWeeks = 10;
    else if (timeline === '6-12-months') timelineWeeks = 20;
    else if (timeline === '12-months+') timelineWeeks = 30;

    timelineWeeks += Math.floor(reportsCount / 5) * 2;
    timelineWeeks += systemIntegrations.length * 1;

    // Calculate ROI
    const annualSavings = users * 2500;
    const roi = Math.round((annualSavings / totalCosts) * 100);

    // Determine package tier
    let packageTier = 'Basic';
    if (users > 250 || reportsCount > 30 || systemIntegrations.length > 5) {
      packageTier = 'Enterprise';
    } else if (users > 100 || reportsCount > 15 || systemIntegrations.length > 2) {
      packageTier = 'Professional';
    }

    setResults({
      licensingCosts: Math.round(licensingCosts),
      developmentCosts: Math.round(developmentCosts),
      trainingCosts: Math.round(trainingCosts),
      infrastructureCosts: Math.round(infrastructureCosts),
      maintenanceCosts: Math.round(maintenanceCosts),
      totalCosts: Math.round(totalCosts),
      timeline: timelineWeeks,
      roi,
      packageTier
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const saveCalculationToFirebase = async () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    try {
      await saveCalculation({
        formData,
        results,
        calculationType: 'cost_estimate',
        title: `${formData.companyName || 'Untitled'} - Cost Estimate`
      });
      
      await saveUserActivity({
        action: 'calculation_saved',
        page: 'cost_calculator',
        details: { totalCosts: results.totalCosts, packageTier: results.packageTier }
      });

      alert('Calculation saved successfully!');
    } catch (error) {
      console.error('Error saving calculation:', error);
      alert('Error saving calculation. Please try again.');
    }
  };

  const exportReport = (format) => {
    const reportData = {
      companyInfo: {
        name: formData.companyName || 'Your Company',
        industry: formData.industry,
        size: formData.companySize,
        users: formData.users
      },
      costBreakdown: results,
      requirements: formData,
      generatedAt: new Date().toISOString(),
      developedBy: "Mirko - M365 Summit",
      linkedinProfile: "https://www.linkedin.com/in/m365-summit/",
      companyPage: "https://www.linkedin.com/school/m365-show/"
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `powerbi-cost-estimate-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }

    // Track export
    if (saveUserActivity) {
      saveUserActivity({
        action: 'report_exported',
        page: 'cost_calculator',
        details: { format, totalCosts: results.totalCosts }
      });
    }
  };

  // Render step content (keeping the existing renderStepContent function but adding save functionality to results)
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Company Information
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <select
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
              >
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail & E-commerce</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Financial Services</option>
                <option value="technology">Technology</option>
                <option value="education">Education</option>
                <option value="government">Government</option>
                <option value="real_estate">Real Estate</option>
                <option value="logistics">Logistics & Supply Chain</option>
                <option value="energy">Energy & Utilities</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
              <select
                value={formData.companySize}
                onChange={(e) => handleInputChange('companySize', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
              >
                <option value="1-50">1-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1,000 employees</option>
                <option value="1001-5000">1,001-5,000 employees</option>
                <option value="5000+">5,000+ employees</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Annual Revenue (Optional)</label>
              <select
                value={formData.annualRevenue}
                onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
              >
                <option value="not_specified">Prefer not to say</option>
                <option value="under_1m">Under $1M</option>
                <option value="1m_10m">$1M - $10M</option>
                <option value="10m_50m">$10M - $50M</option>
                <option value="50m_100m">$50M - $100M</option>
                <option value="100m_500m">$100M - $500M</option>
                <option value="500m_1b">$500M - $1B</option>
                <option value="1b+">$1B+</option>
              </select>
            </div>
          </div>
        );

      // ... (keeping all other cases from the original implementation)
      case 7: // Results (Enhanced with save functionality)
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-powerbi-dark mb-4">
                Cost Estimate for {formData.companyName || 'Your Company'}
              </h2>
              <p className="text-gray-600">
                Comprehensive Power BI implementation breakdown
              </p>
            </div>

            {/* Cost breakdown cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Annual Licensing Costs</span>
                    <span className="text-xl font-bold text-powerbi-blue">
                      ${results.licensingCosts.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Power BI licenses and premium capacity
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Development & Implementation</span>
                    <span className="text-xl font-bold text-green-600">
                      ${results.developmentCosts.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Custom development, integrations, and setup
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Training & Change Management</span>
                    <span className="text-xl font-bold text-yellow-600">
                      ${results.trainingCosts.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    User training and adoption support
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Infrastructure & Cloud</span>
                    <span className="text-xl font-bold text-purple-600">
                      ${results.infrastructureCosts.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Azure services, storage, and networking
                  </p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Annual Maintenance & Support</span>
                    <span className="text-xl font-bold text-orange-600">
                      ${results.maintenanceCosts.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Ongoing support and maintenance
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-powerbi-dark p-6 rounded-lg text-white text-center">
                  <h3 className="text-lg font-semibold mb-2">Total Investment</h3>
                  <p className="text-3xl font-bold mb-2">
                    ${results.totalCosts.toLocaleString()}
                  </p>
                  <p className="text-sm opacity-80">
                    First year total cost
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <SafeIcon icon={FiClock} className="w-8 h-8 text-powerbi-blue mx-auto mb-2" />
                    <div className="text-2xl font-bold text-powerbi-dark">{results.timeline}</div>
                    <div className="text-sm text-gray-600">Weeks</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <SafeIcon icon={FiTrendingUp} className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-powerbi-dark">{results.roi}%</div>
                    <div className="text-sm text-gray-600">Expected ROI</div>
                  </div>
                </div>

                <div className="bg-powerbi-light p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600">Recommended Package</div>
                  <div className="text-xl font-bold text-powerbi-blue">{results.packageTier}</div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-powerbi-dark">Save & Export Your Estimate</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button
                  onClick={saveCalculationToFirebase}
                  className="flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <SafeIcon icon={FiSave} className="w-4 h-4" />
                  <span>Save to Account</span>
                </button>
                
                <button
                  onClick={() => exportReport('json')}
                  className="flex items-center justify-center space-x-2 bg-powerbi-blue text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  <span>Download JSON</span>
                </button>
                
                <a
                  href="https://www.linkedin.com/school/m365-show/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-powerbi-yellow text-powerbi-dark px-4 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  <SafeIcon icon={FiGlobe} className="w-4 h-4" />
                  <span>Learn More</span>
                </a>
                
                <button className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                  <SafeIcon icon={FiMail} className="w-4 h-4" />
                  <span>Email Report</span>
                </button>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-600">
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
              <p className="mt-1">
                Learn more about our services at{' '}
                <a
                  href="https://www.linkedin.com/school/m365-show/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-powerbi-blue hover:underline"
                >
                  M365 Show
                </a>
              </p>
            </div>
          </div>
        );

      default:
        return <div>Step content not implemented</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-powerbi-dark mb-4">
            Power BI Cost Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get a comprehensive cost estimate for your Power BI implementation
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-2 md:mb-0 ${
                  index === currentStep
                    ? 'bg-powerbi-blue text-white'
                    : index < currentStep
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <SafeIcon icon={step.icon} className="w-4 h-4" />
                <span className="hidden md:inline">{step.title}</span>
                <span className="md:hidden">{index + 1}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-powerbi-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-powerbi-dark mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600">{steps[currentStep].description}</p>
          </div>

          {renderStepContent()}

          {/* Navigation */}
          {currentStep < steps.length - 1 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <SafeIcon icon={FiChevronLeft} className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={nextStep}
                className="flex items-center space-x-2 px-6 py-3 bg-powerbi-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <span>Next</span>
                <SafeIcon icon={FiChevronRight} className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode="signin"
      />
    </div>
  );
};

export default CostCalculator;