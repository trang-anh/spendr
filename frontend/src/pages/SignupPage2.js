import React, { useState } from 'react';
import QuizQuestion from '../components/QuizQuestion';

function SignupPage2({ onPrevious, onSubmit }) {
  const [profileData, setProfileData] = useState({
    gender: '',
    sexuality: '',
    age: '',
    location: '',
    quizAnswers: [],
  });

  const questions = [
    {
      question: "You just won $10 million in a lottery. What’s your first move?",
      options: [
        { text: 'Invest in crypto, real estate, or stocks.', type: 'Investr' },
        { text: 'Buy luxury experiences and vacations.', type: 'YOLO Spendr' },
        { text: 'Pay off debts and help family.', type: 'Balanced Budgetr' },
        { text: 'Save most but splurge a little.', type: 'Deal Huntr' },
      ],
    },
    {
      question: "Which of these sounds like your ideal side hustle?",
      options: [
        { text: 'Flipping NFTs or trading crypto.', type: 'Investr' },
        { text: 'Starting a luxury brand.', type: 'YOLO Spendr' },
        { text: 'Selling thrifted clothes online.', type: 'Deal Huntr' },
        { text: 'Running a personal finance channel.', type: 'Balanced Budgetr' },
      ],
    },
    {
      question: "If you had $100 to spend right now, what would you do?",
      options: [
        { text: 'Put it into savings or investments.', type: 'Investr' },
        { text: 'Buy tickets for a luxury concert.', type: 'YOLO Spendr' },
        { text: 'Splurge on takeout with friends.', type: 'Balanced Budgetr' },
        { text: 'Buy tech gadgets on sale.', type: 'Deal Huntr' },
      ],
    },
    {
      question: "What’s your vibe when it comes to budgeting?",
      options: [
        { text: 'Track every dollar with apps.', type: 'Balanced Budgetr' },
        { text: 'Spend based on the moment.', type: 'YOLO Spendr' },
        { text: 'Find deals without compromising.', type: 'Deal Huntr' },
        { text: 'Save for long-term goals.', type: 'Investr' },
      ],
    },
    {
      question: "What’s your dream financial goal?",
      options: [
        { text: 'Retire early with investments.', type: 'Investr' },
        { text: 'Afford luxuries without worry.', type: 'YOLO Spendr' },
        { text: 'Live debt-free and stress-free.', type: 'Balanced Budgetr' },
        { text: 'Travel without overspending.', type: 'Deal Huntr' },
      ],
    },
    {
      question: "How do you feel about online shopping?",
      options: [
        { text: 'Buy only essentials with discounts.', type: 'Deal Huntr' },
        { text: 'Add items to cart during sales.', type: 'YOLO Spendr' },
        { text: 'Research prices before buying.', type: 'Investr' },
        { text: 'Shop occasionally, sticking to a budget.', type: 'Balanced Budgetr' },
      ],
    },
    {
      question: "You’re at brunch and the bill is split evenly even though you ordered less. What do you do?",
      options: [
        { text: 'Suggest paying only for your order.', type: 'Balanced Budgetr' },
        { text: 'Agree without hesitation.', type: 'YOLO Spendr' },
        { text: 'Feel awkward but go along.', type: 'Deal Huntr' },
        { text: 'Offer to calculate exact amounts.', type: 'Investr' },
      ],
    },
    {
      question: "What’s your biggest financial flex?",
      options: [
        { text: 'Making passive income with investments.', type: 'Investr' },
        { text: 'Affording luxuries without worry.', type: 'YOLO Spendr' },
        { text: 'Paying off debts completely.', type: 'Balanced Budgetr' },
        { text: 'Finding the best deals.', type: 'Deal Huntr' },
      ],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleQuizChange = (index, answer) => {
    const updatedAnswers = [...profileData.quizAnswers];
    updatedAnswers[index] = answer;
    setProfileData({
      ...profileData,
      quizAnswers: updatedAnswers,
    });
  };

  const calculateSpenderType = () => {
    const counts = {
      'YOLO Spendr': 0,
      'Investr': 0,
      'Balanced Budgetr': 0,
      'Deal Huntr': 0,
    };

    profileData.quizAnswers.forEach((answer) => {
      counts[answer] += 1;
    });

    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const spenderType = calculateSpenderType();
    const finalData = { ...profileData, spenderType };
    onSubmit(finalData); // Pass profile and quiz data to the parent
  };

  return (
    <div className="signup-page">
      <h1>Complete Your Profile</h1>
      <form onSubmit={handleSubmit}>
        {/* Profile Inputs */}
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="sexuality">Sexuality</label>
          <input
            type="text"
            id="sexuality"
            name="sexuality"
            value={profileData.sexuality}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={profileData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={profileData.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Quiz Questions */}
        <h2>Spending Type Quiz</h2>
        {questions.map((q, index) => (
          <QuizQuestion
            key={index}
            question={q.question}
            options={q.options}
            index={index}
            onChange={handleQuizChange}
          />
        ))}

        <div className="button-group">
          <button type="button" onClick={onPrevious}>
            Back
          </button>
          <button type="submit">Finish</button>
        </div>
      </form>
    </div>
  );
}

export default SignupPage2;
