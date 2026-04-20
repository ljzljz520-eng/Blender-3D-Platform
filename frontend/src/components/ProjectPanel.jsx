import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';

function ProjectPanel() {
  const { projects, currentProject, createProject, loadProject, deleteProject, saveProject, loading } = useProject();
  const [newProjectName, setNewProjectName] = useState('');
  const [showNewProject, setShowNewProject] = useState(false);

  const handleCreateProject = async () => {
    if (newProjectName.trim()) {
      await createProject(newProjectName.trim());
      setNewProjectName('');
      setShowNewProject(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="section">
      <div className="section-title">项目管理</div>
      
      {!showNewProject ? (
        <button className="primary-btn" onClick={() => setShowNewProject(true)}>
          + 新建项目
        </button>
      ) : (
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            className="property-input"
            placeholder="项目名称"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            style={{ marginBottom: '8px' }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="primary-btn" 
              onClick={handleCreateProject}
              disabled={loading}
              style={{ flex: 1 }}
            >
              创建
            </button>
            <button 
              className="secondary-btn" 
              onClick={() => setShowNewProject(false)}
              style={{ flex: 1, marginTop: 0 }}
            >
              取消
            </button>
          </div>
        </div>
      )}

      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {projects.length === 0 ? (
          <p style={{ fontSize: '12px', color: '#8892b0', textAlign: 'center', padding: '16px' }}>
            暂无项目
          </p>
        ) : (
          projects.map(project => (
            <div
              key={project.id}
              className="project-item"
              onClick={() => loadProject(project.id)}
            >
              <div className="project-item-name">{project.name}</div>
              <div className="project-item-date">
                更新于 {formatDate(project.updatedAt)}
              </div>
              <button
                className="delete-btn"
                style={{ float: 'right', marginTop: '-20px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteProject(project.id);
                }}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectPanel;
