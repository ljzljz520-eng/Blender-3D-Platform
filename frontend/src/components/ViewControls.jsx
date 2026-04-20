import React from 'react';
import { useScene } from '../context/SceneContext';

function ViewControls() {
  const { currentView, setCurrentView } = useScene();

  const views = [
    { id: 'perspective', label: '透视' },
    { id: 'top', label: '顶视' },
    { id: 'front', label: '前视' },
    { id: 'side', label: '侧视' },
  ];

  return (
    <div className="view-controls">
      {views.map(view => (
        <button
          key={view.id}
          className={`view-btn ${currentView === view.id ? 'active' : ''}`}
          onClick={() => setCurrentView(view.id)}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
}

export default ViewControls;
