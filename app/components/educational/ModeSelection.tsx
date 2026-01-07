'use client';

import { useState } from 'react';
import { playDoubleClickSound } from '@/app/utils/sounds';

interface ModeSelectionProps {
  onSelectMode: (mode: 'educational' | 'sandbox') => void;
}

export default function ModeSelection({ onSelectMode }: ModeSelectionProps) {
  const [selectedOption, setSelectedOption] = useState<'educational' | 'sandbox'>('educational');

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#000',
      fontFamily: '"Courier New", Courier, monospace',
      imageRendering: 'pixelated',
    }}>
      {/* Title with gradient effect */}
      <div style={{
        fontSize: 84,
        fontWeight: 'bold',
        letterSpacing: '8px',
        marginBottom: 120,
        background: 'linear-gradient(180deg, #FFD700 0%, #FF8C00 50%, #DC143C 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textShadow: '4px 4px 0 rgba(0,0,0,0.5)',
        filter: 'drop-shadow(4px 4px 0 rgba(0,0,0,0.5))',
      }}>
        MATH CITY
      </div>

      {/* Menu options */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        fontSize: 32,
        fontWeight: 'bold',
      }}>
        {/* Educational Mode */}
        <button
          onClick={() => {
            playDoubleClickSound();
            onSelectMode('educational');
          }}
          onMouseEnter={() => setSelectedOption('educational')}
          style={{
            background: 'transparent',
            border: 'none',
            color: selectedOption === 'educational' ? '#FFD700' : '#FFF',
            fontSize: 32,
            fontFamily: '"Courier New", Courier, monospace',
            fontWeight: 'bold',
            cursor: 'pointer',
            textAlign: 'left',
            padding: '12px 24px',
            letterSpacing: '4px',
            transition: 'all 0.1s',
            textShadow: selectedOption === 'educational'
              ? '2px 2px 0 #000, -1px -1px 0 #FF8C00'
              : '2px 2px 0 #000',
          }}
        >
          {selectedOption === 'educational' ? '▶ ' : '  '}1 LEARN MODE
        </button>

        {/* Sandbox Mode */}
        <button
          onClick={() => {
            playDoubleClickSound();
            onSelectMode('sandbox');
          }}
          onMouseEnter={() => setSelectedOption('sandbox')}
          style={{
            background: 'transparent',
            border: 'none',
            color: selectedOption === 'sandbox' ? '#FFD700' : '#FFF',
            fontSize: 32,
            fontFamily: '"Courier New", Courier, monospace',
            fontWeight: 'bold',
            cursor: 'pointer',
            textAlign: 'left',
            padding: '12px 24px',
            letterSpacing: '4px',
            transition: 'all 0.1s',
            textShadow: selectedOption === 'sandbox'
              ? '2px 2px 0 #000, -1px -1px 0 #FF8C00'
              : '2px 2px 0 #000',
          }}
        >
          {selectedOption === 'sandbox' ? '▶ ' : '  '}2 FREE BUILD
        </button>
      </div>

      {/* Bottom text */}
      <div style={{
        position: 'absolute',
        bottom: 60,
        fontSize: 16,
        color: '#888',
        fontFamily: '"Courier New", Courier, monospace',
        letterSpacing: '2px',
      }}>
        © 2025 MATH CITY
      </div>
    </div>
  );
}
