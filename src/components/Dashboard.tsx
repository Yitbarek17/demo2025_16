import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Building2, Users, TrendingUp, Activity } from 'lucide-react';
import { Project, Metadata, DashboardStats } from '../types';

interface DashboardProps {
  projects: Project[];
  metadata: Metadata | null;
}

const Dashboard: React.FC<DashboardProps> = ({ projects, metadata }) => {
  const stats: DashboardStats = {
    totalProjects: projects.length,
    totalEmployees: projects.reduce((sum, p) => sum + p.employeesTotal, 0),
    maleEmployees: projects.reduce((sum, p) => sum + p.employeesMale, 0),
    femaleEmployees: projects.reduce((sum, p) => sum + p.employeesFemale, 0),
    completedProjects: projects.filter(p => p.projectStatus === 'Completed').length,
    inProgressProjects: projects.filter(p => p.projectStatus === 'In Progress').length,
  };

  const sectorData = metadata?.sectors.map(sector => ({
    name: sector,
    value: projects.filter(p => p.sector === sector).length,
    employees: projects.filter(p => p.sector === sector).reduce((sum, p) => sum + p.employeesTotal, 0)
  })) || [];

  const statusData = metadata?.projectStatuses.map(status => ({
    name: status,
    value: projects.filter(p => p.projectStatus === status).length
  })) || [];

  const regionData = metadata?.regions.map(region => ({
    name: region,
    projects: projects.filter(p => p.region === region).length,
    employees: projects.filter(p => p.region === region).reduce((sum, p) => sum + p.employeesTotal, 0)
  })) || [];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];

  const StatCard = ({ title, value, icon: Icon, color, subtitle }: any) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</dd>
            {subtitle && <dd className="text-sm text-gray-600">{subtitle}</dd>}
          </dl>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          value={stats.totalProjects}
          icon={Building2}
          color="text-blue-600"
        />
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={Users}
          color="text-green-600"
          subtitle={`${stats.maleEmployees} Male, ${stats.femaleEmployees} Female`}
        />
        <StatCard
          title="Completed Projects"
          value={stats.completedProjects}
          icon={TrendingUp}
          color="text-yellow-600"
        />
        <StatCard
          title="In Progress"
          value={stats.inProgressProjects}
          icon={Activity}
          color="text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Projects by Sector</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sectorData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sectorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Project Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Regional Distribution</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={regionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="projects" fill="#3B82F6" name="Projects" />
            <Bar yAxisId="right" dataKey="employees" fill="#10B981" name="Employees" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Gender Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.maleEmployees}</div>
            <div className="text-sm text-gray-500">Male Employees</div>
            <div className="text-xs text-gray-400">
              {((stats.maleEmployees / stats.totalEmployees) * 100).toFixed(1)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600">{stats.femaleEmployees}</div>
            <div className="text-sm text-gray-500">Female Employees</div>
            <div className="text-xs text-gray-400">
              {((stats.femaleEmployees / stats.totalEmployees) * 100).toFixed(1)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{stats.totalEmployees}</div>
            <div className="text-sm text-gray-500">Total Employees</div>
            <div className="text-xs text-gray-400">100%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;