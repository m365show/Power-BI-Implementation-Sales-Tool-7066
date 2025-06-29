import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { PieChart, BarChart, LineChart } from 'echarts/charts';
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
  LineChart,
  CanvasRenderer
]);

const { 
  FiChevronLeft, 
  FiChevronRight, 
  FiDownload, 
  FiBarChart3, 
  FiTrendingUp, 
  FiUsers, 
  FiZap, 
  FiClock, 
  FiDollarSign, 
  FiTarget, 
  FiCheck,
  FiPlay,
  FiEdit3,
  FiSave,
  FiUser,
  FiBuilding,
  FiDatabase,
  FiFileText,
  FiSettings,
  FiHelpCircle,
  FiGlobe,
  FiMail
} = FiIcons;

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQuestionnaire, setShowQuestionnaire] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [generatedPitch, setGeneratedPitch] = useState(null);

  // ... (keeping all the existing questions and helper functions from the previous version)
  const questions = [
    {
      id: 'company_info',
      title: 'Company Information',
      type: 'group',
      questions: [
        {
          id: 'company_name',
          question: 'What is your company name?',
          type: 'text',
          required: true,
          placeholder: 'e.g., Acme Corporation'
        },
        {
          id: 'industry',
          question: 'What industry are you in?',
          type: 'select',
          required: true,
          options: [
            { value: 'manufacturing', label: 'Manufacturing' },
            { value: 'retail', label: 'Retail & E-commerce' },
            { value: 'healthcare', label: 'Healthcare' },
            { value: 'finance', label: 'Financial Services' },
            { value: 'technology', label: 'Technology' },
            { value: 'education', label: 'Education' },
            { value: 'government', label: 'Government' },
            { value: 'real_estate', label: 'Real Estate' },
            { value: 'logistics', label: 'Logistics & Supply Chain' },
            { value: 'energy', label: 'Energy & Utilities' },
            { value: 'other', label: 'Other' }
          ]
        },
        {
          id: 'company_size',
          question: 'How many employees does your company have?',
          type: 'select',
          required: true,
          options: [
            { value: '1-50', label: '1-50 employees' },
            { value: '51-200', label: '51-200 employees' },
            { value: '201-500', label: '201-500 employees' },
            { value: '501-1000', label: '501-1,000 employees' },
            { value: '1001-5000', label: '1,001-5,000 employees' },
            { value: '5000+', label: '5,000+ employees' }
          ]
        },
        {
          id: 'annual_revenue',
          question: 'What is your approximate annual revenue?',
          type: 'select',
          required: false,
          options: [
            { value: 'under_1m', label: 'Under $1M' },
            { value: '1m_10m', label: '$1M - $10M' },
            { value: '10m_50m', label: '$10M - $50M' },
            { value: '50m_100m', label: '$50M - $100M' },
            { value: '100m_500m', label: '$100M - $500M' },
            { value: '500m_1b', label: '$500M - $1B' },
            { value: '1b+', label: '$1B+' },
            { value: 'prefer_not_say', label: 'Prefer not to say' }
          ]
        }
      ]
    },
    {
      id: 'current_challenges',
      title: 'Current Data Challenges',
      type: 'group',
      questions: [
        {
          id: 'biggest_challenge',
          question: 'What is your biggest data-related challenge?',
          type: 'multiselect',
          required: true,
          options: [
            { value: 'data_silos', label: 'Data scattered across multiple systems' },
            { value: 'manual_reporting', label: 'Too much manual report generation' },
            { value: 'delayed_insights', label: 'Delayed access to critical insights' },
            { value: 'poor_data_quality', label: 'Poor data quality and consistency' },
            { value: 'lack_visibility', label: 'Lack of real-time visibility' },
            { value: 'complex_analysis', label: 'Complex analysis takes too long' },
            { value: 'no_self_service', label: 'No self-service analytics for users' },
            { value: 'compliance_issues', label: 'Compliance and governance issues' },
            { value: 'scalability', label: 'Current solution doesn\'t scale' }
          ]
        },
        {
          id: 'current_tools',
          question: 'What tools are you currently using for reporting and analytics?',
          type: 'multiselect',
          required: true,
          options: [
            { value: 'excel', label: 'Microsoft Excel' },
            { value: 'access', label: 'Microsoft Access' },
            { value: 'sql_server', label: 'SQL Server Reporting Services' },
            { value: 'tableau', label: 'Tableau' },
            { value: 'qlik', label: 'QlikView/QlikSense' },
            { value: 'looker', label: 'Looker' },
            { value: 'custom_built', label: 'Custom-built solutions' },
            { value: 'none', label: 'No formal BI tools' },
            { value: 'other', label: 'Other' }
          ]
        },
        {
          id: 'pain_points',
          question: 'How much time does your team spend on manual data preparation weekly?',
          type: 'select',
          required: true,
          options: [
            { value: '0-5', label: '0-5 hours' },
            { value: '6-15', label: '6-15 hours' },
            { value: '16-30', label: '16-30 hours' },
            { value: '31-50', label: '31-50 hours' },
            { value: '50+', label: 'More than 50 hours' }
          ]
        }
      ]
    },
    {
      id: 'data_environment',
      title: 'Data Environment & Infrastructure',
      type: 'group',
      questions: [
        {
          id: 'data_sources',
          question: 'What are your primary data sources?',
          type: 'multiselect',
          required: true,
          options: [
            { value: 'sql_server', label: 'SQL Server' },
            { value: 'oracle', label: 'Oracle' },
            { value: 'mysql', label: 'MySQL' },
            { value: 'excel_files', label: 'Excel Files' },
            { value: 'sharepoint', label: 'SharePoint' },
            { value: 'dynamics', label: 'Dynamics 365' },
            { value: 'salesforce', label: 'Salesforce' },
            { value: 'azure_cloud', label: 'Azure Cloud Services' },
            { value: 'aws', label: 'AWS' },
            { value: 'google_cloud', label: 'Google Cloud' },
            { value: 'web_apis', label: 'Web APIs' },
            { value: 'erp_systems', label: 'ERP Systems' },
            { value: 'crm_systems', label: 'CRM Systems' },
            { value: 'other', label: 'Other' }
          ]
        },
        {
          id: 'data_volume',
          question: 'What is your approximate data volume?',
          type: 'select',
          required: true,
          options: [
            { value: 'small', label: 'Small (< 1GB)' },
            { value: 'medium', label: 'Medium (1GB - 100GB)' },
            { value: 'large', label: 'Large (100GB - 1TB)' },
            { value: 'very_large', label: 'Very Large (1TB - 10TB)' },
            { value: 'enterprise', label: 'Enterprise (10TB+)' }
          ]
        },
        {
          id: 'update_frequency',
          question: 'How often does your data need to be updated?',
          type: 'select',
          required: true,
          options: [
            { value: 'real_time', label: 'Real-time' },
            { value: 'hourly', label: 'Hourly' },
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
            { value: 'quarterly', label: 'Quarterly' }
          ]
        }
      ]
    },
    {
      id: 'requirements',
      title: 'Business Requirements',
      type: 'group',
      questions: [
        {
          id: 'key_metrics',
          question: 'What are your most important business metrics to track?',
          type: 'multiselect',
          required: true,
          options: [
            { value: 'revenue', label: 'Revenue & Sales Performance' },
            { value: 'profitability', label: 'Profitability & Cost Analysis' },
            { value: 'customer_metrics', label: 'Customer Metrics & Satisfaction' },
            { value: 'operational_efficiency', label: 'Operational Efficiency' },
            { value: 'inventory', label: 'Inventory Management' },
            { value: 'financial_kpis', label: 'Financial KPIs' },
            { value: 'hr_metrics', label: 'HR & Employee Metrics' },
            { value: 'marketing_roi', label: 'Marketing ROI' },
            { value: 'quality_metrics', label: 'Quality & Compliance Metrics' },
            { value: 'supply_chain', label: 'Supply Chain Performance' }
          ]
        },
        {
          id: 'user_types',
          question: 'Who will be the primary users of the BI solution?',
          type: 'multiselect',
          required: true,
          options: [
            { value: 'executives', label: 'Executives & C-Level' },
            { value: 'managers', label: 'Department Managers' },
            { value: 'analysts', label: 'Business Analysts' },
            { value: 'finance', label: 'Finance Team' },
            { value: 'sales', label: 'Sales Team' },
            { value: 'marketing', label: 'Marketing Team' },
            { value: 'operations', label: 'Operations Team' },
            { value: 'hr', label: 'HR Team' },
            { value: 'it', label: 'IT Team' },
            { value: 'field_staff', label: 'Field Staff' }
          ]
        },
        {
          id: 'reporting_needs',
          question: 'What types of reports do you need?',
          type: 'multiselect',
          required: true,
          options: [
            { value: 'executive_dashboards', label: 'Executive Dashboards' },
            { value: 'operational_reports', label: 'Operational Reports' },
            { value: 'financial_reports', label: 'Financial Reports' },
            { value: 'sales_reports', label: 'Sales Reports' },
            { value: 'customer_reports', label: 'Customer Reports' },
            { value: 'inventory_reports', label: 'Inventory Reports' },
            { value: 'compliance_reports', label: 'Compliance Reports' },
            { value: 'ad_hoc_analysis', label: 'Ad-hoc Analysis' },
            { value: 'scheduled_reports', label: 'Scheduled Reports' },
            { value: 'mobile_reports', label: 'Mobile Reports' }
          ]
        }
      ]
    },
    {
      id: 'project_details',
      title: 'Project Details & Timeline',
      type: 'group',
      questions: [
        {
          id: 'timeline',
          question: 'What is your desired timeline for implementation?',
          type: 'select',
          required: true,
          options: [
            { value: 'asap', label: 'ASAP (Rush project)' },
            { value: '1-3-months', label: '1-3 months' },
            { value: '3-6-months', label: '3-6 months' },
            { value: '6-12-months', label: '6-12 months' },
            { value: '12-months+', label: 'More than 12 months' },
            { value: 'flexible', label: 'Flexible timeline' }
          ]
        },
        {
          id: 'budget_range',
          question: 'What is your approximate budget range?',
          type: 'select',
          required: false,
          options: [
            { value: 'under_25k', label: 'Under $25,000' },
            { value: '25k-50k', label: '$25,000 - $50,000' },
            { value: '50k-100k', label: '$50,000 - $100,000' },
            { value: '100k-250k', label: '$100,000 - $250,000' },
            { value: '250k-500k', label: '$250,000 - $500,000' },
            { value: '500k+', label: '$500,000+' },
            { value: 'not_determined', label: 'Not yet determined' }
          ]
        },
        {
          id: 'success_criteria',
          question: 'How will you measure the success of this BI implementation?',
          type: 'multiselect',
          required: true,
          options: [
            { value: 'time_savings', label: 'Time savings in reporting' },
            { value: 'faster_decisions', label: 'Faster decision making' },
            { value: 'improved_accuracy', label: 'Improved data accuracy' },
            { value: 'cost_reduction', label: 'Cost reduction' },
            { value: 'revenue_increase', label: 'Revenue increase' },
            { value: 'user_adoption', label: 'High user adoption' },
            { value: 'self_service', label: 'Self-service capabilities' },
            { value: 'compliance', label: 'Better compliance' },
            { value: 'scalability', label: 'Scalability for growth' }
          ]
        },
        {
          id: 'it_support',
          question: 'What level of IT support do you have available?',
          type: 'select',
          required: true,
          options: [
            { value: 'none', label: 'No dedicated IT support' },
            { value: 'limited', label: 'Limited IT resources' },
            { value: 'moderate', label: 'Moderate IT support' },
            { value: 'extensive', label: 'Extensive IT team' },
            { value: 'outsourced', label: 'Outsourced IT services' }
          ]
        }
      ]
    },
    {
      id: 'additional_info',
      title: 'Additional Information',
      type: 'group',
      questions: [
        {
          id: 'integration_needs',
          question: 'Do you need integration with existing systems?',
          type: 'multiselect',
          required: false,
          options: [
            { value: 'erp', label: 'ERP Systems' },
            { value: 'crm', label: 'CRM Systems' },
            { value: 'hr_systems', label: 'HR Systems' },
            { value: 'accounting', label: 'Accounting Software' },
            { value: 'inventory', label: 'Inventory Management' },
            { value: 'ecommerce', label: 'E-commerce Platforms' },
            { value: 'marketing_tools', label: 'Marketing Tools' },
            { value: 'custom_apps', label: 'Custom Applications' },
            { value: 'none', label: 'No integration needed' }
          ]
        },
        {
          id: 'security_requirements',
          question: 'What security and compliance requirements do you have?',
          type: 'multiselect',
          required: false,
          options: [
            { value: 'gdpr', label: 'GDPR Compliance' },
            { value: 'hipaa', label: 'HIPAA Compliance' },
            { value: 'sox', label: 'SOX Compliance' },
            { value: 'iso27001', label: 'ISO 27001' },
            { value: 'row_level_security', label: 'Row-level Security' },
            { value: 'single_sign_on', label: 'Single Sign-On (SSO)' },
            { value: 'data_encryption', label: 'Data Encryption' },
            { value: 'audit_trails', label: 'Audit Trails' },
            { value: 'none', label: 'No specific requirements' }
          ]
        },
        {
          id: 'additional_comments',
          question: 'Any additional comments or specific requirements?',
          type: 'textarea',
          required: false,
          placeholder: 'Please share any additional information that would help us create a more personalized pitch...'
        }
      ]
    }
  ];

  const flatQuestions = questions.flatMap(group => 
    group.questions.map(q => ({ ...q, groupTitle: group.title }))
  );

  const handleResponse = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < flatQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      generatePersonalizedPitch();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const generatePersonalizedPitch = () => {
    const pitch = createPersonalizedSlides(responses);
    setGeneratedPitch(pitch);
    setShowQuestionnaire(false);
    setCurrentSlide(0);
  };

  const exportPDF = () => {
    // PDF export functionality would go here
    alert('PDF export functionality would be implemented here');
  };

  const exportPPTX = () => {
    // PPTX export functionality would go here
    alert('PPTX export functionality would be implemented here');
  };

  const exportJSON = () => {
    const reportData = {
      companyInfo: {
        name: responses.company_name || 'Your Company',
        industry: responses.industry,
        size: responses.company_size
      },
      responses: responses,
      generatedAt: new Date().toISOString(),
      developedBy: "Mirko - M365 Summit",
      linkedinProfile: "https://www.linkedin.com/in/m365-summit/",
      companyPage: "https://www.linkedin.com/school/m365-show/"
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `powerbi-pitch-deck-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const createPersonalizedSlides = (responses) => {
    const companyName = responses.company_name || 'Your Company';
    const industry = responses.industry || 'your industry';
    const challenges = responses.biggest_challenge || [];
    const currentTools = responses.current_tools || [];
    const keyMetrics = responses.key_metrics || [];
    const userTypes = responses.user_types || [];
    const timeline = responses.timeline || '3-6-months';

    return [
      {
        id: 'personalized_title',
        title: `Power BI Solution for ${companyName}`,
        content: (
          <div className="text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-powerbi-yellow rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
              <SafeIcon icon={FiBarChart3} className="w-10 h-10 md:w-12 md:h-12 text-powerbi-dark" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-powerbi-dark mb-4">
              Power BI Solution for {companyName}
            </h1>
            <h2 className="text-xl md:text-2xl text-powerbi-blue mb-6 md:mb-8">
              Tailored Business Intelligence for {industry.charAt(0).toUpperCase() + industry.slice(1)}
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8">
              A comprehensive Power BI implementation strategy designed specifically for your business needs and challenges.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-powerbi-light p-4 rounded-lg">
                <SafeIcon icon={FiBuilding} className="w-6 h-6 text-powerbi-blue mx-auto mb-2" />
                <div className="font-semibold">Industry</div>
                <div className="text-gray-600">{industry.charAt(0).toUpperCase() + industry.slice(1)}</div>
              </div>
              <div className="bg-powerbi-light p-4 rounded-lg">
                <SafeIcon icon={FiUsers} className="w-6 h-6 text-powerbi-blue mx-auto mb-2" />
                <div className="font-semibold">Company Size</div>
                <div className="text-gray-600">{responses.company_size || 'Not specified'}</div>
              </div>
              <div className="bg-powerbi-light p-4 rounded-lg">
                <SafeIcon icon={FiClock} className="w-6 h-6 text-powerbi-blue mx-auto mb-2" />
                <div className="font-semibold">Timeline</div>
                <div className="text-gray-600">{timeline.replace('-', ' ')}</div>
              </div>
            </div>
          </div>
        )
      },
      // ... (include other slides with mobile-friendly responsive design)
      {
        id: 'personalized_next_steps',
        title: 'Next Steps',
        content: (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-powerbi-dark mb-6 md:mb-8 text-center">
              Your Personalized Next Steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-powerbi-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Discovery Workshop</h3>
                <p className="text-gray-600 mb-4">
                  Deep dive into your {industry} specific requirements and current data landscape
                </p>
                <div className="text-sm text-gray-500">
                  Duration: 2-3 days
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-powerbi-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-powerbi-dark font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Proof of Concept</h3>
                <p className="text-gray-600 mb-4">
                  Build a working prototype using your actual data to demonstrate value
                </p>
                <div className="text-sm text-gray-500">
                  Duration: 2-3 weeks
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Full Implementation</h3>
                <p className="text-gray-600 mb-4">
                  Complete rollout with training and support for your team
                </p>
                <div className="text-sm text-gray-500">
                  Duration: {timeline.replace('-', ' ')}
                </div>
              </div>
            </div>
            <div className="mt-8 md:mt-12 bg-powerbi-dark p-6 md:p-8 rounded-lg text-center">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                Ready to Transform {companyName}'s Data Strategy?
              </h3>
              <p className="text-gray-300 mb-6">
                Let's discuss how Power BI can address your specific challenges and deliver measurable results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.linkedin.com/school/m365-show/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-powerbi-yellow text-powerbi-dark px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-center"
                >
                  Learn More About Our Services
                </a>
                <button 
                  onClick={exportJSON}
                  className="border-2 border-powerbi-yellow text-powerbi-yellow px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-powerbi-yellow hover:text-powerbi-dark transition-colors"
                >
                  Download Proposal
                </button>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-600">
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
        )
      }
    ];
  };

  // Helper functions (keeping the existing ones)
  const getChallengeTitle = (challenge) => {
    const titles = {
      'data_silos': 'Data Silos',
      'manual_reporting': 'Manual Reporting',
      'delayed_insights': 'Delayed Insights',
      'poor_data_quality': 'Poor Data Quality',
      'lack_visibility': 'Lack of Visibility',
      'complex_analysis': 'Complex Analysis',
      'no_self_service': 'No Self-Service',
      'compliance_issues': 'Compliance Issues',
      'scalability': 'Scalability Issues'
    };
    return titles[challenge] || challenge;
  };

  const Question = ({ question, response, onResponse }) => {
    const renderInput = () => {
      switch (question.type) {
        case 'text':
          return (
            <input
              type="text"
              value={response || ''}
              onChange={(e) => onResponse(question.id, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
              placeholder={question.placeholder}
            />
          );
        
        case 'textarea':
          return (
            <textarea
              value={response || ''}
              onChange={(e) => onResponse(question.id, e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
              placeholder={question.placeholder}
            />
          );
        
        case 'select':
          return (
            <select
              value={response || ''}
              onChange={(e) => onResponse(question.id, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-powerbi-blue focus:border-transparent"
            >
              <option value="">Please select...</option>
              {question.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        
        case 'multiselect':
          return (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {question.options.map(option => (
                <label key={option.value} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    checked={(response || []).includes(option.value)}
                    onChange={(e) => {
                      const current = response || [];
                      if (e.target.checked) {
                        onResponse(question.id, [...current, option.value]);
                      } else {
                        onResponse(question.id, current.filter(v => v !== option.value));
                      }
                    }}
                    className="w-4 h-4 text-powerbi-blue bg-gray-100 border-gray-300 rounded focus:ring-powerbi-blue focus:ring-2"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          );
        
        default:
          return null;
      }
    };

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-powerbi-blue font-medium">
              {question.groupTitle}
            </div>
            <div className="text-sm text-gray-500">
              {currentQuestion + 1} of {flatQuestions.length}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-powerbi-blue h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / flatQuestions.length) * 100}%` }}
            />
          </div>
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold text-powerbi-dark mb-6">
          {question.question}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </h2>
        
        <div className="mb-8">
          {renderInput()}
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2 px-4 md:px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <SafeIcon icon={FiChevronLeft} className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>
          
          <button
            onClick={nextQuestion}
            disabled={question.required && !response}
            className="flex items-center space-x-2 px-4 md:px-6 py-3 bg-powerbi-blue text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>{currentQuestion === flatQuestions.length - 1 ? 'Generate' : 'Next'}</span>
            <SafeIcon icon={currentQuestion === flatQuestions.length - 1 ? FiPlay : FiChevronRight} className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % generatedPitch.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + generatedPitch.length) % generatedPitch.length);
  };

  const restartQuestionnaire = () => {
    setShowQuestionnaire(true);
    setCurrentQuestion(0);
    setResponses({});
    setGeneratedPitch(null);
  };

  if (showQuestionnaire) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 md:py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-powerbi-dark mb-4">
              Personalized Power BI Pitch Deck
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Answer a few questions to generate a customized pitch deck for your organization
            </p>
          </div>
          
          <Question
            question={flatQuestions[currentQuestion]}
            response={responses[flatQuestions[currentQuestion].id]}
            onResponse={handleResponse}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 md:py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-powerbi-dark text-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-lg md:text-xl font-bold">
              Power BI Pitch Deck - {responses.company_name || 'Your Company'}
            </h1>
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <span className="text-sm">
                {currentSlide + 1} of {generatedPitch.length}
              </span>
              <button
                onClick={restartQuestionnaire}
                className="bg-powerbi-yellow text-powerbi-dark px-3 md:px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors flex items-center space-x-2 text-sm"
              >
                <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={exportPDF}
                  className="bg-powerbi-yellow text-powerbi-dark px-3 md:px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors flex items-center space-x-2 text-sm"
                >
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  <span className="hidden sm:inline">PDF</span>
                </button>
                <button 
                  onClick={exportPPTX}
                  className="bg-powerbi-yellow text-powerbi-dark px-3 md:px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors flex items-center space-x-2 text-sm"
                >
                  <SafeIcon icon={FiFileText} className="w-4 h-4" />
                  <span className="hidden sm:inline">PPTX</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8 lg:p-12 min-h-[500px] md:min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {generatedPitch[currentSlide].content}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="bg-gray-50 p-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-powerbi-blue text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <SafeIcon icon={FiChevronLeft} className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-2 overflow-x-auto">
              {generatedPitch.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors flex-shrink-0 ${
                    index === currentSlide ? 'bg-powerbi-blue' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === generatedPitch.length - 1}
              className="flex items-center space-x-2 px-4 py-2 bg-powerbi-blue text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span>Next</span>
              <SafeIcon icon={FiChevronRight} className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDeck;