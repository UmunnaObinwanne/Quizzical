// QuizAnswerPage.js

export default function QuizAnswerPage({ questions, answers, selections }) {
  return (
    <div className="quiz-answer-page">
      <h2>Quiz Answers</h2>
      {questions.map((question, index) => (
        <div
          key={index}
          className={
            answers[index] === selections[index] ? "correct" : "wrong"
          }>
          <h3>{question}</h3>
          <p>Your Selection: {selections[index]}</p>
          <p>Correct Answer: {answers[index]}</p>
        </div>
      ))}
    </div>
  );
}
