import React from 'react';
import '../styles/SpenderTypeDescriptions.css';

const spenderTypes = [
  {
    name: 'YOLO Spendr',
    description:
      'Lives for the moment, thrives on luxury experiences, and values adventure and excitement.',
    color: '#ff4d4f', // Vibrant red
    icon: '🌟',
  },
  {
    name: 'Investr',
    description:
      'Focused on long-term goals, making smart financial decisions, and building a prosperous future.',
    color: '#00c6ff', // Teal
    icon: '📈',
  },
  {
    name: 'Balanced Budgetr',
    description:
      'Believes in harmony between spending and saving, ensuring a well-rounded financial lifestyle.',
    color: '#ffc107', // Gold
    icon: '⚖️',
  },
  {
    name: 'Deal Huntr',
    description:
      'Loves finding value in every dollar spent, with a knack for uncovering the best deals.',
    color: '#00ff6c', // Green
    icon: '🔍',
  },
];

function SpenderTypeDescriptions() {
  return (
    <div className="spender-types-page">
      <h1 className="spender-types-title">Discover Your Spender Type</h1>
      <div className="spender-types-container">
        {spenderTypes.map((type, index) => (
          <div
            key={index}
            className="spender-type-card"
            style={{ borderColor: type.color }}
          >
            <div className="spender-type-icon" style={{ background: type.color }}>
              {type.icon}
            </div>
            <h2>{type.name}</h2>
            <p>{type.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpenderTypeDescriptions;
