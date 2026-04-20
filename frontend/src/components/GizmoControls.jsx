import React from 'react';
import { useScene } from '../context/SceneContext';

function GizmoControls() {
  const { transformMode, setTransformMode } = useScene();

  const modes = [
    { id: 'translate', label: '移动', shortcut: 'G' },
    { id: 'rotate', label: '旋转', shortcut: 'R' },
    { id: 'scale', label: '缩放', shortcut: 'S' },
  ];

  return (
    <div className="gizmo-controls">
      {modes.map(mode => (
        <button
          key={mode.id}
          className={`gizmo-btn ${transformMode === mode.id ? 'active' : ''}`}
          onClick={() => setTransformMode(mode.id)}
          title={`快捷键: ${mode.shortcut}`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}

export default GizmoControls;
