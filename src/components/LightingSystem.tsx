const LightingSystem = () => {
  return (
    <>
      <ambientLight intensity={0.5} color="#ffffff" />
      
      <directionalLight
        castShadow
        position={[10, 10, 5]}
        intensity={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      <pointLight position={[-10, 10, -10]} intensity={0.3} color="#4a9eff" />
      
      <pointLight position={[10, -10, 10]} intensity={0.2} color="#ff6b6b" />
      
      <hemisphereLight intensity={0.3} groundColor="#444444" />
    </>
  );
};

export default LightingSystem;
