export interface Project {
  id: string;
  companyName: string;
  sector: string;
  subSector: string;
  region: string;
  zone: string;
  woreda: string;
  approvalDate: string;
  owner: string;
  advisorCompany: string;
  evaluator: string;
  grantedBy: string;
  contactPerson: string;
  ownerPhone: string;
  companyEmail: string;
  companyWebsite: string;
  projectStatus: string;
  employeesMale: number;
  employeesFemale: number;
  employeesTotal: number;
  createdAt: string;
  updatedAt: string;
}

export interface Metadata {
  regions: string[];
  sectors: string[];
  subSectors: string[];
  projectStatuses: string[];
}

export interface DashboardStats {
  totalProjects: number;
  totalEmployees: number;
  maleEmployees: number;
  femaleEmployees: number;
  completedProjects: number;
  inProgressProjects: number;
}