import * as THREE from 'three';
import { GLTFExporter } from 'three-stdlib';

export function exportToGLB(objects, filename = 'model.glb') {
  return new Promise((resolve, reject) => {
    const scene = new THREE.Scene();
    
    objects.forEach((obj) => {
      const mesh = createMeshFromObjectData(obj);
      if (mesh) {
        scene.add(mesh);
      }
    });

    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      (result) => {
        const blob = new Blob([result], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
        resolve();
      },
      (error) => {
        reject(error);
      },
      { binary: true }
    );
  });
}

function createMeshFromObjectData(objData) {
  let geometry;
  const { type, geometry: geo } = objData;

  switch (type) {
    case 'cube':
      geometry = new THREE.BoxGeometry(geo.width, geo.height, geo.depth);
      break;
    case 'sphere':
      geometry = new THREE.SphereGeometry(geo.radius, geo.widthSegments, geo.heightSegments);
      break;
    case 'cylinder':
      geometry = new THREE.CylinderGeometry(geo.radiusTop, geo.radiusBottom, geo.height, geo.radialSegments);
      break;
    case 'cone':
      geometry = new THREE.ConeGeometry(geo.radius, geo.height, geo.radialSegments);
      break;
    case 'torus':
      geometry = new THREE.TorusGeometry(geo.radius, geo.tube, geo.radialSegments, geo.tubularSegments);
      break;
    case 'plane':
      geometry = new THREE.PlaneGeometry(geo.width, geo.height);
      break;
    default:
      geometry = new THREE.BoxGeometry(1, 1, 1);
  }

  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(objData.color),
    roughness: 0.5,
    metalness: 0.1
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...objData.position);
  mesh.rotation.set(...objData.rotation);
  mesh.scale.set(...objData.scale);
  mesh.name = objData.name;

  return mesh;
}

export function exportToJSON(objects, filename = 'model.json') {
  const data = JSON.stringify(objects, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
