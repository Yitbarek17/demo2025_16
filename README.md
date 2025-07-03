# Project Management System

## Overview
This is a full-stack Project Management System for tracking, analyzing, and managing projects across multiple sectors and regions in Ethiopia. It provides CRUD operations, advanced analytics, and workforce tracking, with a modern React frontend and an Express/SQLite backend.

## Features
- **Project Management:** Add, edit, delete, and view detailed project data.
- **Advanced Analytics:** Visual dashboards for sector, status, and regional distribution.
- **Workforce Tracking:** Monitor employee distribution by gender and region.
- **Regional Coverage:** Track projects across all regions of Ethiopia.
- **Authentication:** (If enabled) User login and session management.
- **Modern UI:** Responsive, themeable interface with language support.

## Project Structure
```
demo2/
├── server/           # Backend (Express + SQLite)
│   ├── index.js      # Main server entry point
│   ├── database.js   # Database logic (CRUD)
│   └── projects.db   # SQLite database file
├── src/              # Frontend (React + TypeScript)
│   ├── components/   # UI components (Dashboard, ProjectList, ProjectForm, etc.)
│   ├── contexts/     # React context providers (Auth, Theme, Language)
│   ├── services/     # API service (axios calls to backend)
│   ├── types/        # TypeScript types
│   └── App.tsx       # Main app logic
├── public/           # Static assets
├── package.json      # Project config and scripts
└── README.md         # This documentation
```

## Data Flow & CRUD Operations
- **Frontend** communicates with the backend via REST API endpoints (`/api/projects`, `/api/metadata`).
- **Backend** uses Express routes to handle requests and performs CRUD operations on a SQLite database.
- **No direct file-based data storage** (e.g., data.json) is used for live data; all project data is in the database.

### CRUD Endpoints
- `GET /api/projects` — List all projects
- `POST /api/projects` — Add a new project
- `PUT /api/projects/:id` — Update a project
- `DELETE /api/projects/:id` — Delete a project
- `GET /api/metadata` — Get regions, sectors, sub-sectors, and statuses

## How to Run
### Development
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the backend and frontend concurrently:**
   ```bash
   npm run dev
   ```
   - Backend: [http://localhost:3001](http://localhost:3001)
   - Frontend: [http://localhost:3000](http://localhost:3000)

### Production
1. **Build the frontend:**
   ```bash
   npm run build
   ```
2. **Start the backend:**
   ```bash
   npm start
   ```
   - The backend will serve the built frontend from the `dist/` directory.

## User Guide
### Homepage
- Quick navigation to Dashboard, Project Management, and Analytics.

### Dashboard
- **Stats Cards:** See total projects, employees, completed/in-progress projects.
- **Charts:**
  - Projects by Sector (Pie Chart)
  - Project Status Distribution (Bar Chart)
  - Regional Distribution (Bar Chart, all regions shown)
  - Gender Distribution (Stats)

### Project Management
- **Project List:** Search, filter, sort, and view all projects.
- **Add/Edit Project:** Fill out the form to add or update a project. Duplicate checks and validation are included.
- **Delete Project:** Remove a project from the system.

### Analytics
- **Overview:** Key metrics and quick charts.
- **Sector, Regional, Workforce, and Performance Analysis:** Deep-dive analytics by sector, region, workforce, and project timeline.

### Theming & Language
- Switch between light/dark mode and supported languages (EN/AM) from the header.

## Developer Notes
- **Tech Stack:** React, TypeScript, TailwindCSS, Express, SQLite, Vite.
- **API Service:** All API calls are in `src/services/api.ts`.
- **Database:** Schema and logic in `server/database.js`.
- **Authentication:** Provided via context, can be extended as needed.

---
For further customization or questions, see the code comments or contact the maintainer.
