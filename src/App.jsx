import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./Hero";
import QuizPage from "./Quiz-page";
import QuizAnswers from "./Answer-quiz";
import "./App.css";

function App() {
  useEffect(() => {
    if (window.location.href.indexOf("#!") > -1) {
      const cleanUrl = window.location.href.replace("#!", "");
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<Hero />} />
        <Route path="/next" element={<QuizPage />} />
        <Route path="/answers" element={<QuizAnswers />} />
      </Routes>
    </>
  );
}

export default App;
