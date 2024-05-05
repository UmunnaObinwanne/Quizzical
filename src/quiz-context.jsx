import { createContext, useState, useEffect } from "react";

const url = "https://opentdb.com/api.php?amount=20";

export const QuizContext = createContext();

export const QuestionsProvider = ({ children }) => {
  const [quiz, setQuiz] = useState([]);

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  // Function to update the selected answer for a specific question
  const updateSelectedAnswer = (questionId, selectedAnswer) => {
    setQuiz((prevQuiz) =>
      prevQuiz.map((question, index) =>
        index === questionId ? { ...question, selectedAnswer } : question
      )
    );
  };

  // Function to shuffle an array
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const fetchedQuestions = data.results.map((result) => {
          const incorrectAnswers = result.incorrect_answers;
          const correctAnswer = result.correct_answer;

          // Shuffle answers
          const shuffledAnswers = shuffle([...incorrectAnswers, correctAnswer]);

          return {
            question: decodeHtml(result.question),
            correctAnswer: correctAnswer,
            answers: shuffledAnswers,
          };
        });
        setQuiz(fetchedQuestions);
      })
      .catch((error) => console.log("error fetching questions:", error));
  }, []);

  const value = { quiz, updateSelectedAnswer };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
