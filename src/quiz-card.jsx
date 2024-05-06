import { useEffect, useState } from "react";
import he from "he";

export default function QuizCard({
  questions,
  answers,
  correctAnswer,
  selectedAnswer: propSelectedAnswer,
  revealAnswers,
  handleClick,
}) {
  const decodedAnswers = answers.map((answer) => he.decode(answer));
  const [selectedAnswer, setSelectedAnswer] = useState(propSelectedAnswer);

  useEffect(() => {
    setSelectedAnswer(propSelectedAnswer);
  }, [propSelectedAnswer]);

  const isCorrect = (answer) => {
    return answer === correctAnswer;
  };

  return (
    <div className="quiz-card border border-gray-300 rounded-lg p-4 mb-4">
      <h2 className="text-2xl font-semibold mb-4">{questions}</h2>
      <div className="flex flex-wrap justify-center gap-2">
        {decodedAnswers.map((answer, index) => (
          <button
            key={index}
            disabled={revealAnswers}
            onClick={() => handleClick(answer)}
            className={`
              px-4 py-2 rounded-md shadow-md text-sm
              ${
                revealAnswers && isCorrect(answer)
                  ? "bg-green-500 text-white"
                  : revealAnswers && selectedAnswer === answer
                  ? "bg-red-500 text-white"
                  : !revealAnswers && selectedAnswer === answer
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }
              ${selectedAnswer === answer ? "ring-2 ring-yellow-500" : ""}
            `}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}
