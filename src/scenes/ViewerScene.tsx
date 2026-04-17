import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, OrthographicCamera, Grid } from '@react-three/drei';
import { useSceneStore } from '../store/useSceneStore';
import SceneObject from '../components/SceneObject';
import LightingSystem from '../components/LightingSystem';
import TransformControls from '../components/TransformControls';

const ViewerScene = () => {
  const { viewMode, objects } = useSceneStore();

  const getCameraPosition = () => {
    switch (viewMode) {
      case 'top':
        return [0, 10, 0] as [number, number, number];
      case 'front':
        return [0, 0, 10] as [number, number, number];
      case 'side':
        return [10, 0, 0] as [number, number, number];
      case 'perspective':
      default:
        return [5, 5, 5] as [number, number, number];
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', background: '#1e1e1e' }}>
      <Canvas shadows gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}>
        {viewMode === 'perspective' ? (
          <PerspectiveCamera makeDefault position={getCameraPosition()} fov={75} />
        ) : (
          <OrthographicCamera
            makeDefault
            position={getCameraPosition()}
            zoom={100}
            near={0.1}
            far={1000}
          />
        )}

        <LightingSystem />
        <Grid args={[20, 20]} color="#444" fadeDistance={30} />
        <axesHelper args={[5]} />

        {objects.map((obj) => (
          <SceneObject key={obj.id} object={obj} />
        ))}

        <TransformControls />

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.05}
          minDistance={1}
          maxDistance={100}
        />
      </Canvas>
    </div>
  );
};

export default ViewerScene;
