import React from 'react';
import { useScene } from '../context/SceneContext';

function LightPanel() {
  const { lights, setLights } = useScene();

  const lightSources = [
    { id: 'ambient', name: '环境光', icon: '☀️' },
    { id: 'directional', name: '平行光', icon: '🌞' },
    { id: 'point', name: '点光源', icon: '💡' },
  ];

  return (
    <div className="section">
      <div className="section-title">光照系统</div>
      {lightSources.map(light => (
        <div key={light.id} className="light-item">
          <span>
            {light.icon} {light.name}
          </span>
          <button
            className={`light-toggle ${lights[light.id] ? 'active' : ''}`}
            onClick={() => setLights(prev => ({ ...prev, [light.id]: !prev[light.id] }))}
          />
        </div>
      ))}
    </div>
  );
}

export default LightPanel;
