import "./QuizCard.css"; // Import the CSS file
import he from "he";
import { useState } from "react";

export default function QuizCard({ questions, answers, correctAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const decodedAnswers = answers.map((answer) => he.decode(answer));

  const handleClick = (selectedAnswer) => {
    setSelectedAnswer(selectedAnswer);
    console.log(`You selected ${selectedAnswer}`);
  };

  return (
    <div className="quiz-card">
      <h3 className="question">{questions}</h3>
      {decodedAnswers.map((answer, index) => (
        <button
          key={index}
          onClick={() => handleClick(answer)}
          className={selectedAnswer === answer ? "selected" : ""}>
          {answer}
        </button>
      ))}
      <div className="answers"></div>
    </div>
  );
}
