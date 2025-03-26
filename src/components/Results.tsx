import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useQuizStore from "../store/quizStore";

const Results = () => {
  const {
    answers,
    correctAnswers,
    isFinished,
    setAnswersDefault,
    setQuizIdDefault,
  } = useQuizStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFinished) {
      navigate("/");
    }
  }, [isFinished, navigate]);

  const handleRetry = () => {
    setQuizIdDefault(); // Reset count
    setAnswersDefault(); // Reset answers & isFinished
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold my-5">Quiz Results</h2>
      <ul className="w-1/2">
        {answers.map((userAnswer, index) => (
          <li
            key={index}
            className={`p-2 my-2 border ${
              userAnswer === correctAnswers[index]
                ? "bg-green-300"
                : "bg-red-300 text-white"
            }`}
          >
            <p>
              <strong>Question {index + 1}:</strong> Your Answer: {userAnswer}
            </p>
            {userAnswer !== correctAnswers[index] && (
              <p>
                <strong>Correct Answer:</strong> {correctAnswers[index]}
              </p>
            )}
          </li>
        ))}
      </ul>
      <button
        onClick={handleRetry}
        className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Retry Quiz
      </button>
    </div>
  );
};

export default Results;
