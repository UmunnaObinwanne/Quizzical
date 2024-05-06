import { useContext, useState } from "react";
import { QuizContext } from "./quiz-context";
import QuizCard from "./quiz-card";
import { useLocation } from "react-router-dom";

export default function QuizPage() {
  const { quiz, updateSelectedAnswer, fetchQuizData } = useContext(QuizContext);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(quiz.length).fill(null)
  );
  const [score, setScore] = useState(0);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [completedOnce, setCompletedOnce] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  console.log(category);

  const correctAnswers = quiz.map((question) => question.correctAnswer);

  const isCorrect = (selectedAnswer, correctAnswer) => {
    return selectedAnswer === correctAnswer;
  };

  const handleClick = (selectedAnswer, correctAnswer, questionIndex) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const updatedSelectedAnswers = [...prevSelectedAnswers];
      updatedSelectedAnswers[questionIndex] = selectedAnswer;
      return updatedSelectedAnswers;
    });

    updateSelectedAnswer(selectedAnswer);

    if (isCorrect(selectedAnswer, correctAnswer)) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNavigate = () => {
    if (!completedOnce) {
      setRevealAnswers(true);
      setCompletedOnce(true);
    } else {
      setSelectedAnswers(Array(quiz.length).fill(null));
      setScore(0);
      setRevealAnswers(false);
      setCompletedOnce(false);
      setSelectedAnswers(Array(quiz.length).fill(null));
      fetchQuizData(category); // Fetch new quiz data based on selected category
    }
  };

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
              questionId={index}
              selectedAnswer={selectedAnswers[index]}
              revealAnswers={revealAnswers}
              handleClick={(selectedAnswer) =>
                handleClick(selectedAnswer, correctAnswers[index], index)
              }
            />
          ))}
        </ul>
      </div>
      {revealAnswers && <h2>{`You scored ${score}/${quiz.length}`}</h2>}
      <button
        className={`btn btn-outline btn-warning rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
          completedOnce && revealAnswers ? "btn-lg" : ""
        }`}
        onClick={handleNavigate}
        style={{ marginTop: "10px" }}>
        {completedOnce && revealAnswers ? "Try Again" : "Check Answers"}
      </button>
    </>
  );
}
