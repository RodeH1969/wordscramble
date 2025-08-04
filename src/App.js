import React, { useState } from 'react';
import { Settings, Save, RotateCcw } from 'lucide-react';

const WordScramble = () => {
  const [centerLetter, setCenterLetter] = useState('U');
  const [outerLetters, setOuterLetters] = useState(['E', 'N', 'R', 'Q', 'N', 'T', 'E', 'I', 'F']);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [tempCenterLetter, setTempCenterLetter] = useState(centerLetter);
  const [tempOuterLetters, setTempOuterLetters] = useState([...outerLetters]);

  const handleSaveChanges = () => {
    setCenterLetter(tempCenterLetter.toUpperCase());
    setOuterLetters(tempOuterLetters.map(letter => letter.toUpperCase()));
    setIsAdminMode(false);
  };

  const handleCancelChanges = () => {
    setTempCenterLetter(centerLetter);
    setTempOuterLetters([...outerLetters]);
    setIsAdminMode(false);
  };

  const handleOuterLetterChange = (index, value) => {
    const newLetters = [...tempOuterLetters];
    newLetters[index] = value.slice(-1).toUpperCase();
    setTempOuterLetters(newLetters);
  };

  const generateRandomLetters = () => {
    const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    setTempCenterLetter(allLetters[Math.floor(Math.random() * allLetters.length)]);
    
    const newOuterLetters = [];
    for (let i = 0; i < 9; i++) {
      newOuterLetters.push(allLetters[Math.floor(Math.random() * allLetters.length)]);
    }
    setTempOuterLetters(newOuterLetters);
  };

  const getLetterPosition = (index, total = 9) => {
    const angle = (index * 360) / total - 90;
    const radius = 120;
    const x = Math.cos(angle * Math.PI / 180) * radius;
    const y = Math.sin(angle * Math.PI / 180) * radius;
    return { x, y, angle };
  };

  if (isAdminMode) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
        padding: '16px'
      }}>
        <div style={{ maxWidth: '384px', margin: '0 auto' }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            padding: '24px'
          }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '24px',
              color: '#1f2937'
            }}>
              Admin Settings
            </h1>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Center Letter
              </label>
              <input
                type="text"
                value={tempCenterLetter}
                onChange={(e) => setTempCenterLetter(e.target.value.slice(-1).toUpperCase())}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  outline: 'none'
                }}
                maxLength="1"
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Outer Letters
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px'
              }}>
                {tempOuterLetters.map((letter, index) => (
                  <input
                    key={index}
                    type="text"
                    value={letter}
                    onChange={(e) => handleOuterLetterChange(index, e.target.value)}
                    style={{
                      padding: '12px',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      outline: 'none'
                    }}
                    maxLength="1"
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={generateRandomLetters}
              style={{
                width: '100%',
                marginBottom: '16px',
                background: '#8b5cf6',
                color: 'white',
                fontWeight: 'bold',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => e.target.style.background = '#7c3aed'}
              onMouseOut={(e) => e.target.style.background = '#8b5cf6'}
            >
              <RotateCcw size={20} />
              Generate Random Letters
            </button>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleCancelChanges}
                style={{
                  flex: '1',
                  background: '#6b7280',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.target.style.background = '#4b5563'}
                onMouseOut={(e) => e.target.style.background = '#6b7280'}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                style={{
                  flex: '1',
                  background: '#10b981',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseOver={(e) => e.target.style.background = '#059669'}
                onMouseOut={(e) => e.target.style.background = '#10b981'}
              >
                <Save size={20} />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
      padding: '16px'
    }}>
      <div style={{ maxWidth: '384px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div>
              <svg width="48" height="48" viewBox="0 0 48 48" style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}>
                <circle cx="24" cy="24" r="22" fill="none" stroke="#1f2937" strokeWidth="2"/>
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i * 45) * Math.PI / 180;
                  const x1 = 24 + Math.cos(angle) * 12;
                  const y1 = 24 + Math.sin(angle) * 12;
                  const x2 = 24 + Math.cos(angle) * 20;
                  const y2 = 24 + Math.sin(angle) * 20;
                  return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6366f1" strokeWidth="2"/>
                  );
                })}
                <circle cx="24" cy="24" r="10" fill="#ef4444" stroke="#1f2937" strokeWidth="2"/>
                <text x="24" y="28" textAnchor="middle" fill="white" fontWeight="bold" fontSize="12">W</text>
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i * 45 + 22.5) * Math.PI / 180;
                  const x = 24 + Math.cos(angle) * 18;
                  const y = 24 + Math.sin(angle) * 18;
                  return (
                    <circle key={i} cx={x} cy={y} r="2" fill="#6366f1"/>
                  );
                })}
              </svg>
            </div>
            <div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1f2937',
                lineHeight: '1.2',
                margin: '0'
              }}>Word</h1>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#4f46e5',
                lineHeight: '1.2',
                margin: '0',
                marginTop: '-4px'
              }}>Scramble</h2>
            </div>
          </div>
          <button
            onClick={() => setIsAdminMode(true)}
            style={{
              padding: '12px',
              background: '#3b82f6',
              color: 'white',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseOver={(e) => e.target.style.background = '#2563eb'}
            onMouseOut={(e) => e.target.style.background = '#3b82f6'}
          >
            <Settings size={24} />
          </button>
        </div>

        {/* Game Board */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '32px',
          marginBottom: '24px'
        }}>
          <div style={{
            position: 'relative',
            width: '320px',
            height: '320px',
            margin: '0 auto'
          }}>
            {/* Outer circle background */}
            <div style={{
              position: 'absolute',
              inset: '0',
              border: '4px solid #1f2937',
              borderRadius: '50%'
            }}></div>
            
            {/* Outer connecting ring */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '240px',
              height: '240px',
              transform: 'translate(-50%, -50%)',
              border: '4px solid #1f2937',
              borderRadius: '50%'
            }}></div>
            
            {/* Inner circle */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '96px',
              height: '96px',
              background: '#ef4444',
              borderRadius: '50%',
              border: '4px solid #1f2937',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <span style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'white'
              }}>{centerLetter}</span>
            </div>

            {/* Outer letters */}
            {outerLetters.map((letter, index) => {
              const { x, y } = getLetterPosition(index);
              return (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    width: '48px',
                    height: '48px',
                    background: '#1e3a8a',
                    border: '4px solid #1f2937',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    color: 'white',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    left: `calc(50% + ${x}px - 24px)`,
                    top: `calc(50% + ${y}px - 24px)`
                  }}
                >
                  {letter}
                </div>
              );
            })}

            {/* Divider lines */}
            {Array.from({ length: 9 }).map((_, index) => {
              const innerRadius = 48;
              const outerRadius = 96;
              const angle = (index * 360) / 9 - 90;
              const innerX = Math.cos(angle * Math.PI / 180) * innerRadius;
              const innerY = Math.sin(angle * Math.PI / 180) * innerRadius;
              const outerX = Math.cos(angle * Math.PI / 180) * outerRadius;
              const outerY = Math.sin(angle * Math.PI / 180) * outerRadius;
              
              return (
                <div
                  key={`line-${index}`}
                  style={{
                    position: 'absolute',
                    background: '#1f2937',
                    left: `calc(50% + ${innerX}px)`,
                    top: `calc(50% + ${innerY}px)`,
                    width: `${Math.sqrt((outerX - innerX) ** 2 + (outerY - innerY) ** 2)}px`,
                    height: '3px',
                    transformOrigin: '0 50%',
                    transform: `rotate(${Math.atan2(outerY - innerY, outerX - innerX) * 180 / Math.PI}deg)`
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          padding: '16px'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '8px',
            margin: '0 0 8px 0'
          }}>How to Play</h2>
          <p style={{
            color: '#6b7280',
            fontSize: '14px',
            margin: '0'
          }}>
            Create words using the letters from the wheel. Every word must include the center letter ({centerLetter}). 
            Tap the settings icon to change letters for a new game.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WordScramble;