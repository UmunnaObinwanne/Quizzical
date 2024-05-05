import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/next");
  }

  return (
    <div>
      <div
        className=""
        style={{
          backgroundImage:
            'url("https://mdbcdn.b-cdn.net/img/new/slides/041.webp")',
          height: "400px",
        }}>
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">Quizzify</h1>
              <h4 className="mb-3">How Intelligent are you?</h4>
              <button
                className="btn btn-outline-dark btn-lg"
                href=""
                role="button"
                onClick={handleNavigate}>
                Click Here to Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
