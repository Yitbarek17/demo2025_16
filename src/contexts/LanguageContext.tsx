import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'am';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Add this type for translation objects
interface TranslationMap {
  [key: string]: string;
}

const translations: { en: TranslationMap; am: TranslationMap } = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.projects': 'Projects',
    'nav.analytics': 'Analytics',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.total': 'Total',
    'common.male': 'Male',
    'common.female': 'Female',
    'common.employees': 'Employees',
    'common.projects': 'Projects',
    'common.status': 'Status',
    'common.sector': 'Sector',
    'common.region': 'Region',
    'common.date': 'Date',
    'common.contact': 'Contact',
    'common.email': 'Email',
    'common.phone': 'Phone',
    'common.website': 'Website',
    
    // Authentication
    'auth.login': 'Login',
    'auth.logout': 'Logout',
    'auth.username': 'Username',
    'auth.password': 'Password',
    'auth.loginButton': 'Sign In',
    'auth.loginError': 'Invalid username or password',
    'auth.welcome': 'Welcome back!',
    'auth.demoCredentials': 'Demo Credentials',
    'auth.demoUsername': 'Username: demo',
    'auth.demoPassword': 'Password: demo123',
    
    // App Title
    'app.title': 'Ethiopian Project Management System',
    'app.subtitle': 'Comprehensive solution for managing and analyzing project data',
    
    // Dashboard
    'dashboard.totalProjects': 'Total Projects',
    'dashboard.totalEmployees': 'Total Employees',
    'dashboard.completedProjects': 'Completed Projects',
    'dashboard.inProgress': 'In Progress',
    'dashboard.projectsBySector': 'Projects by Sector',
    'dashboard.statusDistribution': 'Project Status Distribution',
    'dashboard.regionalDistribution': 'Regional Distribution',
    'dashboard.genderDistribution': 'Gender Distribution',
    
    // Projects
    'projects.addProject': 'Add Project',
    'projects.editProject': 'Edit Project',
    'projects.deleteConfirm': 'Are you sure you want to delete this project?',
    'projects.company': 'Company',
    'projects.owner': 'Owner',
    'projects.location': 'Location',
    'projects.actions': 'Actions',
    'projects.noProjects': 'No projects found matching your criteria',
    'projects.companyName': 'Company Name',
    'projects.projectDetails': 'Project Details',
    'projects.contactInfo': 'Contact Information',
    'projects.teamAdvisors': 'Team & Advisors',
    'projects.employeeStats': 'Employee Statistics',
    
    // Analytics
    'analytics.overview': 'Overview',
    'analytics.sectors': 'Sector Analysis',
    'analytics.regional': 'Regional Analysis',
    'analytics.workforce': 'Workforce Analytics',
    'analytics.performance': 'Performance Metrics',
    'analytics.avgEmployees': 'Average Employees per Project',
    'analytics.genderRatio': 'Gender Ratio (M:F)',
    'analytics.activeRegions': 'Active Regions',
    'analytics.sectorsRepresented': 'Sectors Represented',
    
    // Form Fields
    'form.required': 'Required',
    'form.companyName': 'Company Name',
    'form.sector': 'Sector',
    'form.subSector': 'Sub-Sector',
    'form.region': 'Region',
    'form.zone': 'Zone',
    'form.woreda': 'Woreda',
    'form.approvalDate': 'Approval Date',
    'form.owner': 'Owner',
    'form.advisorCompany': 'Advisor Company',
    'form.evaluator': 'Evaluator',
    'form.grantedBy': 'Granted By',
    'form.contactPerson': 'Contact Person',
    'form.ownerPhone': 'Phone Number',
    'form.companyEmail': 'Company Email',
    'form.companyWebsite': 'Company Website',
    'form.projectStatus': 'Project Status',
    'form.employeesMale': 'Male Employees',
    'form.employeesFemale': 'Female Employees',
    'form.employeesTotal': 'Total Employees',
    'form.employeeInfo': 'Employee Information',
    'form.createProject': 'Create Project',
    'form.updateProject': 'Update Project',
    'form.saving': 'Saving...',
    
    // Homepage
    'home.welcome': 'Welcome to',
    'home.subtitle': 'Comprehensive solution for managing and analyzing project data across Ethiopia',
    'home.description': 'Track, analyze, and manage projects across multiple sectors with powerful analytics and insights.',
    'home.features': 'Key Features',
    'home.projectManagement': 'Project Management',
    'home.projectManagementDesc': 'Complete CRUD operations for managing company and project data.',
    'home.advancedAnalytics': 'Advanced Analytics',
    'home.advancedAnalyticsDesc': 'Comprehensive analytics with sector, regional, and workforce insights.',
    'home.workforceTracking': 'Workforce Tracking',
    'home.workforceTrackingDesc': 'Monitor employee distribution and team composition.',
    'home.regionalCoverage': 'Regional Coverage',
    'home.regionalCoverageDesc': 'Track projects across all regions of Ethiopia.',
    'home.getStarted': 'Get Started',
    'home.viewDashboard': 'View Dashboard',
    'home.manageProjects': 'Manage Projects',
    'home.viewAnalytics': 'View Analytics',
  },
  am: {
    // Navigation
    'nav.home': 'መነሻ',
    'nav.dashboard': 'ዳሽቦርድ',
    'nav.projects': 'ፕሮጀክቶች',
    'nav.analytics': 'ትንተና',
    //gender
    'form.employeesMale': 'ወንድ ሰራተኞች ',
    'form.employeesFemale': 'ሴት ሰራተኞች',
    // Common
    'common.loading': 'እየተጫነ ነው...',
    'common.save': 'አስቀምጥ',
    'common.cancel': 'ሰርዝ',
    'common.edit': 'አርም',
    'common.delete': 'ሰርዝ',
    'common.view': 'ይመልከቱ',
    'common.add': 'ጨምር',
    'common.search': 'ፈልግ',
    'common.filter': 'ማጣሪያ',
    'common.total': 'ጠቅላላ',
    'common.male': 'ወንድ',
    'common.female': 'ሴት',
    'common.employees': 'ሰራተኞች',
    'common.projects': 'ፕሮጀክቶች',
    'common.status': 'ሁኔታ',
    'common.sector': 'ዘርፍ',
    'common.region': 'ክልል',
    'common.date': 'ቀን',
    'common.contact': 'ግንኙነት',
    'common.email': 'ኢሜይል',
    'common.phone': 'ስልክ',
    'common.website': 'ድረ-ገጽ',
    
    // Authentication
    'auth.login': 'ግባ',
    'auth.logout': 'ውጣ',
    'auth.username': 'የተጠቃሚ ስም',
    'auth.password': 'የይለፍ ቃል',
    'auth.loginButton': 'ግባ',
    'auth.loginError': 'የተሳሳተ የተጠቃሚ ስም ወይም የይለፍ ቃል',
    'auth.welcome': 'እንኳን ደህና መጡ!',
    'auth.demoCredentials': 'የሙከራ መረጃዎች',
    'auth.demoUsername': 'የተጠቃሚ ስም: demo',
    'auth.demoPassword': 'የይለፍ ቃል: demo123',
    
    // App Title
    'app.title': 'የፕሮጀክት አስተዳደር ስርዓት',
    'app.subtitle': 'የፕሮጀክት መረጃዎችን ለማስተዳደር እና ለመተንተን ሁሉን አቀፍ መፍትሄ',
    
    // Dashboard
    'dashboard.totalProjects': 'ጠቅላላ ፕሮጀክቶች',
    'dashboard.totalEmployees': 'ጠቅላላ ሰራተኞች',
    'dashboard.completedProjects': 'የተጠናቀቁ ፕሮጀክቶች',
    'dashboard.inProgress': 'በሂደት ላይ',
    'dashboard.projectsBySector': 'በዘርፍ የተከፋፈሉ ፕሮጀክቶች',
    'dashboard.statusDistribution': 'የፕሮጀክት ሁኔታ ስርጭት',
    'dashboard.regionalDistribution': 'የክልል ስርጭት',
    'dashboard.genderDistribution': 'የፆታ ስርጭት',
    
    // Projects
    'projects.addProject': 'ፕሮጀክት ጨምር',
    'projects.editProject': 'ፕሮጀክት አርም',
    'projects.deleteConfirm': 'እርግጠኛ ነዎት ይህን ፕሮጀክት መሰረዝ ይፈልጋሉ?',
    'projects.company': 'ኩባንያ',
    'projects.owner': 'ባለቤት',
    'projects.location': 'አካባቢ',
    'projects.actions': 'እርምጃዎች',
    'projects.noProjects': 'ከመመዘኛዎችዎ ጋር የሚዛመድ ፕሮጀክት አልተገኘም',
    'projects.companyName': 'የኩባንያ ስም',
    'projects.projectDetails': 'የፕሮጀክት ዝርዝሮች',
    'projects.contactInfo': 'የግንኙነት መረጃ',
    'projects.teamAdvisors': 'ቡድን እና አማካሪዎች',
    'projects.employeeStats': 'የሰራተኛ ስታቲስቲክስ',
    
    // Analytics
    'analytics.overview': 'አጠቃላይ እይታ',
    'analytics.sectors': 'የዘርፍ ትንተና',
    'analytics.regional': 'የክልል ትንተና',
    'analytics.workforce': 'የሰራተኛ ትንተና',
    'analytics.performance': 'የአፈጻጸም መለኪያዎች',
    'analytics.avgEmployees': 'አማካይ ሰራተኞች በፕሮጀክት',
    'analytics.genderRatio': 'የፆታ ጥምርታ (ወ:ሴ)',
    'analytics.activeRegions': 'ንቁ ክልሎች',
    'analytics.sectorsRepresented': 'የተወከሉ ዘርፎች',
    
    // Form Fields
    'form.required': 'ያስፈልጋል',
    'form.companyName': 'የኩባንያ ስም',
    'form.sector': 'ዘርፍ',
    'form.subSector': 'ንዑስ ዘርፍ',
    'form.region': 'ክልል',
    'form.zone': 'ዞን',
    'form.woreda': 'ወረዳ',
    'form.approvalDate': 'የማጽደቅ ቀን',
    'form.owner': 'ባለቤት',
    'form.advisorCompany': 'አማካሪ ኩባንያ',
    'form.evaluator': 'ገምጋሚ',
    'form.grantedBy': 'የተሰጠ በ',
    'form.contactPerson': 'የግንኙነት ሰው',
    'form.ownerPhone': 'የስልክ ቁጥር',
    'form.companyEmail': 'የኩባንያ ኢሜይል',
    'form.companyWebsite': 'የኩባንያ ድረ-ገጽ',
    'form.projectStatus': 'የፕሮጀክት ሁኔታ',
   
    'form.employeesTotal': 'ጠቅላላ ሰራተኞች',
    'form.employeeInfo': 'የሰራተኛ መረጃ',
    'form.createProject': 'ፕሮጀክት ፍጠር',
    'form.updateProject': 'ፕሮጀክት አዘምን',
    'form.saving': 'እየተቀመጠ ነው...',
    
    // Homepage
    'home.welcome': 'እንኳን ደህና መጡ ወደ',
    'home.subtitle': 'በኢትዮጵያ ውስጥ የፕሮጀክት መረጃዎችን ለማስተዳደር እና ለመተንተን ሁሉን አቀፍ መፍትሄ',
    'home.description': 'በተለያዩ ዘርፎች ውስጥ ያሉ ፕሮጀክቶችን ይከታተሉ፣ ይተንትኑ እና ያስተዳድሩ።',
    'home.features': 'ዋና ባህሪያት',
    'home.projectManagement': 'የፕሮጀክት አስተዳደር',
    'home.projectManagementDesc': 'ለኩባንያ እና ፕሮጀክት መረጃዎች ሙሉ CRUD ክወናዎች።',
    'home.advancedAnalytics': 'የላቀ ትንተና',
    'home.advancedAnalyticsDesc': 'የዘርፍ፣ የክልል እና የሰራተኛ ግንዛቤዎች ያለው ሁሉን አቀፍ ትንተና።',
    'home.workforceTracking': 'የሰራተኛ ክትትል',
    'home.workforceTrackingDesc': 'የሰራተኞች ስርጭት እና የቡድን ስብጥር ይከታተሉ።',
    'home.regionalCoverage': 'የክልል ሽፋን',
    'home.regionalCoverageDesc': 'በኢትዮጵያ ሁሉም ክልሎች ውስጥ ያሉ ፕሮጀክቶችን ይከታተሉ።',
    'home.getStarted': 'ይጀምሩ',
    'home.viewDashboard': 'ዳሽቦርድ ይመልከቱ',
    'home.manageProjects': 'ፕሮጀክቶችን ያስተዳድሩ',
    'home.viewAnalytics': 'ትንተና ይመልከቱ',
  }
};

// Add missing Amharic keys after definition
Object.keys(translations.en).forEach(key => {
  if (!(key in translations.am)) {
    translations.am[key] = translations.en[key];
  }
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'am')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};