import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { PieChart, BarChart } from 'echarts/charts';
import { 
  TitleComponent, 
  TooltipComponent, 
  LegendComponent,
  GridComponent 
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  PieChart,
  BarChart,
  CanvasRenderer
]);

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
  FiChevronRight
} = FiIcons;

const CostCalculator = () => {
  const [currentStep, setCurrentStep] = useState(0);
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
    paginatedReports: false, // Fixed: removed space from property name
    
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
  };

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

      case 1: // User & Licensing
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SafeIcon icon={FiUsers} className="inline w-4 h-4 mr-2" />
                Number of Power BI Users
              </label>
              <input
                type="range"
                min="5"
                max="1000"
                value={formData.users}
                onChange={(e) => handleInputChange('users', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>5</span>
                <span className="font-semibold text-powerbi-blue">{formData.users} users</span>
                <span>1000</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Power BI License Type</label>
              <select
                value={formData.powerBILicenseType}
                onChange={(e) => handleInputChange('powerBILicenseType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
              >
                <option value="pro">Power BI Pro ($10/user/month)</option>
                <option value="premium_per_user">Power BI Premium Per User ($20/user/month)</option>
              </select>
            </div>

            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.premiumCapacity}
                  onChange={(e) => handleInputChange('premiumCapacity', e.target.checked)}
                  className="w-4 h-4 text-powerbi-blue bg-gray-100 border-gray-300 rounded focus:ring-powerbi-blue focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Premium Capacity Required (+$5,000/month)
                </span>
              </label>
              <p className="text-xs text-gray-500 ml-7">
                For large-scale deployments, advanced features, and dedicated resources
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">International Users</label>
              <input
                type="range"
                min="0"
                max="200"
                value={formData.internationalUsers}
                onChange={(e) => handleInputChange('internationalUsers', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>0</span>
                <span className="font-semibold text-powerbi-blue">{formData.internationalUsers} users</span>
                <span>200</span>
              </div>
            </div>
          </div>
        );

      case 2: // Data Infrastructure
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SafeIcon icon={FiDatabase} className="inline w-4 h-4 mr-2" />
                Primary Data Infrastructure
              </label>
              <select
                value={formData.dataInfrastructure}
                onChange={(e) => handleInputChange('dataInfrastructure', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
              >
                <option value="excel">Primarily Excel Files</option>
                <option value="sql">SQL Server Databases</option>
                <option value="cloud">Cloud Platforms (Azure, AWS, GCP)</option>
                <option value="apis">APIs & Web Services</option>
                <option value="mixed">Mixed Environment</option>
                <option value="hybrid">Hybrid (On-Premise + Cloud)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Volume</label>
              <select
                value={formData.dataVolume}
                onChange={(e) => handleInputChange('dataVolume', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
              >
                <option value="small">Small (&lt; 1GB)</option>
                <option value="medium">Medium (1GB - 100GB)</option>
                <option value="large">Large (100GB - 1TB)</option>
                <option value="very_large">Very Large (1TB - 10TB)</option>
                <option value="enterprise">Enterprise (10TB+)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Update Frequency</label>
              <select
                value={formData.updateFrequency}
                onChange={(e) => handleInputChange('updateFrequency', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
              >
                <option value="real_time">Real-time</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Data Sources</label>
              <input
                type="range"
                min="1"
                max="50"
                value={formData.dataSources}
                onChange={(e) => handleInputChange('dataSources', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1</span>
                <span className="font-semibold text-powerbi-blue">{formData.dataSources} sources</span>
                <span>50</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cloud vs On-Premise Strategy</label>
              <select
                value={formData.cloudVsOnPrem}
                onChange={(e) => handleInputChange('cloudVsOnPrem', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
              >
                <option value="cloud">Cloud-First</option>
                <option value="on_premise">On-Premise</option>
                <option value="hybrid">Hybrid Approach</option>
              </select>
            </div>
          </div>
        );

      case 3: // Reporting Requirements
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SafeIcon icon={FiFileText} className="inline w-4 h-4 mr-2" />
                Number of Reports/Dashboards
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={formData.reportsCount}
                onChange={(e) => handleInputChange('reportsCount', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1</span>
                <span className="font-semibold text-powerbi-blue">{formData.reportsCount} reports</span>
                <span>100</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dashboard Complexity</label>
              <select
                value={formData.dashboardComplexity}
                onChange={(e) => handleInputChange('dashboardComplexity', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
              >
                <option value="simple">Simple (Basic charts and tables)</option>
                <option value="medium">Medium (Interactive visualizations)</option>
                <option value="complex">Complex (Advanced analytics, custom visuals)</option>
                <option value="enterprise">Enterprise (Multi-page, drill-through, advanced features)</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.customVisuals}
                  onChange={(e) => handleInputChange('customVisuals', e.target.checked)}
                  className="w-4 h-4 text-powerbi-blue bg-gray-100 border-gray-300 rounded focus:ring-powerbi-blue focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700">Custom Visuals Required</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.mobileReporting}
                  onChange={(e) => handleInputChange('mobileReporting', e.target.checked)}
                  className="w-4 h-4 text-powerbi-blue bg-gray-100 border-gray-300 rounded focus:ring-powerbi-blue focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700">Mobile Reporting Required</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.paginatedReports}
                  onChange={(e) => handleInputChange('paginatedReports', e.target.checked)}
                  className="w-4 h-4 text-powerbi-blue bg-gray-100 border-gray-300 rounded focus:ring-powerbi-blue focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700">Paginated Reports (Pixel-perfect)</span>
              </label>
            </div>
          </div>
        );

      case 4: // Integration & Security
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SafeIcon icon={FiShield} className="inline w-4 h-4 mr-2" />
                System Integrations Required
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {[
                  { value: 'erp', label: 'ERP Systems (SAP, Oracle, etc.)' },
                  { value: 'crm', label: 'CRM Systems (Salesforce, Dynamics)' },
                  { value: 'hr', label: 'HR Systems' },
                  { value: 'accounting', label: 'Accounting Software' },
                  { value: 'inventory', label: 'Inventory Management' },
                  { value: 'ecommerce', label: 'E-commerce Platforms' },
                  { value: 'marketing', label: 'Marketing Automation Tools' },
                  { value: 'custom', label: 'Custom Applications' }
                ].map(option => (
                  <label key={option.value} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={(formData.systemIntegrations || []).includes(option.value)}
                      onChange={(e) => {
                        const current = formData.systemIntegrations || [];
                        if (e.target.checked) {
                          handleInputChange('systemIntegrations', [...current, option.value]);
                        } else {
                          handleInputChange('systemIntegrations', current.filter(v => v !== option.value));
                        }
                      }}
                      className="w-4 h-4 text-powerbi-blue bg-gray-100 border-gray-300 rounded focus:ring-powerbi-blue focus:ring-2"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Security Requirements</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {[
                  { value: 'sso', label: 'Single Sign-On (SSO)' },
                  { value: 'mfa', label: 'Multi-Factor Authentication' },
                  { value: 'rls', label: 'Row-Level Security' },
                  { value: 'encryption', label: 'Data Encryption' },
                  { value: 'audit', label: 'Audit Trails' },
                  { value: 'gdpr', label: 'GDPR Compliance' },
                  { value: 'hipaa', label: 'HIPAA Compliance' },
                  { value: 'sox', label: 'SOX Compliance' }
                ].map(option => (
                  <label key={option.value} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={(formData.securityRequirements || []).includes(option.value)}
                      onChange={(e) => {
                        const current = formData.securityRequirements || [];
                        if (e.target.checked) {
                          handleInputChange('securityRequirements', [...current, option.value]);
                        } else {
                          handleInputChange('securityRequirements', current.filter(v => v !== option.value));
                        }
                      }}
                      className="w-4 h-4 text-powerbi-blue bg-gray-100 border-gray-300 rounded focus:ring-powerbi-blue focus:ring-2"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">API Connections Needed</label>
              <input
                type="range"
                min="0"
                max="20"
                value={formData.apiConnections}
                onChange={(e) => handleInputChange('apiConnections', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>0</span>
                <span className="font-semibold text-powerbi-blue">{formData.apiConnections} APIs</span>
                <span>20</span>
              </div>
            </div>
          </div>
        );

      case 5: // Implementation Details
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SafeIcon icon={FiClock} className="inline w-4 h-4 mr-2" />
                Desired Timeline
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
              >
                <option value="asap">ASAP (Rush project)</option>
                <option value="1-3-months">1-3 months</option>
                <option value="3-6-months">3-6 months</option>
                <option value="6-12-months">6-12 months</option>
                <option value="12-months+">More than 12 months</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Internal IT Team Capacity</label>
              <select
                value={formData.itTeam}
                onChange={(e) => handleInputChange('itTeam', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
              >
                <option value="none">No dedicated IT team</option>
                <option value="limited">Limited IT resources</option>
                <option value="moderate">Moderate IT support</option>
                <option value="extensive">Extensive IT team</option>
                <option value="outsourced">Outsourced IT services</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Training & Support Level</label>
              <select
                value={formData.training}
                onChange={(e) => handleInputChange('training', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
              >
                <option value="basic">Basic training (Online resources)</option>
                <option value="standard">Standard training (Virtual sessions)</option>
                <option value="comprehensive">Comprehensive training (On-site + Virtual)</option>
                <option value="enterprise">Enterprise training (Custom curriculum)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ongoing Support Level</label>
              <select
                value={formData.supportLevel}
                onChange={(e) => handleInputChange('supportLevel', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
              >
                <option value="basic">Basic (Email support)</option>
                <option value="standard">Standard (Email + Phone)</option>
                <option value="premium">Premium (24/7 support)</option>
                <option value="dedicated">Dedicated support team</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Historical Data Migration</label>
              <select
                value={formData.historicalDataMigration}
                onChange={(e) => handleInputChange('historicalDataMigration', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
              >
                <option value="none">No historical data</option>
                <option value="6-months">6 months</option>
                <option value="1-year">1 year</option>
                <option value="2-years">2 years</option>
                <option value="5-years">5+ years</option>
              </select>
            </div>
          </div>
        );

      case 6: // Advanced Features
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-powerbi-dark">AI & Advanced Analytics</h3>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.aiFeatures}
                  onChange={(e) => handleInputChange('aiFeatures', e.target.checked)}
                  className="w-4 h-4 text-powerbi-blue bg-gray-100 border-gray-300 rounded focus:ring-powerbi-blue focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700">AI-Powered Insights & Q&A</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.automatedInsights}
                  onChange={(e) => handleInputChange('automatedInsights', e.target.checked)}
                  className="w-4 h-4 text-powerbi-blue bg-gray-100 border-gray-300 rounded focus:ring-powerbi-blue focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700">Automated Insights & Anomaly Detection</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.dataFlows}
                  onChange={(e) => handleInputChange('dataFlows', e.target.checked)}
                  className="w-4 h-4 text-powerbi-blue bg-gray-100 border-gray-300 rounded focus:ring-powerbi-blue focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700">Power BI Dataflows (Self-service ETL)</span>
              </label>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-powerbi-dark">Infrastructure & Monitoring</h3>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.monitoringTools}
                  onChange={(e) => handleInputChange('monitoringTools', e.target.checked)}
                  className="w-4 h-4 text-powerbi-blue bg-gray-100 border-gray-300 rounded focus:ring-powerbi-blue focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700">Advanced Monitoring & Usage Analytics</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.multiRegion}
                  onChange={(e) => handleInputChange('multiRegion', e.target.checked)}
                  className="w-4 h-4 text-powerbi-blue bg-gray-100 border-gray-300 rounded focus:ring-powerbi-blue focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700">Multi-Region Deployment</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.gatewayRequired}
                  onChange={(e) => handleInputChange('gatewayRequired', e.target.checked)}
                  className="w-4 h-4 text-powerbi-blue bg-gray-100 border-gray-300 rounded focus:ring-powerbi-blue focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700">On-Premises Data Gateway Required</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Backup & Recovery Strategy</label>
              <select
                value={formData.backupStrategy}
                onChange={(e) => handleInputChange('backupStrategy', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
              >
                <option value="basic">Basic (Weekly backups)</option>
                <option value="standard">Standard (Daily backups)</option>
                <option value="enterprise">Enterprise (Real-time replication)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Quality Assessment</label>
              <select
                value={formData.dataQualityIssues}
                onChange={(e) => handleInputChange('dataQualityIssues', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
              >
                <option value="minimal">Minimal data quality issues</option>
                <option value="moderate">Moderate cleanup required</option>
                <option value="significant">Significant data quality work needed</option>
                <option value="extensive">Extensive data remediation required</option>
              </select>
            </div>
          </div>
        );

      case 7: // Results
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
              <h3 className="text-lg font-semibold text-powerbi-dark">Export Your Estimate</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                
                <button className="flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors">
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
        return null;
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
    </div>
  );
};

export default CostCalculator;