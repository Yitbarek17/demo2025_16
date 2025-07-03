import React from 'react';
import { BarChart3, Building2, Users, Globe, TrendingUp, Award, Target, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface HomepageProps {
  onNavigate: (tab: string) => void;
}

const Homepage: React.FC<HomepageProps> = ({ onNavigate }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const StatCard = ({ value, label, icon: Icon }: { value: string; label: string; icon: any }) => (
    <div className={`p-6 rounded-xl shadow-lg border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
      isDark 
        ? 'bg-gray-900/80 border-gray-700 backdrop-blur-sm' 
        : 'bg-white/80 border-gray-200 backdrop-blur-sm'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <div className={`text-3xl font-bold mb-1 transition-colors ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            {value}
          </div>
          <div className={`text-sm transition-colors ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {label}
          </div>
        </div>
        <Icon className={`h-8 w-8 transition-colors ${
          isDark ? 'text-white' : 'text-black'
        }`} />
      </div>
    </div>
  );

  const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
    <div className={`p-6 rounded-xl shadow-lg border transition-all duration-300 hover:scale-105 hover:shadow-xl group ${
      isDark 
        ? 'bg-gray-900/90 border-gray-700 backdrop-blur-sm' 
        : 'bg-white/90 border-gray-200 backdrop-blur-sm'
    }`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
            isDark ? 'bg-white text-black' : 'bg-black text-white'
          }`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <div>
          <h3 className={`text-lg font-semibold mb-2 transition-colors ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            {title}
          </h3>
          <p className={`text-sm leading-relaxed transition-colors ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );

  const ActionButton = ({ onClick, icon: Icon, title, variant = 'primary' }: { 
    onClick: () => void; 
    icon: any; 
    title: string; 
    variant?: 'primary' | 'secondary' 
  }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
        variant === 'primary'
          ? isDark 
            ? 'bg-white text-black shadow-lg hover:shadow-xl hover:bg-gray-100' 
            : 'bg-black text-white shadow-lg hover:shadow-xl hover:bg-gray-800'
          : isDark 
            ? 'bg-gray-800 text-white border border-gray-600 hover:bg-gray-700 hover:shadow-lg' 
            : 'bg-white text-black border border-gray-200 hover:bg-gray-50 hover:shadow-lg'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{title}</span>
    </button>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-black via-gray-900 to-black' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className={`absolute inset-0 transition-opacity duration-300 ${
          isDark 
            ? 'bg-gradient-to-r from-white/5 to-gray-300/5' 
            : 'bg-gradient-to-r from-black/5 to-gray-600/5'
        }`}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="mb-8 animate-fadeIn">
              <p className={`text-lg mb-2 transition-colors ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {t('home.welcome')}
              </p>
              <h1 className={`text-5xl md:text-6xl font-bold mb-6 transition-colors ${
                isDark ? 'text-white' : 'text-black'
              }`}>
                {t('app.title')}
              </h1>
              <p className={`text-xl max-w-3xl mx-auto mb-8 leading-relaxed transition-colors ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {t('home.subtitle')}
              </p>
              <p className={`max-w-4xl mx-auto mb-12 leading-relaxed transition-colors ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {t('home.description')}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-4 mb-16 animate-slideUp">
              <ActionButton
                onClick={() => onNavigate('dashboard')}
                icon={BarChart3}
                title={t('home.viewDashboard')}
                variant="primary"
              />
              <ActionButton
                onClick={() => onNavigate('projects')}
                icon={Building2}
                title={t('home.manageProjects')}
                variant="secondary"
              />
              <ActionButton
                onClick={() => onNavigate('analytics')}
                icon={TrendingUp}
                title={t('home.viewAnalytics')}
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className={`text-3xl font-bold mb-4 transition-colors ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            {t('analytics.overview')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slideUp">
          <StatCard value="100+" label={t('common.projects')} icon={Building2} />
          <StatCard value="3" label={t('analytics.sectorsRepresented')} icon={Target} />
          <StatCard value="14" label={t('analytics.activeRegions')} icon={Globe} />
          <StatCard value="5" label={t('nav.analytics')} icon={BarChart3} />
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className={`text-3xl font-bold mb-4 transition-colors ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            {t('home.features')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slideUp">
          <FeatureCard
            icon={Building2}
            title={t('home.projectManagement')}
            description={t('home.projectManagementDesc')}
          />
          <FeatureCard
            icon={BarChart3}
            title={t('home.advancedAnalytics')}
            description={t('home.advancedAnalyticsDesc')}
          />
          <FeatureCard
            icon={Users}
            title={t('home.workforceTracking')}
            description={t('home.workforceTrackingDesc')}
          />
          <FeatureCard
            icon={Globe}
            title={t('home.regionalCoverage')}
            description={t('home.regionalCoverageDesc')}
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`rounded-2xl p-12 text-center shadow-2xl transition-colors duration-300 ${
          isDark 
            ? 'bg-white text-black' 
            : 'bg-black text-white'
        }`}>
          <h2 className="text-3xl font-bold mb-4">{t('home.getStarted')}</h2>
          <p className="text-xl mb-8 opacity-90">
            {t('home.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${
                isDark 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {t('home.viewDashboard')}
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className={`border-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'border-black hover:bg-black hover:text-white' 
                  : 'border-white hover:bg-white hover:text-black'
              }`}
            >
              {t('home.manageProjects')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;