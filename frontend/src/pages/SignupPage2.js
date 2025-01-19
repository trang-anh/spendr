import React, { useState } from 'react';
import '../styles/SignUpPage2.css';

const quizQuestions = [
  {
    id: 1,
    question: 'You just got a bonus at work. What do you do with it?',
    options: [
      { text: 'Splurge on a dream vacation', type: 'YOLO' },
      { text: 'Invest in stocks or real estate', type: 'Investr' },
      { text: 'Save half and spend half responsibly', type: 'Budgetr' },
      { text: 'Hunt for deals to maximize its value', type: 'Deal Huntr' },
    ],
  },
  {
    id: 2,
    question: 'What’s your go-to weekend activity?',
    options: [
      { text: 'Exploring new experiences or dining out', type: 'YOLO' },
      { text: 'Researching and planning for financial goals', type: 'Investr' },
      { text: 'A balanced mix of relaxation and productivity', type: 'Budgetr' },
      { text: 'Shopping and finding the best discounts', type: 'Deal Huntr' },
    ],
  },
  {
    id: 3,
    question: 'What’s your attitude toward budgeting?',
    options: [
      { text: 'I don’t bother—I want to live my best life', type: 'YOLO' },
      { text: 'I meticulously track every penny', type: 'Investr' },
      { text: 'I maintain a sensible budget', type: 'Budgetr' },
      { text: 'I prioritize finding the best deals', type: 'Deal Huntr' },
    ],
  },
  {
    id: 4,
    question: 'What’s your dream purchase?',
    options: [
      { text: 'A luxurious car or high-end gadget', type: 'YOLO' },
      { text: 'A property or stock investment', type: 'Investr' },
      { text: 'A practical yet high-quality product', type: 'Budgetr' },
      { text: 'An item I scored at an unbeatable price', type: 'Deal Huntr' },
    ],
  },
];

function SignUpPage2({ onPrevious, onSubmit }) {
  const [formData, setFormData] = useState({
    gender: '',
    sexuality: '',
    age: 18,
    location: '',
    spenderType: '',
    quizAnswers: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSliderChange = (e) => {
    setFormData({ ...formData, age: e.target.value });
  };

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...formData.quizAnswers];
    newAnswers[currentQuestion] = answer;
    setFormData({ ...formData, quizAnswers: newAnswers });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true); // Mark the quiz as complete
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateSpenderType = () => {
    const typeCounts = formData.quizAnswers.reduce((acc, answer) => {
      const spenderType = answer.type;
      acc[spenderType] = (acc[spenderType] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(typeCounts).reduce((a, b) =>
      typeCounts[a] > typeCounts[b] ? a : b
    );
  };

  const handleSubmit = () => {
    const spenderType = calculateSpenderType();
    const finalData = { ...formData, spenderType };
    onSubmit(finalData);
  };

  return (
    <div className="signup-page-2">
      <div className="signup-card">
        <h1>Tell Us About Yourself</h1>

        {/* Quiz Section */}
        {!quizComplete ? (
          <div className="quiz-section">
            <h2>Question {currentQuestion + 1}</h2>
            <p>{quizQuestions[currentQuestion].question}</p>
            <div className="quiz-options">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`quiz-option ${
                    formData.quizAnswers[currentQuestion]?.text === option.text
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option.text}
                </button>
              ))}
            </div>
            <div className="quiz-navigation">
              <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
                Previous
              </button>
              <button onClick={handleNextQuestion}>
                {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Gender */}
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Sexuality */}
            <div className="form-group">
              <label>Sexuality</label>
              <select
                name="sexuality"
                value={formData.sexuality}
                onChange={handleChange}
              >
                <option value="">Select Sexuality</option>
                <option value="Heterosexual">Heterosexual</option>
                <option value="Homosexual">Homosexual</option>
                <option value="Bisexual">Bisexual</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Age */}
            <div className="form-group">
              <label>Age: {formData.age}</label>
              <input
                type="range"
                name="age"
                min="18"
                max="100"
                value={formData.age}
                onChange={handleSliderChange}
              />
            </div>

            {/* Location */}
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your location"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="button-group">
              <button className="previous-button" onClick={onPrevious}>
                Back
              </button>
              <button className="next-button" onClick={handleSubmit}>
                Finish
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SignUpPage2;
