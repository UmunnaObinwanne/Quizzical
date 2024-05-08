import { useContext, useEffect, useState } from "react";
import { QuizContext } from "./quiz-context";
import QuizCard from "./quiz-card";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate

// Component representing the Quiz page
export default function QuizPage() {
  // Accessing context and state variables
  const { quiz, categories, updateSelectedAnswer, fetchQuizData } =
    useContext(QuizContext);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(quiz.length).fill(null)
  );
  const [score, setScore] = useState(0);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [completedOnce, setCompletedOnce] = useState(false);

  // Extracting category ID from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("category");

  // Find category name from the categories array
  const categoryName = categories.find(
    (cat) => cat.id === parseInt(categoryId)
  )?.name;

  // Fetch quiz data and reset state on component mount
  useEffect(() => {
    setSelectedAnswers(Array(quiz.length).fill(null));
    setScore(0);
    setRevealAnswers(false);
    setCompletedOnce(false);
    setSelectedAnswers(Array(quiz.length).fill(null));
    fetchQuizData(categoryId); // Fetch new quiz data based on selected category
  }, []);

  // Extracting correct answers from quiz data
  const correctAnswers = quiz.map((question) => question.correctAnswer);

  // Function to check if selected answer is correct
  const isCorrect = (selectedAnswer, correctAnswer) => {
    return selectedAnswer === correctAnswer;
  };

  // Function to handle click on an answer
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

  // Function to handle navigation after completing the quiz
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
      fetchQuizData(categoryId); // Fetch new quiz data based on selected category
    }
  };

  // Use useNavigate to navigate back to the Hero page
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <>
      {/* Button to navigate back to the Home page */}
      <button
        className="btn-outline rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mb-5"
        onClick={handleGoBack}
        style={{ marginTop: "10px" }}>
        Home
      </button>
      <div>
        {/* Displaying the category name */}
        <div className="flex flex-col w-full">
          <div className="grid h-20 card bg-base-300 rounded-box place-items-center bg-white-500">
            Category: {categoryName}
          </div>
        </div>
        <ul>
          {/* Rendering quiz cards */}
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
      {/* Displaying quiz score */}
      {revealAnswers && <h2>{`You scored ${score}/${quiz.length}`}</h2>}
      <div className="flex flex-row justify-center items-center space-x-4">
        {/* Button to navigate to the next quiz or try again */}
        <button
          className={`btn btn-outline rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
            completedOnce && revealAnswers ? "btn-lg" : ""
          }`}
          onClick={handleNavigate}
          style={{ marginTop: "10px" }}>
          {completedOnce && revealAnswers ? "Try Again" : "Check Answers"}
        </button>
        {/* Additional button to go back */}
        <button
          className="btn-outline rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          onClick={handleGoBack}
          style={{ marginTop: "10px" }}>
          Go Back
        </button>
      </div>
    </>
  );
}
