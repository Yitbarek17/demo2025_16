import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Building2, MapPin, BarChart3, PieChart as PieChartIcon, Activity, Target } from 'lucide-react';
import { Project, Metadata } from '../types';

interface AnalyticsProps {
  projects: Project[];
  metadata: Metadata | null;
}

const Analytics: React.FC<AnalyticsProps> = ({ projects, metadata }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Data calculations
  const employeeBySector = metadata?.sectors.map(sector => {
    const sectorProjects = projects.filter(p => p.sector === sector);
    return {
      sector,
      male: sectorProjects.reduce((sum, p) => sum + p.employeesMale, 0),
      female: sectorProjects.reduce((sum, p) => sum + p.employeesFemale, 0),
      total: sectorProjects.reduce((sum, p) => sum + p.employeesTotal, 0),
      projects: sectorProjects.length
    };
  }) || [];

  const regionalData = metadata?.regions.map(region => {
    const regionProjects = projects.filter(p => p.region === region);
    return {
      region,
      projects: regionProjects.length,
      employees: regionProjects.reduce((sum, p) => sum + p.employeesTotal, 0),
      avgEmployees: regionProjects.length > 0 ? Math.round(regionProjects.reduce((sum, p) => sum + p.employeesTotal, 0) / regionProjects.length) : 0
    };
  }).filter(r => r.projects > 0) || [];

  const subSectorData = metadata?.subSectors.map(subSector => {
    const subSectorProjects = projects.filter(p => p.subSector === subSector);
    return {
      subSector,
      projects: subSectorProjects.length,
      employees: subSectorProjects.reduce((sum, p) => sum + p.employeesTotal, 0)
    };
  }).filter(s => s.projects > 0) || [];

  const statusData = metadata?.projectStatuses.map(status => ({
    status,
    count: projects.filter(p => p.projectStatus === status).length,
    employees: projects.filter(p => p.projectStatus === status).reduce((sum, p) => sum + p.employeesTotal, 0)
  })) || [];

  // Gender distribution analysis
  const totalMale = projects.reduce((sum, p) => sum + p.employeesMale, 0);
  const totalFemale = projects.reduce((sum, p) => sum + p.employeesFemale, 0);
  const totalEmployees = totalMale + totalFemale;
  const genderRatio = totalFemale > 0 ? (totalMale / totalFemale).toFixed(2) : 'N/A';

  // Colors for charts
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];

  const MetricCard = ({ title, value, subtitle, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${color}`}>
          <Icon className="h-8 w-8" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="text-3xl font-bold text-gray-900">{value}</dd>
            {subtitle && <dd className="text-sm text-gray-600">{subtitle}</dd>}
          </dl>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'sectors', label: 'Sector Analysis', icon: Building2 },
    { id: 'regional', label: 'Regional Analysis', icon: MapPin },
    { id: 'workforce', label: 'Workforce Analytics', icon: Users },
    { id: 'performance', label: 'Performance Metrics', icon: Target },
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Average Employees per Project"
          value={projects.length > 0 ? Math.round(totalEmployees / projects.length) : 0}
          icon={Users}
          color="text-blue-600"
        />
        <MetricCard
          title="Gender Ratio (M:F)"
          value={genderRatio}
          subtitle={`${((totalMale / totalEmployees) * 100).toFixed(1)}% Male`}
          icon={TrendingUp}
          color="text-green-600"
        />
        <MetricCard
          title="Active Regions"
          value={regionalData.length}
          subtitle={`of ${metadata?.regions.length} total`}
          icon={MapPin}
          color="text-purple-600"
        />
        <MetricCard
          title="Sectors Represented"
          value={employeeBySector.filter(s => s.projects > 0).length}
          subtitle={`of ${metadata?.sectors.length} total`}
          icon={Building2}
          color="text-orange-600"
        />
      </div>

      {/* Quick Overview Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Projects by Sector</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={employeeBySector}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ sector, projects }) => `${sector}: ${projects}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="projects"
              >
                {employeeBySector.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Project Status Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" name="Projects" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderSectorAnalysis = () => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Employee Distribution by Sector</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={employeeBySector}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sector" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="male" fill="#3B82F6" name="Male Employees" />
            <Bar dataKey="female" fill="#EC4899" name="Female Employees" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sub-sector Distribution</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={subSectorData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="subSector" type="category" width={150} />
            <Tooltip />
            <Legend />
            <Bar dataKey="projects" fill="#F59E0B" name="Projects" />
            <Bar dataKey="employees" fill="#06B6D4" name="Employees" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {employeeBySector.map((sector, index) => (
          <div key={sector.sector} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">{sector.sector}</h4>
              <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Projects:</span>
                <span className="font-medium">{sector.projects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Employees:</span>
                <span className="font-medium">{sector.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg per Project:</span>
                <span className="font-medium">{sector.projects > 0 ? Math.round(sector.total / sector.projects) : 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRegionalAnalysis = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Projects by Region</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="projects" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Employees by Region</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={regionalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="employees" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Regional Performance Comparison</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Employees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Employees/Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Share</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {regionalData.map((region) => (
                <tr key={region.region} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{region.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{region.projects}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{region.employees.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{region.avgEmployees}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {((region.projects / projects.length) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderWorkforceAnalytics = () => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Gender Distribution Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">{totalMale.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Male Employees</div>
            <div className="text-xs text-gray-400">{((totalMale / totalEmployees) * 100).toFixed(1)}%</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-600">{totalFemale.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Female Employees</div>
            <div className="text-xs text-gray-400">{((totalFemale / totalEmployees) * 100).toFixed(1)}%</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">{totalEmployees.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Total Employees</div>
            <div className="text-xs text-gray-400">100%</div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={employeeBySector}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sector" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="male" stroke="#3B82F6" strokeWidth={2} name="Male" />
            <Line type="monotone" dataKey="female" stroke="#EC4899" strokeWidth={2} name="Female" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Workforce Size Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projects.map(p => ({ name: p.companyName.substring(0, 15) + '...', employees: p.employeesTotal })).slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="employees" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Gender Balance by Sector</h3>
          <div className="space-y-4">
            {employeeBySector.map((sector) => {
              const malePercentage = sector.total > 0 ? (sector.male / sector.total) * 100 : 0;
              const femalePercentage = sector.total > 0 ? (sector.female / sector.total) * 100 : 0;
              return (
                <div key={sector.sector} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{sector.sector}</span>
                    <span className="text-gray-500">{sector.total} employees</span>
                  </div>
                  <div className="flex h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-500 flex items-center justify-center text-xs text-white font-medium"
                      style={{ width: `${malePercentage}%` }}
                    >
                      {malePercentage > 15 && `${malePercentage.toFixed(0)}%`}
                    </div>
                    <div 
                      className="bg-pink-500 flex items-center justify-center text-xs text-white font-medium"
                      style={{ width: `${femalePercentage}%` }}
                    >
                      {femalePercentage > 15 && `${femalePercentage.toFixed(0)}%`}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Male: {sector.male}</span>
                    <span>Female: {sector.female}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformanceMetrics = () => (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Project Status Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, count }) => `${status}: ${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="space-y-4">
            {statusData.map((status, index) => (
              <div key={status.status} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div>
                    <span className="font-medium">{status.status}</span>
                    <div className="text-sm text-gray-600">{status.count} projects</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{status.employees}</div>
                  <div className="text-sm text-gray-600">employees</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {((statusData.find(s => s.status === 'Completed')?.count || 0) / projects.length * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">Completion Rate</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {Math.round(totalEmployees / projects.length)}
            </div>
            <div className="text-sm text-gray-500">Avg Team Size</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {regionalData.length}
            </div>
            <div className="text-sm text-gray-500">Active Regions</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {subSectorData.length}
            </div>
            <div className="text-sm text-gray-500">Sub-sectors</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Project Timeline Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={projects.map(p => ({
            name: new Date(p.approvalDate).getFullYear(),
            employees: p.employeesTotal,
            project: p.companyName
          })).sort((a, b) => a.name - b.name)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="employees" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'sectors':
        return renderSectorAnalysis();
      case 'regional':
        return renderRegionalAnalysis();
      case 'workforce':
        return renderWorkforceAnalytics();
      case 'performance':
        return renderPerformanceMetrics();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Analytics;