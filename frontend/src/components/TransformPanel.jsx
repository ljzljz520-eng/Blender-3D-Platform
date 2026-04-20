import React from 'react';
import * as THREE from 'three';
import { useScene } from '../context/SceneContext';

function TransformPanel() {
  const { selectedObject, updateObjectProperty } = useScene();

  if (!selectedObject) return null;

  const handleChange = (property, value) => {
    const numValue = parseFloat(value) || 0;
    updateObjectProperty(selectedObject.uuid, property, numValue);
  };

  return (
    <div className="section">
      <div className="section-title">变换</div>
      
      <div className="property-row">
        <span className="property-label">位置</span>
      </div>
      <div className="transform-inputs">
        <div>
          <div className="transform-label">X</div>
          <input
            type="number"
            step="0.1"
            className="transform-input"
            value={selectedObject.position.x.toFixed(2)}
            onChange={(e) => handleChange('position.x', e.target.value)}
          />
        </div>
        <div>
          <div className="transform-label">Y</div>
          <input
            type="number"
            step="0.1"
            className="transform-input"
            value={selectedObject.position.y.toFixed(2)}
            onChange={(e) => handleChange('position.y', e.target.value)}
          />
        </div>
        <div>
          <div className="transform-label">Z</div>
          <input
            type="number"
            step="0.1"
            className="transform-input"
            value={selectedObject.position.z.toFixed(2)}
            onChange={(e) => handleChange('position.z', e.target.value)}
          />
        </div>
      </div>

      <div className="property-row" style={{ marginTop: '12px' }}>
        <span className="property-label">旋转</span>
      </div>
      <div className="transform-inputs">
        <div>
          <div className="transform-label">X</div>
          <input
            type="number"
            step="5"
            className="transform-input"
            value={THREE.MathUtils.radToDeg(selectedObject.rotation.x).toFixed(0)}
            onChange={(e) => handleChange('rotation.x', e.target.value)}
          />
        </div>
        <div>
          <div className="transform-label">Y</div>
          <input
            type="number"
            step="5"
            className="transform-input"
            value={THREE.MathUtils.radToDeg(selectedObject.rotation.y).toFixed(0)}
            onChange={(e) => handleChange('rotation.y', e.target.value)}
          />
        </div>
        <div>
          <div className="transform-label">Z</div>
          <input
            type="number"
            step="5"
            className="transform-input"
            value={THREE.MathUtils.radToDeg(selectedObject.rotation.z).toFixed(0)}
            onChange={(e) => handleChange('rotation.z', e.target.value)}
          />
        </div>
      </div>

      <div className="property-row" style={{ marginTop: '12px' }}>
        <span className="property-label">缩放</span>
      </div>
      <div className="transform-inputs">
        <div>
          <div className="transform-label">X</div>
          <input
            type="number"
            step="0.1"
            min="0.1"
            className="transform-input"
            value={selectedObject.scale.x.toFixed(2)}
            onChange={(e) => handleChange('scale.x', e.target.value)}
          />
        </div>
        <div>
          <div className="transform-label">Y</div>
          <input
            type="number"
            step="0.1"
            min="0.1"
            className="transform-input"
            value={selectedObject.scale.y.toFixed(2)}
            onChange={(e) => handleChange('scale.y', e.target.value)}
          />
        </div>
        <div>
          <div className="transform-label">Z</div>
          <input
            type="number"
            step="0.1"
            min="0.1"
            className="transform-input"
            value={selectedObject.scale.z.toFixed(2)}
            onChange={(e) => handleChange('scale.z', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default TransformPanel;
