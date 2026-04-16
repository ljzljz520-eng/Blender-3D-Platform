const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5001;
const DATA_DIR = path.join(__dirname, '../data');

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

fs.ensureDirSync(DATA_DIR);
fs.ensureDirSync(path.join(DATA_DIR, 'projects'));

app.get('/api/projects', async (req, res) => {
  try {
    const projectsDir = path.join(DATA_DIR, 'projects');
    const files = await fs.readdir(projectsDir);
    const projects = [];
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const content = await fs.readJson(path.join(projectsDir, file));
        projects.push({
          id: content.id,
          name: content.name,
          createdAt: content.createdAt,
          updatedAt: content.updatedAt
        });
      }
    }
    
    projects.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, 'projects', `${req.params.id}.json`);
    if (await fs.pathExists(filePath)) {
      const project = await fs.readJson(filePath);
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const id = uuidv4();
    const now = new Date().toISOString();
    const project = {
      id,
      name: req.body.name || 'Untitled Project',
      createdAt: now,
      updatedAt: now,
      objects: req.body.objects || [],
      settings: req.body.settings || {}
    };
    
    const filePath = path.join(DATA_DIR, 'projects', `${id}.json`);
    await fs.writeJson(filePath, project, { spaces: 2 });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, 'projects', `${req.params.id}.json`);
    if (await fs.pathExists(filePath)) {
      const existing = await fs.readJson(filePath);
      const updated = {
        ...existing,
        ...req.body,
        id: req.params.id,
        updatedAt: new Date().toISOString()
      };
      await fs.writeJson(filePath, updated, { spaces: 2 });
      res.json(updated);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, 'projects', `${req.params.id}.json`);
    if (await fs.pathExists(filePath)) {
      await fs.remove(filePath);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
