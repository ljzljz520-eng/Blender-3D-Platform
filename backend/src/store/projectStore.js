const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readProjects() {
  ensureDataDir();
  if (!fs.existsSync(PROJECTS_FILE)) {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify([]));
  }
  const data = fs.readFileSync(PROJECTS_FILE, 'utf8');
  return JSON.parse(data);
}

function writeProjects(projects) {
  ensureDataDir();
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function getAllProjects() {
  return readProjects().map(p => ({
    id: p.id,
    name: p.name,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt
  }));
}

function getProject(id) {
  const projects = readProjects();
  return projects.find(p => p.id === id);
}

function createProject(name, data = null) {
  const projects = readProjects();
  const now = new Date().toISOString();
  const project = {
    id: generateId(),
    name,
    data,
    createdAt: now,
    updatedAt: now
  };
  projects.push(project);
  writeProjects(projects);
  return {
    id: project.id,
    name: project.name,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt
  };
}

function updateProject(id, name, data) {
  const projects = readProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  if (name) projects[index].name = name;
  if (data !== undefined) projects[index].data = data;
  projects[index].updatedAt = new Date().toISOString();
  
  writeProjects(projects);
  return {
    id: projects[index].id,
    name: projects[index].name,
    createdAt: projects[index].createdAt,
    updatedAt: projects[index].updatedAt
  };
}

function deleteProject(id) {
  let projects = readProjects();
  const initialLength = projects.length;
  projects = projects.filter(p => p.id !== id);
  if (projects.length === initialLength) return false;
  writeProjects(projects);
  return true;
}

module.exports = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};
