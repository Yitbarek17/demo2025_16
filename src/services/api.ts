import axios from 'axios';
import { Project, Metadata } from '../types';

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await api.get('/projects');
  return response.data;
};

export const fetchMetadata = async (): Promise<Metadata> => {
  const response = await api.get('/metadata');
  return response.data;
};

export const createProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
  const response = await api.post('/projects', project);
  return response.data;
};

export const updateProject = async (id: string, project: Partial<Project>): Promise<Project> => {
  const response = await api.put(`/projects/${id}`, project);
  return response.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}`);
};