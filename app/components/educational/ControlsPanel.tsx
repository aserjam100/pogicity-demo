'use client';

export default function ControlsPanel() {
  return (
    <div className="rct-frame" style={{
      position: 'fixed',
      bottom: 20,
      left: 20,
      width: 280,
      zIndex: 3000,
    }}>
      <div className="rct-titlebar">
        <span style={{ fontSize: 14 }}>Controls</span>
      </div>

      <div className="rct-panel" style={{
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        fontSize: 14,
      }}>
        {/* Move Map */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>🖱️</span>
          <span>Click & Drag to move map</span>
        </div>

        {/* Arrow Keys */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>⌨️</span>
          <span>Arrow Keys to move map</span>
        </div>

        {/* Zoom */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>🔍</span>
          <span>Scroll to zoom in/out</span>
        </div>

        {/* Rotate */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>🔄</span>
          <span>Press R to rotate building</span>
        </div>
      </div>
    </div>
  );
}
