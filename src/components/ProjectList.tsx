import React, { useState, useMemo } from 'react';
import { Search, Edit, Trash2, Eye, Mail, Phone, Globe, Filter, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { format } from 'date-fns';
import { Project } from '../types';
import { deleteProject } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

type SortField = 'companyName' | 'employeesTotal' | 'approvalDate' | 'region' | 'sector';
type SortDirection = 'asc' | 'desc';

const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSector, setFilterSector] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [filterSubSector, setFilterSubSector] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sortField, setSortField] = useState<SortField>('companyName');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [showFilters, setShowFilters] = useState(false);

  const { isDark } = useTheme();
  const { t } = useLanguage();

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = !filterSector || project.sector === filterSector;
      const matchesStatus = !filterStatus || project.projectStatus === filterStatus;
      const matchesRegion = !filterRegion || project.region === filterRegion;
      const matchesSubSector = !filterSubSector || project.subSector === filterSubSector;
      
      return matchesSearch && matchesSector && matchesStatus && matchesRegion && matchesSubSector;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortField) {
        case 'companyName':
          aValue = a.companyName.toLowerCase();
          bValue = b.companyName.toLowerCase();
          break;
        case 'employeesTotal':
          aValue = a.employeesTotal;
          bValue = b.employeesTotal;
          break;
        case 'approvalDate':
          aValue = new Date(a.approvalDate);
          bValue = new Date(b.approvalDate);
          break;
        case 'region':
          aValue = a.region.toLowerCase();
          bValue = b.region.toLowerCase();
          break;
        case 'sector':
          aValue = a.sector.toLowerCase();
          bValue = b.sector.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [projects, searchTerm, filterSector, filterStatus, filterRegion, filterSubSector, sortField, sortDirection]);

  const handleDelete = async (projectId: string) => {
    if (window.confirm(t('projects.deleteConfirm'))) {
      try {
        await deleteProject(projectId);
        onDelete(projectId);
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      }
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterSector('');
    setFilterStatus('');
    setFilterRegion('');
    setFilterSubSector('');
  };

  const sectors = [...new Set(projects.map(p => p.sector))];
  const statuses = [...new Set(projects.map(p => p.projectStatus))];
  const regions = [...new Set(projects.map(p => p.region))];
  const subSectors = [...new Set(projects.map(p => p.subSector))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'In Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Planning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'On Hold': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className={`flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded transition-colors ${
        sortField === field ? (isDark ? 'text-white' : 'text-black') : (isDark ? 'text-gray-300' : 'text-gray-500')
      }`}
    >
      <span>{children}</span>
      {sortField === field ? (
        sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
      ) : (
        <ArrowUpDown className="h-4 w-4 opacity-50" />
      )}
    </button>
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className={`p-6 rounded-lg shadow-sm border transition-colors ${
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        {/* Search and Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder={t('common.search') + '...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 w-full border rounded-md transition-colors focus:ring-2 focus:ring-offset-2 ${
                  isDark 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-white focus:ring-white' 
                    : 'bg-white border-gray-300 text-black placeholder-gray-500 focus:border-black focus:ring-black'
                }`}
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center px-4 py-2 border rounded-md transition-all hover:scale-105 ${
                  showFilters
                    ? isDark 
                      ? 'bg-white text-black border-white' 
                      : 'bg-black text-white border-black'
                    : isDark 
                      ? 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700' 
                      : 'bg-white text-black border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Filter className="h-4 w-4 mr-2" />
                {t('common.filter')}
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className={`p-4 rounded-lg border transition-colors animate-slideDown ${
              isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <select
                  value={filterSector}
                  onChange={(e) => setFilterSector(e.target.value)}
                  className={`px-3 py-2 border rounded-md transition-colors focus:ring-2 focus:ring-offset-2 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-white focus:ring-white' 
                      : 'bg-white border-gray-300 text-black focus:border-black focus:ring-black'
                  }`}
                >
                  <option value="">All Sectors</option>
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>

                <select
                  value={filterSubSector}
                  onChange={(e) => setFilterSubSector(e.target.value)}
                  className={`px-3 py-2 border rounded-md transition-colors focus:ring-2 focus:ring-offset-2 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-white focus:ring-white' 
                      : 'bg-white border-gray-300 text-black focus:border-black focus:ring-black'
                  }`}
                >
                  <option value="">All Sub-Sectors</option>
                  {subSectors.map(subSector => (
                    <option key={subSector} value={subSector}>{subSector}</option>
                  ))}
                </select>

                <select
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  className={`px-3 py-2 border rounded-md transition-colors focus:ring-2 focus:ring-offset-2 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-white focus:ring-white' 
                      : 'bg-white border-gray-300 text-black focus:border-black focus:ring-black'
                  }`}
                >
                  <option value="">All Regions</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`px-3 py-2 border rounded-md transition-colors focus:ring-2 focus:ring-offset-2 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-white focus:ring-white' 
                      : 'bg-white border-gray-300 text-black focus:border-black focus:ring-black'
                  }`}
                >
                  <option value="">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`text-sm transition-colors ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Showing {filteredAndSortedProjects.length} of {projects.length} projects
                </span>
                <button
                  onClick={clearFilters}
                  className={`text-sm px-3 py-1 rounded transition-colors hover:scale-105 ${
                    isDark 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-black hover:bg-gray-200'
                  }`}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Projects Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={`transition-colors ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <SortButton field="companyName">{t('projects.company')}</SortButton>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <SortButton field="sector">{t('common.sector')}</SortButton>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <SortButton field="region">{t('projects.location')}</SortButton>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  {t('common.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <SortButton field="employeesTotal">{t('common.employees')}</SortButton>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  <SortButton field="approvalDate">{t('common.date')}</SortButton>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  {t('projects.actions')}
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y transition-colors ${
              isDark ? 'bg-gray-900 divide-gray-700' : 'bg-white divide-gray-200'
            }`}>
              {filteredAndSortedProjects.map((project) => (
                <tr 
                  key={project.id} 
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className={`text-sm font-medium transition-colors ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {project.companyName}
                        </div>
                        <div className={`text-sm transition-colors ${
                          isDark ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {project.owner}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm transition-colors ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {project.sector}
                    </div>
                    <div className={`text-sm transition-colors ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {project.subSector}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm transition-colors ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {project.region}
                    </div>
                    <div className={`text-sm transition-colors ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {project.zone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.projectStatus)}`}>
                      {project.projectStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm transition-colors ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {project.employeesTotal}
                    </div>
                    <div className={`text-xs transition-colors ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {project.employeesMale}M / {project.employeesFemale}F
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm transition-colors ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {format(new Date(project.approvalDate), 'MMM dd, yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className={`p-1 rounded transition-colors hover:scale-110 ${
                          isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'
                        }`}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onEdit(project)}
                        className={`p-1 rounded transition-colors hover:scale-110 ${
                          isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-900'
                        }`}
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className={`p-1 rounded transition-colors hover:scale-110 ${
                          isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900'
                        }`}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAndSortedProjects.length === 0 && (
          <div className="text-center py-8">
            <p className={`transition-colors ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {t('projects.noProjects')}
            </p>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 backdrop-blur-sm">
          <div className={`relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md transition-colors ${
            isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-bold transition-colors ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {t('projects.projectDetails')}
              </h3>
              <button
                onClick={() => setSelectedProject(null)}
                className={`transition-colors hover:scale-110 ${
                  isDark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className="sr-only">Close</span>
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className={`font-semibold transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Company Information
                  </h4>
                  <p className={`text-lg font-medium transition-colors ${
                    isDark ? 'text-white' : 'text-black'
                  }`}>
                    {selectedProject.companyName}
                  </p>
                  <p className={`transition-colors ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {selectedProject.sector} - {selectedProject.subSector}
                  </p>
                </div>
                
                <div>
                  <h4 className={`font-semibold transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Location
                  </h4>
                  <p className={`transition-colors ${
                    isDark ? 'text-white' : 'text-black'
                  }`}>
                    {selectedProject.region}
                  </p>
                  <p className={`transition-colors ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {selectedProject.zone}, {selectedProject.woreda}
                  </p>
                </div>
                
                <div>
                  <h4 className={`font-semibold transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Project Details
                  </h4>
                  <p>Status: <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedProject.projectStatus)}`}>
                    {selectedProject.projectStatus}
                  </span></p>
                  <p className={`transition-colors ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Approval Date: {format(new Date(selectedProject.approvalDate), 'MMM dd, yyyy')}
                  </p>
                  <p className={`transition-colors ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Granted By: {selectedProject.grantedBy}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className={`font-semibold transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Contact Information
                  </h4>
                  <p className={`transition-colors ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Owner: {selectedProject.owner}
                  </p>
                  <p className={`transition-colors ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Contact: {selectedProject.contactPerson}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <a href={`tel:${selectedProject.ownerPhone}`} className={`flex items-center transition-colors hover:scale-105 ${
                      isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                    }`}>
                      <Phone className="h-4 w-4 mr-1" />
                      {selectedProject.ownerPhone}
                    </a>
                    <a href={`mailto:${selectedProject.companyEmail}`} className={`flex items-center transition-colors hover:scale-105 ${
                      isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                    }`}>
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </a>
                    {selectedProject.companyWebsite && (
                      <a href={selectedProject.companyWebsite} target="_blank" rel="noopener noreferrer" className={`flex items-center transition-colors hover:scale-105 ${
                        isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                      }`}>
                        <Globe className="h-4 w-4 mr-1" />
                        Website
                      </a>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className={`font-semibold transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Team & Advisors
                  </h4>
                  <p className={`transition-colors ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Advisor Company: {selectedProject.advisorCompany}
                  </p>
                  <p className={`transition-colors ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Evaluator: {selectedProject.evaluator}
                  </p>
                </div>
                
                <div>
                  <h4 className={`font-semibold transition-colors ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Employee Statistics
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className={`p-2 rounded transition-colors ${
                      isDark ? 'bg-blue-900/30' : 'bg-blue-50'
                    }`}>
                      <div className={`text-lg font-bold transition-colors ${
                        isDark ? 'text-blue-300' : 'text-blue-600'
                      }`}>
                        {selectedProject.employeesMale}
                      </div>
                      <div className={`text-xs transition-colors ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Male
                      </div>
                    </div>
                    <div className={`p-2 rounded transition-colors ${
                      isDark ? 'bg-pink-900/30' : 'bg-pink-50'
                    }`}>
                      <div className={`text-lg font-bold transition-colors ${
                        isDark ? 'text-pink-300' : 'text-pink-600'
                      }`}>
                        {selectedProject.employeesFemale}
                      </div>
                      <div className={`text-xs transition-colors ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Female
                      </div>
                    </div>
                    <div className={`p-2 rounded transition-colors ${
                      isDark ? 'bg-gray-700' : 'bg-gray-50'
                    }`}>
                      <div className={`text-lg font-bold transition-colors ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {selectedProject.employeesTotal}
                      </div>
                      <div className={`text-xs transition-colors ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Total
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;