import React from 'react';
import * as THREE from 'three';
import { useScene } from '../context/SceneContext';

function MaterialPanel() {
  const { selectedObject, updateObjectProperty } = useScene();

  if (!selectedObject || !selectedObject.material) return null;

  const color = selectedObject.material.color.getHexString();

  return (
    <div className="section">
      <div className="section-title">材质</div>
      
      <div className="property-row">
        <span className="property-label">颜色</span>
        <input
          type="color"
          className="color-input"
          value={`#${color}`}
          onChange={(e) => updateObjectProperty(selectedObject.uuid, 'color', e.target.value)}
        />
      </div>

      <div className="property-row">
        <span className="property-label">金属度</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          className="property-input"
          value={selectedObject.material.metalness || 0}
          onChange={(e) => {
            selectedObject.material.metalness = parseFloat(e.target.value);
          }}
        />
      </div>

      <div className="property-row">
        <span className="property-label">粗糙度</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          className="property-input"
          value={selectedObject.material.roughness || 0.5}
          onChange={(e) => {
            selectedObject.material.roughness = parseFloat(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default MaterialPanel;
