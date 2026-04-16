import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import useStore from './store/useStore';
import Toolbar from './components/Toolbar';
import PropertiesPanel from './components/PropertiesPanel';
import ProjectPanel from './components/ProjectPanel';
import ViewportControls from './components/ViewportControls';
import SceneObjects from './components/SceneObjects';
import GridHelper from './components/GridHelper';
import Lights from './components/Lights';
import TransformControls from './components/TransformControls';
import WelcomeGuide from './components/WelcomeGuide';
import * as THREE from 'three';

function CameraController() {
  const { viewMode } = useStore();
  const { camera, controls } = useThree();

  useEffect(() => {
    if (!camera || !controls) return;

    const positions = {
      perspective: { pos: [5, 5, 5], target: [0, 0, 0] },
      top: { pos: [0, 10, 0], target: [0, 0, 0] },
      front: { pos: [0, 0, 10], target: [0, 0, 0] },
      side: { pos: [10, 0, 0], target: [0, 0, 0] }
    };

    const config = positions[viewMode] || positions.perspective;
    
    camera.position.set(...config.pos);
    
    if (viewMode !== 'perspective') {
      camera.rotation.set(0, 0, 0);
    }
    
    if (controls) {
      controls.target.set(...config.target);
      controls.update();
    }
  }, [viewMode, camera, controls]);

  return null;
}

function App() {
  const { viewMode, showGrid, showAxes } = useStore();
  const canvasRef = useRef();

  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white">
      <Toolbar />
      
      <div className="flex flex-1 flex-col">
        <div className="flex h-12 items-center border-b border-gray-700 px-4">
          <h1 className="text-lg font-semibold">3D建模平台</h1>
          <ViewportControls />
        </div>
        
        <div className="flex flex-1">
          <ProjectPanel />
          
          <div className="flex-1 relative">
            <Canvas 
              ref={canvasRef}
              shadows 
              className="bg-gray-800"
              camera={{ position: [5, 5, 5], fov: 50 }}
            >
              <CameraController />
              
              <OrbitControls 
                makeDefault 
                enableDamping 
                dampingFactor={0.05}
                minDistance={1}
                maxDistance={100}
              />
              
              <Lights />
              
              {showGrid && <GridHelper />}
              
              <SceneObjects />
              
              <TransformControls />
            </Canvas>
          </div>
          
          <PropertiesPanel />
        </div>
      </div>
      
      <WelcomeGuide />
    </div>
  );
}

export default App;
