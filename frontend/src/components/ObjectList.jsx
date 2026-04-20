import React from 'react';
import { useScene } from '../context/SceneContext';

function ObjectList() {
  const { objects, selectedObject, setSelectedObject, removeObject } = useScene();

  const meshObjects = objects.filter(obj => obj.isMesh);

  return (
    <div className="section">
      <div className="section-title">场景对象 ({meshObjects.length})</div>
      <div className="objects-list">
        {meshObjects.length === 0 ? (
          <p style={{ fontSize: '12px', color: '#8892b0', textAlign: 'center', padding: '16px' }}>
            暂无对象，请从左侧工具栏创建
          </p>
        ) : (
          meshObjects.map(obj => (
            <div
              key={obj.uuid}
              className={`object-item ${selectedObject?.uuid === obj.uuid ? 'selected' : ''}`}
              onClick={() => setSelectedObject(obj)}
            >
              <span>{obj.name || '未命名'}</span>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  removeObject(obj.uuid);
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

export default ObjectList;
