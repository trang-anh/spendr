import React from 'react';

function Pricing() {
  return (
    <div className="pricing-page">
      <h1>Upgrade to Premium</h1>
      <p>Get access to premium features like "Liked Me" and more!</p>
      <button onClick={() => (window.location.href = '/dashboard')}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default Pricing;
