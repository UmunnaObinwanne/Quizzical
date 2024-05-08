import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "./quiz-context";

export default function Hero() {
  const { categories, fetchQuizData } = useContext(QuizContext); // Access categories from context
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    console.log("Selected category:", event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      fetchQuizData(selectedCategory);
      navigate(`/quiz?category=${selectedCategory}`);
    }
  };

  return (
    <div className="bg-white h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="max-w-screen-lg w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mx-5">
            Select a Quiz Category
          </h1>
          <div className="mt-6 flex justify-center">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              disabled={!selectedCategory}
              className={`rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${
                !selectedCategory ? "cursor-not-allowed" : ""
              }`}>
              Start Quiz
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
