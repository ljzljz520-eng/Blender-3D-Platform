import { useSceneStore } from '../store/useSceneStore';

const ProjectPanel = () => {
  const { objects, selectObject, selectedObjectId, updateObject, deleteObject } = useSceneStore();

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 56,
        width: 250,
        height: 'calc(100vh - 56px)',
        background: '#2d2d2d',
        borderRight: '1px solid #444',
        padding: 16,
        overflowY: 'auto',
        color: 'white',
        zIndex: 1000,
      }}
    >
      <h3 style={{ marginBottom: 16, fontSize: 16 }}>项目管理</h3>

      <div style={{ marginBottom: 16 }}>
        <h4 style={{ marginBottom: 12, fontSize: 14, color: '#aaa' }}>场景物体</h4>
        {objects.length === 0 ? (
          <div style={{ color: '#888', fontSize: 12, textAlign: 'center', padding: '20px 0' }}>
            暂无物体，请从工具栏创建
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {objects.map((obj) => (
              <div
                key={obj.id}
                onClick={() => selectObject(obj.id)}
                style={{
                  padding: '8px 10px',
                  background: selectedObjectId === obj.id ? '#4a9eff' : '#3d3d3d',
                  borderRadius: 4,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 12,
                }}
                onMouseEnter={(e) => {
                  if (selectedObjectId !== obj.id) {
                    e.currentTarget.style.background = '#4d4d4d';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedObjectId !== obj.id) {
                    e.currentTarget.style.background = '#3d3d3d';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      updateObject(obj.id, { visible: !obj.visible });
                    }}
                    style={{ cursor: 'pointer', fontSize: 14 }}
                  >
                    {obj.visible ? '👁️' : '👁️‍🗨️'}
                  </span>
                  <span style={{ flex: 1 }}>{obj.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteObject(obj.id);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ff6b6b',
                    cursor: 'pointer',
                    fontSize: 14,
                    padding: 0,
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ paddingTop: 16, borderTop: '1px solid #444' }}>
        <h4 style={{ marginBottom: 12, fontSize: 14, color: '#aaa' }}>统计信息</h4>
        <div style={{ fontSize: 12, color: '#ddd', lineHeight: '20px' }}>
          <div>物体数量: {objects.length}</div>
          <div>顶点数: {objects.length * 24} 估算</div>
          <div>面数: {objects.length * 12} 估算</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPanel;
