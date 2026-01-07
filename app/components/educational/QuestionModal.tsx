'use client';

import { Question } from './types';

interface QuestionModalProps {
  question: Question;
  onHint: () => void;
}

export default function QuestionModal({ question, onHint }: QuestionModalProps) {
  const progress = question.count / question.targetCount;

  return (
    <div className="rct-frame" style={{
      position: 'fixed',
      top: 60,
      right: 60,
      width: 320,
      zIndex: 3000,
    }}>
      <div className="rct-titlebar">
        <span style={{ fontSize: 16 }}>🎯 Your Mission</span>
      </div>

      <div className="rct-panel" style={{
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}>
        {/* Building Icon */}
        <div style={{ fontSize: 64 }}>{question.buildingIcon}</div>

        {/* Question Text */}
        <div style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'var(--rct-text-light)',
          textAlign: 'center',
          lineHeight: 1.3,
        }}>
          Place {question.targetCount} {question.buildingName}
          {question.targetCount > 1 ? 's' : ''}
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '100%',
          height: 40,
          background: 'var(--rct-panel-dark)',
          border: '3px solid var(--rct-frame-dark)',
          borderRadius: 8,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${progress * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%)',
            transition: 'width 0.4s ease-out',
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 22,
            fontWeight: 'bold',
            color: '#fff',
            textShadow: '2px 2px 0 rgba(0,0,0,0.5)',
          }}>
            {question.count} / {question.targetCount}
          </div>
        </div>

        {/* Hint Button */}
        <button
          onClick={onHint}
          className="rct-button"
          style={{
            padding: '10px 20px',
            fontSize: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span>💡</span>
          <span>Need Help?</span>
        </button>
      </div>
    </div>
  );
}
