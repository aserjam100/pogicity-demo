'use client';

import { useEffect } from 'react';
import { playDoubleClickSound } from '@/app/utils/sounds';

interface CelebrationModalProps {
  isVisible: boolean;
  message: string;
  onContinue: () => void;
}

export default function CelebrationModal({
  isVisible,
  message,
  onContinue
}: CelebrationModalProps) {
  useEffect(() => {
    if (isVisible) {
      playDoubleClickSound();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 5000,
    }}>
      <div className="rct-frame" style={{
        width: 550,
        animation: 'bounce 0.6s ease',
      }}>
        <div className="rct-titlebar">
          <span style={{ fontSize: 36 }}>🎉 Fantastic!</span>
        </div>

        <div className="rct-panel" style={{
          padding: 56,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 36,
        }}>
          <div style={{
            fontSize: 120,
          }}>
            ⭐
          </div>

          <div style={{
            fontSize: 40,
            fontWeight: 'bold',
            color: 'var(--rct-text-light)',
            textAlign: 'center',
            lineHeight: 1.4,
          }}>
            {message}
          </div>

          <button
            onClick={onContinue}
            className="rct-button"
            style={{
              padding: '24px 48px',
              fontSize: 36,
              fontWeight: 'bold',
              background: '#4CAF50',
              color: '#fff',
            }}
          >
            Keep Going! →
          </button>
        </div>
      </div>
    </div>
  );
}
