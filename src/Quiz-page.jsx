// QuizPage.js
import { useContext } from "react";
import { QuizContext } from "./quiz-context";
import QuizCard from "./quiz-card";
import { useNavigate } from "react-router-dom";

export default function QuizPage() {
  const { quiz, updateSelectedAnswer } = useContext(QuizContext);

  console.log(quiz);

  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/answers", { state: { quiz } });
  }

  return (
    <>
      <div>
        <ul>
          {quiz.map((question, index) => (
            <QuizCard
              key={index}
              questions={question.question}
              answers={question.answers}
              correctAnswer={question.correctAnswer}
              questionId={index} // Pass the question index
              setSelectedAnswer={
                (selectedAnswer) => updateSelectedAnswer(index, selectedAnswer) // Call the function to update selected answer
              }
            />
          ))}
        </ul>
      </div>
      <button className="btn btn-outline-dark btn-lg" onClick={handleNavigate}>
        Navigate
      </button>
    </>
  );
}
