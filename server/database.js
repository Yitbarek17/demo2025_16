import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'projects.db');

// Create database connection
const db = new sqlite3.Database(dbPath);

// Initialize database with tables
export const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create projects table
      db.run(`
        CREATE TABLE IF NOT EXISTS projects (
          id TEXT PRIMARY KEY,
          companyName TEXT NOT NULL,
          sector TEXT NOT NULL,
          subSector TEXT NOT NULL,
          region TEXT NOT NULL,
          zone TEXT NOT NULL,
          woreda TEXT NOT NULL,
          approvalDate TEXT NOT NULL,
          owner TEXT NOT NULL,
          advisorCompany TEXT,
          evaluator TEXT,
          grantedBy TEXT,
          contactPerson TEXT NOT NULL,
          ownerPhone TEXT NOT NULL,
          companyEmail TEXT NOT NULL,
          companyWebsite TEXT,
          projectStatus TEXT NOT NULL,
          employeesMale INTEGER DEFAULT 0,
          employeesFemale INTEGER DEFAULT 0,
          employeesTotal INTEGER DEFAULT 0,
          createdAt TEXT NOT NULL,
          updatedAt TEXT NOT NULL
        )
      `, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Database initialized successfully');
          resolve();
        }
      });
    });
  });
};

// Database operations
export const dbOperations = {
  // Get all projects
  getAllProjects: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM projects ORDER BY createdAt DESC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  // Create project
  createProject: (project) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO projects (
          id, companyName, sector, subSector, region, zone, woreda,
          approvalDate, owner, advisorCompany, evaluator, grantedBy,
          contactPerson, ownerPhone, companyEmail, companyWebsite,
          projectStatus, employeesMale, employeesFemale, employeesTotal,
          createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const values = [
        project.id, project.companyName, project.sector, project.subSector,
        project.region, project.zone, project.woreda, project.approvalDate,
        project.owner, project.advisorCompany, project.evaluator, project.grantedBy,
        project.contactPerson, project.ownerPhone, project.companyEmail, project.companyWebsite,
        project.projectStatus, project.employeesMale, project.employeesFemale, project.employeesTotal,
        project.createdAt, project.updatedAt
      ];

      db.run(sql, values, function(err) {
        if (err) reject(err);
        else resolve({ ...project, id: project.id });
      });
    });
  },

  // Update project
  updateProject: (id, project) => {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE projects SET
          companyName = ?, sector = ?, subSector = ?, region = ?, zone = ?, woreda = ?,
          approvalDate = ?, owner = ?, advisorCompany = ?, evaluator = ?, grantedBy = ?,
          contactPerson = ?, ownerPhone = ?, companyEmail = ?, companyWebsite = ?,
          projectStatus = ?, employeesMale = ?, employeesFemale = ?, employeesTotal = ?,
          updatedAt = ?
        WHERE id = ?
      `;
      
      const values = [
        project.companyName, project.sector, project.subSector, project.region,
        project.zone, project.woreda, project.approvalDate, project.owner,
        project.advisorCompany, project.evaluator, project.grantedBy, project.contactPerson,
        project.ownerPhone, project.companyEmail, project.companyWebsite, project.projectStatus,
        project.employeesMale, project.employeesFemale, project.employeesTotal,
        new Date().toISOString(), id
      ];

      db.run(sql, values, function(err) {
        if (err) reject(err);
        else {
          // Get updated project
          db.get('SELECT * FROM projects WHERE id = ?', [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
          });
        }
      });
    });
  },

  // Delete project
  deleteProject: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM projects WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else resolve({ message: 'Project deleted successfully' });
      });
    });
  }
};

export default db;