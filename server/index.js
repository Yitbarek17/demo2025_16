import express from 'express';
import cors from 'cors';
import { initializeDatabase, dbOperations } from './database.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Metadata
const metadata = {
  regions: [
    'Addis Ababa', 'Afar', 'Amhara', 'Benishangul-Gumuz', 'Dire Dawa',
    'Gambela', 'Harari', 'Oromia', 'Sidama', 'SNNP', 'Somali', 'Tigray', 'Southwest', 'Central Ethiopia'
  ],
  sectors: ['Health', 'Industry', 'Agriculture'],
  subSectors: [
    'Agroprocessing', 'Food and Beverage', 'Construction and Engineering',
    'Chemical and Detergents', 'Textile and Garment', 'Multi-Sectorial', 'Minerals'
  ],
  projectStatuses: ['Planning', 'In Progress', 'Completed', 'On Hold', 'Cancelled']
};

// Routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await dbOperations.getAllProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.get('/api/metadata', (req, res) => {
  res.json(metadata);
});

app.post('/api/projects', async (req, res) => {
  try {
    const newProject = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const project = await dbOperations.createProject(newProject);
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const project = await dbOperations.updateProject(req.params.id, req.body);
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await dbOperations.deleteProject(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Initialize database and start server
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });