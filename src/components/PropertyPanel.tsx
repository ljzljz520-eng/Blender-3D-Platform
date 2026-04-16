import { useSceneStore } from '../store/useSceneStore';

const PropertyPanel = () => {
  const { selectedObjectId, objects, updateObject, materials, updateMaterial } = useSceneStore();
  const selectedObject = objects.find((obj) => obj.id === selectedObjectId);
  const selectedMaterial = selectedObject
    ? materials.find((m) => m.id === selectedObject.materialId)
    : null;

  const handlePositionChange = (axis: 0 | 1 | 2, value: number) => {
    if (!selectedObject) return;
    const newPosition = [...selectedObject.position] as [number, number, number];
    newPosition[axis] = value;
    updateObject(selectedObject.id, { position: newPosition });
  };

  const handleRotationChange = (axis: 0 | 1 | 2, value: number) => {
    if (!selectedObject) return;
    const newRotation = [...selectedObject.rotation] as [number, number, number];
    newRotation[axis] = value;
    updateObject(selectedObject.id, { rotation: newRotation });
  };

  const handleScaleChange = (axis: 0 | 1 | 2, value: number) => {
    if (!selectedObject) return;
    const newScale = [...selectedObject.scale] as [number, number, number];
    newScale[axis] = value;
    updateObject(selectedObject.id, { scale: newScale });
  };

  const handleMaterialChange = (key: 'color' | 'roughness' | 'metalness', value: any) => {
    if (!selectedMaterial) return;
    updateMaterial(selectedMaterial.id, { [key]: value });
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: 56,
        width: 300,
        height: 'calc(100vh - 56px)',
        background: '#2d2d2d',
        borderLeft: '1px solid #444',
        padding: 16,
        overflowY: 'auto',
        color: 'white',
        zIndex: 1000,
      }}
    >
      <h3 style={{ marginBottom: 16, fontSize: 16 }}>属性面板</h3>

      {selectedObject ? (
        <>
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ marginBottom: 12, fontSize: 14, color: '#aaa' }}>物体信息</h4>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>名称</label>
              <input
                type="text"
                value={selectedObject.name}
                onChange={(e) => updateObject(selectedObject.id, { name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  background: '#3d3d3d',
                  border: '1px solid #555',
                  borderRadius: 4,
                  color: 'white',
                  fontSize: 12,
                }}
              />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>类型</label>
              <div style={{ fontSize: 12, color: '#ddd' }}>{selectedObject.type}</div>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h4 style={{ marginBottom: 12, fontSize: 14, color: '#aaa' }}>位置</h4>
            {['X', 'Y', 'Z'].map((axis, index) => (
              <div key={axis} style={{ marginBottom: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ width: 20, fontSize: 12 }}>{axis}</span>
                <input
                  type="number"
                  step={0.1}
                  value={selectedObject.position[index as 0 | 1 | 2]}
                  onChange={(e) => handlePositionChange(index as 0 | 1 | 2, parseFloat(e.target.value))}
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    background: '#3d3d3d',
                    border: '1px solid #555',
                    borderRadius: 4,
                    color: 'white',
                    fontSize: 12,
                  }}
                />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 24 }}>
            <h4 style={{ marginBottom: 12, fontSize: 14, color: '#aaa' }}>旋转</h4>
            {['X', 'Y', 'Z'].map((axis, index) => (
              <div key={axis} style={{ marginBottom: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ width: 20, fontSize: 12 }}>{axis}</span>
                <input
                  type="number"
                  step={0.1}
                  value={selectedObject.rotation[index as 0 | 1 | 2]}
                  onChange={(e) => handleRotationChange(index as 0 | 1 | 2, parseFloat(e.target.value))}
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    background: '#3d3d3d',
                    border: '1px solid #555',
                    borderRadius: 4,
                    color: 'white',
                    fontSize: 12,
                  }}
                />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 24 }}>
            <h4 style={{ marginBottom: 12, fontSize: 14, color: '#aaa' }}>缩放</h4>
            {['X', 'Y', 'Z'].map((axis, index) => (
              <div key={axis} style={{ marginBottom: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ width: 20, fontSize: 12 }}>{axis}</span>
                <input
                  type="number"
                  step={0.1}
                  min={0.1}
                  value={selectedObject.scale[index as 0 | 1 | 2]}
                  onChange={(e) => handleScaleChange(index as 0 | 1 | 2, parseFloat(e.target.value))}
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    background: '#3d3d3d',
                    border: '1px solid #555',
                    borderRadius: 4,
                    color: 'white',
                    fontSize: 12,
                  }}
                />
              </div>
            ))}
          </div>

          {selectedMaterial && (
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ marginBottom: 12, fontSize: 14, color: '#aaa' }}>材质</h4>
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>颜色</label>
                <input
                  type="color"
                  value={selectedMaterial.color}
                  onChange={(e) => handleMaterialChange('color', e.target.value)}
                  style={{ width: '100%', height: 32, border: 'none', borderRadius: 4, cursor: 'pointer' }}
                />
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>
                  粗糙度: {selectedMaterial.roughness.toFixed(2)}
                </label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={selectedMaterial.roughness}
                  onChange={(e) => handleMaterialChange('roughness', parseFloat(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>
                  金属度: {selectedMaterial.metalness.toFixed(2)}
                </label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={selectedMaterial.metalness}
                  onChange={(e) => handleMaterialChange('metalness', parseFloat(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div style={{ color: '#888', fontSize: 12, textAlign: 'center', marginTop: 40 }}>
          请选择一个物体以查看和编辑属性
        </div>
      )}
    </div>
  );
};

export default PropertyPanel;
