import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuizStore from "../store/quizStore";

const QuizComponent = () => {
  const { count, questions, setQuizId, setQuestions, setAnswers, finishQuiz } =
    useQuizStore();

  const navigate = useNavigate();

  interface ICurrentAnswer {
    answer: string;
    questionId: number;
  }

  const [currentAnswer, setCurrentAnswer] = useState<ICurrentAnswer>({
    answer: "",
    questionId: 0,
  });

  useEffect(() => {
    setQuestions();
  }, [setQuestions]);

  const setCurrentAnswerFunc = (answer: string, id: number) => {
    setCurrentAnswer({ answer, questionId: id });
  };

  const nextQuestion = () => {
    if (currentAnswer.answer !== "") {
      const correctAnswer = questions[count].correctAnswer;
      setAnswers(currentAnswer.answer, correctAnswer);

      if (count === questions.length - 1) {
        finishQuiz();
        navigate("/results");
      } else {
        setQuizId();
      }

      setCurrentAnswer({ answer: "", questionId: 0 });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="border p-32">
        <h2 style={{ color: questions[count]?.color }}>
          Question: What is HEX of this color?
        </h2>
        <ul className="flex flex-col gap-5 items-center py-10">
          {questions[count]?.answers.map((answer, answerIndex) => (
            <li
              key={answerIndex}
              className={`border w-[50%] cursor-pointer transition ${
                currentAnswer.answer === answer ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => setCurrentAnswerFunc(answer, answerIndex)}
            >
              {answer}
            </li>
          ))}
        </ul>
        <button
          onClick={nextQuestion}
          className="bg-blue-400 px-5 py-1 text-white cursor-pointer"
        >
          {count === questions.length - 1 ? "Finish Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;
