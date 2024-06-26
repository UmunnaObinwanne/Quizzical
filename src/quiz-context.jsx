import { createContext, useState, useEffect } from "react";

const apiUrl = "https://opentdb.com/api.php";

export const QuizContext = createContext();

export const QuestionsProvider = ({ children }) => {
  const [quiz, setQuiz] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to decode HTML entities
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

  // Function to fetch quiz data
  // Function to fetch quiz data based on category
  const fetchQuizData = (selectedCategory) => {
    const url = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          const fetchedQuestions = data.results.map((result) => {
            const incorrectAnswers = result.incorrect_answers;
            const correctAnswer = result.correct_answer;

            // Shuffle answers
            const shuffledAnswers = shuffle([
              ...incorrectAnswers,
              correctAnswer,
            ]);

            return {
              question: decodeHtml(result.question),
              correctAnswer: correctAnswer,
              answers: shuffledAnswers,
            };
          });
          setQuiz(fetchedQuestions);
        } else {
          console.error("Error fetching questions:", data.error);
        }
      })
      .catch((error) => console.log("Error fetching questions:", error));
  };

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("https://opentdb.com/api_category.php");
      const data = await response.json();
      setCategories(data.trivia_categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories when component mounts
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchQuizData(selectedCategory); // Fetch quiz data when selected category changes
    }
  }, [selectedCategory]);

  const value = {
    quiz,
    categories,
    selectedCategory,
    setSelectedCategory,
    loading,
    updateSelectedAnswer,
    fetchQuizData,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
