import React, { useEffect, useState } from 'react';
import { Folder, File, Plus, Trash2, Save, Upload } from 'lucide-react';
import useStore from '../store/useStore';

function ProjectPanel() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [showNewProject, setShowNewProject] = useState(false);
  
  const { 
    objects, 
    currentProject, 
    setCurrentProject,
    setObjects,
    clearObjects,
    selectedObjectId,
    setSelectedObjectId
  } = useStore();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('加载项目失败:', error);
    }
  };

  const createProject = async () => {
    if (!projectName.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: projectName, objects })
      });
      const project = await response.json();
      setCurrentProject(project);
      setShowNewProject(false);
      setProjectName('');
      await loadProjects();
    } catch (error) {
      console.error('创建项目失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProject = async () => {
    if (!currentProject) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/projects/${currentProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ objects, name: currentProject.name })
      });
      const project = await response.json();
      setCurrentProject(project);
      await loadProjects();
      alert('保存成功！');
    } catch (error) {
      console.error('保存项目失败:', error);
      alert('保存失败！');
    } finally {
      setLoading(false);
    }
  };

  const loadProject = async (projectId) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`);
      const project = await response.json();
      setObjects(project.objects || []);
      setCurrentProject(project);
    } catch (error) {
      console.error('加载项目失败:', error);
    }
  };

  const deleteProject = async (projectId, e) => {
    e.stopPropagation();
    if (!confirm('确定要删除这个项目吗？')) return;
    
    try {
      await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
      if (currentProject?.id === projectId) {
        setCurrentProject(null);
        clearObjects();
      }
      await loadProjects();
    } catch (error) {
      console.error('删除项目失败:', error);
    }
  };

  const handleObjectClick = (objId) => {
    setSelectedObjectId(selectedObjectId === objId ? null : objId);
  };

  return (
    <div className="w-64 border-r border-gray-700 bg-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">项目管理</h2>
          <button
            onClick={() => setShowNewProject(!showNewProject)}
            className="p-1 rounded hover:bg-gray-700"
          >
            <Plus size={18} />
          </button>
        </div>

        {showNewProject && (
          <div className="mb-3">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="项目名称"
              className="w-full rounded bg-gray-700 px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && createProject()}
            />
            <button
              onClick={createProject}
              disabled={loading}
              className="w-full rounded bg-blue-600 px-3 py-2 text-sm hover:bg-blue-500 disabled:opacity-50"
            >
              创建项目
            </button>
          </div>
        )}

        {currentProject && (
          <button
            onClick={saveProject}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded bg-green-600 px-3 py-2 text-sm hover:bg-green-500 disabled:opacity-50"
          >
            <Save size={16} />
            保存项目
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-sm text-gray-400 mb-2 font-semibold">我的项目</h3>
        <div className="space-y-1">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => loadProject(project.id)}
              className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                currentProject?.id === project.id
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <Folder size={16} className="flex-shrink-0" />
                <span className="text-sm truncate">{project.name}</span>
              </div>
              <button
                onClick={(e) => deleteProject(project.id, e)}
                className="p-1 rounded hover:bg-red-600 opacity-0 hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">暂无项目</p>
          )}
        </div>
      </div>

      <div className="border-t border-gray-700 p-4">
        <h3 className="text-sm text-gray-400 mb-2 font-semibold">场景对象</h3>
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {objects.map((obj) => (
            <div
              key={obj.id}
              onClick={() => handleObjectClick(obj.id)}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                selectedObjectId === obj.id
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-700'
              }`}
            >
              <File size={14} className="flex-shrink-0" />
              <span className="text-sm truncate">{obj.name}</span>
            </div>
          ))}
          {objects.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-2">空场景</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectPanel;
