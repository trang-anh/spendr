import React from 'react';

function QuizQuestion({ question, index, options, onChange }) {
  return (
    <div className="quiz-question">
      <p>{question}</p>
      {options.map((option, optionIndex) => (
        <label key={optionIndex} style={{ marginRight: '10px' }}>
          <input
            type="radio"
            name={`question-${index}`}
            value={option.type}
            onChange={() => onChange(index, option.type)}
            required
          />
          {option.text} {/* Display the text of the answer */}
        </label>
      ))}
    </div>
  );
}

export default QuizQuestion;
