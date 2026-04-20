import React, { useState, useEffect } from 'react';

function HelpTip() {
  const [showTip, setShowTip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTip(false);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  if (!showTip) return null;

  return (
    <div className="help-tip">
      <div className="help-tip-title">💡 使用提示</div>
      <p>• 点击左侧工具栏添加几何体</p>
      <p>• 点击场景中的对象进行选择</p>
      <p>• 使用底部按钮切换变换模式</p>
      <p>• 鼠标滚轮缩放，左键旋转，右键平移</p>
      <button
        onClick={() => setShowTip(false)}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'none',
          border: 'none',
          color: '#8892b0',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        ×
      </button>
    </div>
  );
}

export default HelpTip;
