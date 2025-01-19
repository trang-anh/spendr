import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SpenderTypeDescriptions.css';

function SpenderTypeDescriptions() {
  const navigate = useNavigate();

  return (
    <div className="spender-type-descriptions">
      <h1>Spender Types</h1>
      <p>Learn more about the different spender types:</p>

      <div className="spender-card">
        <h2>YOLO Spendr</h2>
        <p>
          The YOLO Spendr lives for the moment and believes in making every day
          count. They thrive on spontaneity, indulging in luxury experiences, and
          creating unforgettable memories.
        </p>
      </div>

      <div className="spender-card">
        <h2>Investr</h2>
        <p>
          The Investr is all about building a secure and prosperous future. They
          prioritize smart financial decisions like investing in stocks, real
          estate, or personal development.
        </p>
      </div>

      <div className="spender-card">
        <h2>Balanced Budgetr</h2>
        <p>
          The Balanced Budgetr believes in harmony between spending and saving.
          They carefully manage their finances to enjoy life while planning for
          the future.
        </p>
      </div>

      <div className="spender-card">
        <h2>Deal Huntr</h2>
        <p>
          The Deal Huntr takes pride in savvy spending. Whether it’s scoring
          discounts or finding hidden bargains, they make the most of every
          dollar.
        </p>
      </div>

      <button className="back-button" onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default SpenderTypeDescriptions;
