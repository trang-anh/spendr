import React, { useState } from 'react';
import '../styles/SignupPage1.css';

function SignupPage1({ onNext }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (formData.username && formData.password && formData.email) {
      onNext(formData);
    } else {
      alert('Please fill out all fields before proceeding.');
    }
  };

  return (
    <div className="signup-page-1">
      <div className="signup-card">
        <h1>Create Your Account</h1>
        <p>Let’s get started by setting up your basic account details.</p>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default SignupPage1;
