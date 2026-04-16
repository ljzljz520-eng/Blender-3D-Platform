import React, { useRef, useMemo, memo, useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { shallow } from 'zustand/shallow';
import useStore from '../store/useStore';

function EditModeHelper({ objectData }) {
  const meshRef = useRef();
  const { scene, camera, raycaster, mouse } = useThree();
  const { mode, editMode, selectedVertices, setSelectedVertices, selectedEdges, setSelectedEdges, selectedFaces, setSelectedFaces } = useStore(
    (state) => ({
      mode: state.mode,
      editMode: state.editMode,
      selectedVertices: state.selectedVertices,
      setSelectedVertices: state.setSelectedVertices,
      selectedEdges: state.selectedEdges,
      setSelectedEdges: state.setSelectedEdges,
      selectedFaces: state.selectedFaces,
      setSelectedFaces: state.setSelectedFaces
    }),
    shallow
  );

  const vertexHelperGeometry = useMemo(() => {
    if (mode !== 'edit' || editMode !== 'vertex' || !objectData) return null;
    
    const { type, geometry: geo } = objectData;
    let geometry;
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
    
    const positions = geometry.attributes.position;
    const vertices = [];
    for (let i = 0; i < positions.count; i++) {
      vertices.push(
        new THREE.Vector3(
          positions.getX(i),
          positions.getY(i),
          positions.getZ(i)
        )
      );
    }
    
    geometry.dispose();
    return { vertices, count: positions.count };
  }, [mode, editMode, objectData]);

  const edgeHelperGeometry = useMemo(() => {
    if (mode !== 'edit' || editMode !== 'edge' || !objectData) return null;
    
    const { type, geometry: geo } = objectData;
    let geometry;
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
    
    const positions = geometry.attributes.position;
    const index = geometry.index;
    const edges = [];
    const edgeSet = new Set();
    
    if (index) {
      for (let i = 0; i < index.count; i += 3) {
        const a = index.getX(i);
        const b = index.getX(i + 1);
        const c = index.getX(i + 2);
        
        const edgeKeys = [
          `${Math.min(a, b)}-${Math.max(a, b)}`,
          `${Math.min(b, c)}-${Math.max(b, c)}`,
          `${Math.min(c, a)}-${Math.max(c, a)}`
        ];
        
        edgeKeys.forEach((key, idx) => {
          if (!edgeSet.has(key)) {
            edgeSet.add(key);
            const [v1, v2] = [a, b, c, a].slice(idx, idx + 2);
            edges.push({
              start: new THREE.Vector3(
                positions.getX(v1),
                positions.getY(v1),
                positions.getZ(v1)
              ),
              end: new THREE.Vector3(
                positions.getX(v2),
                positions.getY(v2),
                positions.getZ(v2)
              ),
              index: edges.length
            });
          }
        });
      }
    } else {
      for (let i = 0; i < positions.count; i += 3) {
        const a = i;
        const b = i + 1;
        const c = i + 2;
        
        const edgeKeys = [
          `${Math.min(a, b)}-${Math.max(a, b)}`,
          `${Math.min(b, c)}-${Math.max(b, c)}`,
          `${Math.min(c, a)}-${Math.max(c, a)}`
        ];
        
        edgeKeys.forEach((key, idx) => {
          if (!edgeSet.has(key)) {
            edgeSet.add(key);
            const [v1, v2] = [a, b, c, a].slice(idx, idx + 2);
            edges.push({
              start: new THREE.Vector3(
                positions.getX(v1),
                positions.getY(v1),
                positions.getZ(v1)
              ),
              end: new THREE.Vector3(
                positions.getX(v2),
                positions.getY(v2),
                positions.getZ(v2)
              ),
              index: edges.length
            });
          }
        });
      }
    }
    
    geometry.dispose();
    return { edges, count: edges.length };
  }, [mode, editMode, objectData]);

  const handleVertexClick = (vertexIndex) => {
    if (mode !== 'edit' || editMode !== 'vertex') return;
    
    if (selectedVertices.includes(vertexIndex)) {
      setSelectedVertices(selectedVertices.filter((v) => v !== vertexIndex));
    } else {
      setSelectedVertices([...selectedVertices, vertexIndex]);
    }
  };

  const handleEdgeClick = (edgeIndex) => {
    if (mode !== 'edit' || editMode !== 'edge') return;
    
    if (selectedEdges.includes(edgeIndex)) {
      setSelectedEdges(selectedEdges.filter((e) => e !== edgeIndex));
    } else {
      setSelectedEdges([...selectedEdges, edgeIndex]);
    }
  };

  const faceHelperGeometry = useMemo(() => {
    if (mode !== 'edit' || editMode !== 'face' || !objectData) return null;
    
    const { type, geometry: geo } = objectData;
    let geometry;
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
    
    const positions = geometry.attributes.position;
    const index = geometry.index;
    const faces = [];
    
    if (index) {
      for (let i = 0; i < index.count; i += 3) {
        const a = index.getX(i);
        const b = index.getX(i + 1);
        const c = index.getX(i + 2);
        
        const v1 = new THREE.Vector3(
          positions.getX(a),
          positions.getY(a),
          positions.getZ(a)
        );
        const v2 = new THREE.Vector3(
          positions.getX(b),
          positions.getY(b),
          positions.getZ(b)
        );
        const v3 = new THREE.Vector3(
          positions.getX(c),
          positions.getY(c),
          positions.getZ(c)
        );
        
        const center = new THREE.Vector3().addVectors(v1, v2).add(v3).multiplyScalar(1 / 3);
        
        faces.push({
          vertices: [v1, v2, v3],
          center,
          index: faces.length
        });
      }
    } else {
      for (let i = 0; i < positions.count; i += 3) {
        const v1 = new THREE.Vector3(
          positions.getX(i),
          positions.getY(i),
          positions.getZ(i)
        );
        const v2 = new THREE.Vector3(
          positions.getX(i + 1),
          positions.getY(i + 1),
          positions.getZ(i + 1)
        );
        const v3 = new THREE.Vector3(
          positions.getX(i + 2),
          positions.getY(i + 2),
          positions.getZ(i + 2)
        );
        
        const center = new THREE.Vector3().addVectors(v1, v2).add(v3).multiplyScalar(1 / 3);
        
        faces.push({
          vertices: [v1, v2, v3],
          center,
          index: faces.length
        });
      }
    }
    
    geometry.dispose();
    return { faces, count: faces.length };
  }, [mode, editMode, objectData]);

  const handleFaceClick = (faceIndex) => {
    if (mode !== 'edit' || editMode !== 'face') return;
    
    if (selectedFaces.includes(faceIndex)) {
      setSelectedFaces(selectedFaces.filter((f) => f !== faceIndex));
    } else {
      setSelectedFaces([...selectedFaces, faceIndex]);
    }
  };

  if (mode !== 'edit' || !objectData) return null;

  return (
    <group position={objectData.position} rotation={objectData.rotation} scale={objectData.scale}>
      {editMode === 'vertex' && vertexHelperGeometry && (
        <>
          {vertexHelperGeometry.vertices.map((vertex, index) => (
            <mesh
              key={`vertex-${index}`}
              position={[vertex.x, vertex.y, vertex.z]}
              onClick={(e) => {
                e.stopPropagation();
                handleVertexClick(index);
              }}
            >
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshBasicMaterial
                color={selectedVertices.includes(index) ? '#ff0000' : '#ffff00'}
                depthTest={false}
              />
            </mesh>
          ))}
        </>
      )}

      {editMode === 'edge' && edgeHelperGeometry && (
        <>
          {edgeHelperGeometry.edges.map((edge, index) => {
            const midPoint = new THREE.Vector3().addVectors(edge.start, edge.end).multiplyScalar(0.5);
            return (
              <group key={`edge-${index}`}>
                <line>
                  <bufferGeometry>
                    <bufferAttribute
                      attach="attributes-position"
                      count={2}
                      array={new Float32Array([
                        edge.start.x, edge.start.y, edge.start.z,
                        edge.end.x, edge.end.y, edge.end.z
                      ])}
                      itemSize={3}
                    />
                  </bufferGeometry>
                  <lineBasicMaterial
                    color={selectedEdges.includes(index) ? '#ff0000' : '#00ffff'}
                    linewidth={2}
                    depthTest={false}
                  />
                </line>
                <mesh
                  position={[midPoint.x, midPoint.y, midPoint.z]}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdgeClick(index);
                  }}
                >
                  <sphereGeometry args={[0.03, 8, 8]} />
                  <meshBasicMaterial
                    color={selectedEdges.includes(index) ? '#ff0000' : '#00ffff'}
                    depthTest={false}
                  />
                </mesh>
              </group>
            );
          })}
        </>
      )}

      {editMode === 'face' && faceHelperGeometry && (
        <>
          {faceHelperGeometry.faces.map((face, index) => (
            <group key={`face-${index}`}>
              <mesh
                position={[face.center.x, face.center.y, face.center.z]}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFaceClick(index);
                }}
              >
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial
                  color={selectedFaces.includes(index) ? '#ff0000' : '#ff00ff'}
                  depthTest={false}
                />
              </mesh>
              <line>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={3}
                    array={new Float32Array([
                      face.vertices[0].x, face.vertices[0].y, face.vertices[0].z,
                      face.vertices[1].x, face.vertices[1].y, face.vertices[1].z,
                      face.vertices[2].x, face.vertices[2].y, face.vertices[2].z
                    ])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial
                  color={selectedFaces.includes(index) ? '#ff0000' : '#ff00ff'}
                  linewidth={1}
                  depthTest={false}
                />
              </line>
            </group>
          ))}
        </>
      )}
    </group>
  );
}

export default memo(EditModeHelper);