import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupPage1 from './SignupPage1';
import SignupPage2 from './SignupPage2';

function SignupProcess({ setUser }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = (data) => {
    const finalData = { ...formData, ...data };
    console.log('Signup Complete:', finalData);

    // Update the centralized user state
    setUser(finalData);

    // Redirect to the dashboard
    navigate('/dashboard');
  };

  return (
    <div>
      {step === 1 && <SignupPage1 onNext={handleNext} />}
      {step === 2 && <SignupPage2 onPrevious={handlePrevious} onSubmit={handleSubmit} />}
    </div>
  );
}

export default SignupProcess;
