import React, { useState } from 'react';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { useScene } from '../context/SceneContext';
import { useProject } from '../context/ProjectContext';
import ObjectList from './ObjectList';
import TransformPanel from './TransformPanel';
import MaterialPanel from './MaterialPanel';
import LightPanel from './LightPanel';
import ProjectPanel from './ProjectPanel';

function PropertiesPanel() {
  const { selectedObject, updateObjectProperty, objects, removeObject } = useScene();
  const { createProject, saveProject, currentProject } = useProject();
  const [activeTab, setActiveTab] = useState('objects');

  const exportModel = () => {
    const exporter = new GLTFExporter();
    const sceneObjects = objects.filter(obj => obj.isMesh);
    
    const exportScene = new THREE.Scene();
    sceneObjects.forEach(obj => exportScene.add(obj.clone()));

    exporter.parse(
      exportScene,
      (result) => {
        const data = JSON.stringify(result, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'model.gltf';
        a.click();
        URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Export failed:', error);
      },
      { binary: false }
    );
  };

  return (
    <aside className="properties-panel">
      <div className="panel-header">属性面板</div>
      <div className="panel-content">
        <div className="section">
          <button 
            className="create-btn" 
            onClick={exportModel}
            style={{ background: '#e94560', border: 'none' }}
          >
            <span className="create-btn-icon">📥</span>
            导出 GLTF 模型
          </button>
        </div>

        {selectedObject && (
          <div className="section">
            <div className="section-title">选中对象</div>
            <div className="property-row">
              <span className="property-label">名称</span>
              <input
                type="text"
                className="property-input"
                value={selectedObject.name || ''}
                onChange={(e) => updateObjectProperty(selectedObject.uuid, 'name', e.target.value)}
              />
            </div>
            <button
              className="secondary-btn"
              style={{ marginTop: '8px' }}
              onClick={() => removeObject(selectedObject.uuid)}
            >
              🗑️ 删除对象
            </button>
          </div>
        )}

        <ObjectList />
        
        {selectedObject && (
          <>
            <TransformPanel />
            <MaterialPanel />
          </>
        )}

        <LightPanel />
        <ProjectPanel />
      </div>
    </aside>
  );
}

export default PropertiesPanel;
