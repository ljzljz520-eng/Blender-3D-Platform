import React, { useState } from 'react';
import * as THREE from 'three';
import { useScene } from '../context/SceneContext';

function Toolbar() {
  const { addObject, sceneRef } = useScene();
  const [activeTool, setActiveTool] = useState('select');

  const createCube = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x4a90d9 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(
      (Math.random() - 0.5) * 4,
      0.5,
      (Math.random() - 0.5) * 4
    );
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.name = `Cube_${Date.now()}`;
    addObject(cube);
  };

  const createSphere = () => {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xd94a4a });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(
      (Math.random() - 0.5) * 4,
      0.5,
      (Math.random() - 0.5) * 4
    );
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.name = `Sphere_${Date.now()}`;
    addObject(sphere);
  };

  const createCylinder = () => {
    const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x4ad94a });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(
      (Math.random() - 0.5) * 4,
      0.5,
      (Math.random() - 0.5) * 4
    );
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    cylinder.name = `Cylinder_${Date.now()}`;
    addObject(cylinder);
  };

  const createPlane = () => {
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xd9d94a,
      side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(
      (Math.random() - 0.5) * 4,
      0.01,
      (Math.random() - 0.5) * 4
    );
    plane.receiveShadow = true;
    plane.name = `Plane_${Date.now()}`;
    addObject(plane);
  };

  const createTorus = () => {
    const geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0x9a4ad9 });
    const torus = new THREE.Mesh(geometry, material);
    torus.position.set(
      (Math.random() - 0.5) * 4,
      0.5,
      (Math.random() - 0.5) * 4
    );
    torus.castShadow = true;
    torus.receiveShadow = true;
    torus.name = `Torus_${Date.now()}`;
    addObject(torus);
  };

  const createCone = () => {
    const geometry = new THREE.ConeGeometry(0.5, 1, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0xd99a4a });
    const cone = new THREE.Mesh(geometry, material);
    cone.position.set(
      (Math.random() - 0.5) * 4,
      0.5,
      (Math.random() - 0.5) * 4
    );
    cone.castShadow = true;
    cone.receiveShadow = true;
    cone.name = `Cone_${Date.now()}`;
    addObject(cone);
  };

  const tools = [
    { id: 'cube', icon: '⬛', title: '创建立方体', action: createCube },
    { id: 'sphere', icon: '⚫', title: '创建球体', action: createSphere },
    { id: 'cylinder', icon: '🔘', title: '创建圆柱体', action: createCylinder },
    { id: 'plane', icon: '▭', title: '创建平面', action: createPlane },
    { id: 'torus', icon: '⭕', title: '创建圆环', action: createTorus },
    { id: 'cone', icon: '🔺', title: '创建圆锥', action: createCone },
  ];

  return (
    <aside className="sidebar">
      {tools.map(tool => (
        <button
          key={tool.id}
          className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
          title={tool.title}
          onClick={() => {
            setActiveTool(tool.id);
            tool.action();
          }}
        >
          {tool.icon}
        </button>
      ))}
    </aside>
  );
}

export default Toolbar;
