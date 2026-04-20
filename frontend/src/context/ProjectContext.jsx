import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (name) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/projects', { name });
      setProjects(prev => [...prev, response.data]);
      setCurrentProject(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to create project:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveProject = useCallback(async (id, name, data) => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/projects/${id}`, { name, data });
      setProjects(prev => prev.map(p => p.id === id ? response.data : p));
      return response.data;
    } catch (error) {
      console.error('Failed to save project:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadProject = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/projects/${id}`);
      setCurrentProject(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to load project:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProject = useCallback(async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/projects/${id}`);
      setProjects(prev => prev.filter(p => p.id !== id));
      if (currentProject && currentProject.id === id) {
        setCurrentProject(null);
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    } finally {
      setLoading(false);
    }
  }, [currentProject]);

  useState(() => {
    fetchProjects();
  });

  const value = {
    projects,
    currentProject,
    setCurrentProject,
    loading,
    fetchProjects,
    createProject,
    saveProject,
    loadProject,
    deleteProject
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  return useContext(ProjectContext);
}
