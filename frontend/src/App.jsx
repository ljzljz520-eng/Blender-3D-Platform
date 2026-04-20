import React, { useState, useEffect, useRef } from 'react';
import Viewport from './components/Viewport';
import Toolbar from './components/Toolbar';
import PropertiesPanel from './components/PropertiesPanel';
import { SceneProvider } from './context/SceneContext';
import { ProjectProvider } from './context/ProjectContext';

function App() {
  return (
    <ProjectProvider>
      <SceneProvider>
        <div className="app">
          <header className="header">
            <h1>🎨 3D建模平台</h1>
          </header>
          <div className="main-content">
            <Toolbar />
            <Viewport />
            <PropertiesPanel />
          </div>
        </div>
      </SceneProvider>
    </ProjectProvider>
  );
}

export default App;
