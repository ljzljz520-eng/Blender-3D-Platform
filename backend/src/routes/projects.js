const express = require('express');
const router = express.Router();
const projectStore = require('../store/projectStore');

router.get('/', (req, res) => {
  try {
    const projects = projectStore.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const project = projectStore.getProject(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { name, data } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Project name is required' });
    }
    const project = projectStore.createProject(name, data);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { name, data } = req.body;
    const project = projectStore.updateProject(req.params.id, name, data);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const success = projectStore.deleteProject(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
