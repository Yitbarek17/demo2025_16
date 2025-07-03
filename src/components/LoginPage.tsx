import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(username, password);
      if (!success) {
        setError(t('auth.loginError'));
      }
    } catch (err) {
      setError(t('auth.loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Theme and Language Controls */}
      <div className="absolute top-6 right-6 flex items-center space-x-4">
        <div className={`flex rounded-lg p-1 transition-colors ${
          isDark ? 'bg-gray-800' : 'bg-gray-200'
        }`}>
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
              language === 'en'
                ? isDark 
                  ? 'bg-white text-black shadow-md' 
                  : 'bg-black text-white shadow-md'
                : isDark 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-black'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('am')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
              language === 'am'
                ? isDark 
                  ? 'bg-white text-black shadow-md' 
                  : 'bg-black text-white shadow-md'
                : isDark 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-black'
            }`}
          >
            አማ
          </button>
        </div>
        
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isDark 
              ? 'bg-gray-800 text-white hover:bg-gray-700' 
              : 'bg-white text-black hover:bg-gray-100'
          } shadow-lg`}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>

      <div className={`relative w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-sm border transition-all duration-300 ${
        isDark 
          ? 'bg-gray-900/80 border-gray-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="text-center mb-8">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors ${
            isDark ? 'bg-white text-black' : 'bg-black text-white'
          }`}>
            <LogIn className="h-8 w-8" />
          </div>
          <h1 className={`text-2xl font-bold mb-2 transition-colors ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            {t('auth.welcome')}
          </h1>
          <p className={`transition-colors ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t('app.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
              {t('auth.username')}
            </label>
            <div className="relative">
              <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-offset-2 ${
                  isDark 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-white focus:ring-white' 
                    : 'bg-white border-gray-300 text-black placeholder-gray-500 focus:border-black focus:ring-black'
                }`}
                placeholder={t('auth.username')}
                required
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
              {t('auth.password')}
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-offset-2 ${
                  isDark 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-white focus:ring-white' 
                    : 'bg-white border-gray-300 text-black placeholder-gray-500 focus:border-black focus:ring-black'
                }`}
                placeholder={t('auth.password')}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'
                }`}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-shake">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:scale-105 ${
              isDark 
                ? 'bg-white text-black hover:bg-gray-100 focus:bg-gray-100' 
                : 'bg-black text-white hover:bg-gray-800 focus:bg-gray-800'
            } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                {t('common.loading')}
              </div>
            ) : (
              t('auth.loginButton')
            )}
          </button>
        </form>

        <div className={`mt-8 p-4 rounded-lg border transition-colors ${
          isDark 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <h3 className={`font-medium mb-2 transition-colors ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            {t('auth.demoCredentials')}
          </h3>
          <p className={`text-sm transition-colors ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t('auth.demoUsername')}
          </p>
          <p className={`text-sm transition-colors ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t('auth.demoPassword')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;