import React from 'react';
import '../styles/Pricing.css';

function Pricing() {
  const handleUpgrade = () => {
    alert('Thank you for choosing the premium plan! Redirecting to payment...');
    // Add payment gateway or redirect logic here
  };

  return (
    <div className="pricing-page">
      <div className="pricing-header">
        <h1>Oops!</h1>
        <p>We're sorry, but this feature is only available for premium members.</p>
      </div>
      <div className="pricing-card">
        <h2>Unlock Premium Features</h2>
        <p>Enjoy access to "Likes Me" and more exclusive features with our Premium Plan.</p>
        <div className="pricing-details">
          <h3>$4/month</h3>
        </div>
        <button className="upgrade-button" onClick={handleUpgrade}>
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
}

export default Pricing;
