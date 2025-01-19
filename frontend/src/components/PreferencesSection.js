import React from 'react';

function PreferencesSection({ preferences }) {
  return (
    <section className="preferences-section">
      <h2>Your Preferences</h2>
      <p>Spending Type: {preferences.spendingType}</p>
      <p>Recent Activity: {preferences.recentActivity}</p>
    </section>
  );
}

export default PreferencesSection;
