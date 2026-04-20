import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { useScene } from '../context/SceneContext';
import ViewControls from './ViewControls';
import GizmoControls from './GizmoControls';
import HelpTip from './HelpTip';

function Viewport() {
  const containerRef = useRef(null);
  const {
    sceneRef,
    cameraRef,
    rendererRef,
    controlsRef,
    transformControlRef,
    objectsRef,
    selectedObject,
    setSelectedObject,
    objects,
    currentView,
    transformMode,
    lights
  } = useScene();

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(8, 8, 8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    const transformControl = new TransformControls(camera, renderer.domElement);
    transformControl.addEventListener('dragging-changed', (event) => {
      controls.enabled = !event.value;
    });
    transformControl.addEventListener('objectChange', () => {
      if (selectedObject) {
        setSelectedObject({ ...selectedObject });
      }
    });
    scene.add(transformControl);
    transformControlRef.current = transformControl;

    const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x333333);
    scene.add(gridHelper);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    ambientLight.name = 'ambientLight';
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 15, 10);
    directionalLight.castShadow = true;
    directionalLight.name = 'directionalLight';
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5, 50);
    pointLight.position.set(-5, 5, -5);
    pointLight.name = 'pointLight';
    pointLight.visible = false;
    scene.add(pointLight);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshObjects = objectsRef.current.filter(obj => obj.isMesh);
      const intersects = raycaster.intersectObjects(meshObjects);

      if (intersects.length > 0) {
        setSelectedObject(intersects[0].object);
        transformControl.attach(intersects[0].object);
      } else {
        setSelectedObject(null);
        transformControl.detach();
      }
    }

    renderer.domElement.addEventListener('click', onMouseClick);

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    function handleResize() {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', onMouseClick);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;
    objects.forEach(obj => {
      if (!obj.parent) {
        sceneRef.current.add(obj);
      }
    });
  }, [objects]);

  useEffect(() => {
    if (!transformControlRef.current || !selectedObject) return;
    transformControlRef.current.attach(selectedObject);
  }, [selectedObject]);

  useEffect(() => {
    if (!transformControlRef.current) return;
    transformControlRef.current.setMode(transformMode);
  }, [transformMode]);

  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const distance = 12;

    switch (currentView) {
      case 'top':
        camera.position.set(0, distance, 0);
        controls.target.set(0, 0, 0);
        break;
      case 'front':
        camera.position.set(0, 0, distance);
        controls.target.set(0, 0, 0);
        break;
      case 'side':
        camera.position.set(distance, 0, 0);
        controls.target.set(0, 0, 0);
        break;
      case 'perspective':
        camera.position.set(8, 8, 8);
        controls.target.set(0, 0, 0);
        break;
    }
    controls.update();
  }, [currentView]);

  useEffect(() => {
    if (!sceneRef.current) return;
    
    const ambientLight = sceneRef.current.getObjectByName('ambientLight');
    const directionalLight = sceneRef.current.getObjectByName('directionalLight');
    const pointLight = sceneRef.current.getObjectByName('pointLight');

    if (ambientLight) ambientLight.visible = lights.ambient;
    if (directionalLight) directionalLight.visible = lights.directional;
    if (pointLight) pointLight.visible = lights.point;
  }, [lights]);

  return (
    <div className="viewport-container">
      <ViewControls />
      <GizmoControls />
      <div ref={containerRef} className="viewport" />
      <HelpTip />
    </div>
  );
}

export default Viewport;
