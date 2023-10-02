import { useState } from "react";
import data from "../data";
import Timer from "./Timer";
import ViewResults from "./ViewResults";

const Question = () => {
  console.log("re-render");
  const [selected, setSelected] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState(data);
  const [answered, setAnswered] = useState(false);
  const [timeForQuestion, setTimeForQuestion] = useState(5);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [displayTimer, setDisplayTimer] = useState(true);
  const [stats, setStats] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
    skips: 0,
  });

  const handleClick = (id) => {
    setSelected(id);
  };

  const retake = () => {
    setQuestions(data);
    setCurrentQuestion(0);
    setScore(0);
    setDisplayTimer(true);
    setShowExplanation(false);
    setTimeForQuestion(5);
    setStats({ correctAnswers: 0, wrongAnswers: 0, skips: 0 });
  };

  const handleConfirm = () => {
    if (selected === null) return;
    setDisplayTimer(false);
    setAnswered(true);
  };

  const handleSkip = () => {
    setStats((prev) => {
      return { ...prev, skips: prev.skips + 1 };
    });
    setShowExplanation(false);
    setTimeForQuestion(5);
    setSelected(null);
    setAnswered(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleNext = () => {
    if (selected === null) {
      setStats((prev) => {
        return { ...prev, skips: prev.skips + 1 };
      });
    } else if (questions[currentQuestion].answer === selected) {
      setStats((prev) => {
        return { ...prev, correctAnswers: prev.correctAnswers + 1 };
      });
      console.log(score);
      setScore((prev) => prev + 4);
    } else {
      setStats((prev) => {
        return { ...prev, wrongAnswers: prev.wrongAnswers + 1 };
      });
      setScore((prev) => prev - 1);
    }
    setDisplayTimer(true);
    setShowExplanation(false);
    setSelected(null);
    setAnswered(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  const timeUp = () => {
    if (selected === null) {
      setStats((prev) => {
        return { ...prev, skips: prev.skips + 1 };
      });
    } else if (questions[currentQuestion].answer === selected) {
      setStats((prev) => {
        return { ...prev, correctAnswers: prev.correctAnswers + 1 };
      });
      console.log(score);
      setScore((prev) => prev + 4);
    } else {
      setStats((prev) => {
        return { ...prev, wrongAnswers: prev.wrongAnswers + 1 };
      });
      setScore((prev) => prev - 1);
    }
    setDisplayTimer(false);
    setAnswered(true);
  };

  if (currentQuestion === questions.length) {
    return (
      <div>
        <ViewResults
          finalScore={score}
          totalScore={(currentQuestion + 1) * 4}
          stats={stats}
          retake={() => retake()}
        />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="question-container">
        {displayTimer && <Timer timeUp={timeUp} />}
        <div className="question">{questions[currentQuestion].question}</div>
        <div className={`options ${answered && "non-clickable"}`}>
          {questions[currentQuestion].options.map((option) => {
            return (
              <div
                className={`option ${
                  selected === option.id && "option-selected"
                } ${
                  answered &&
                  selected === option.id &&
                  option.id !== questions[currentQuestion].answer &&
                  "option-wrong"
                } ${
                  answered &&
                  option.id === questions[currentQuestion].answer &&
                  "option-correct"
                }`}
                key={option.id}
                onClick={() => handleClick(option.id)}
              >
                {option.text}
              </div>
            );
          })}
        </div>

        <div>
          {!answered ? (
            <div className="buttons-container">
              <button className="button-outlined" onClick={() => handleSkip()}>
                Skip
              </button>
              <button
                disabled={selected === null}
                className="button-full"
                onClick={() => handleConfirm()}
              >
                Confirm
              </button>
            </div>
          ) : currentQuestion !== questions.length - 1 ? (
            <div
              className="buttons-container"
              style={{ justifyContent: "space-between" }}
            >
              <button
                className="button-outlined"
                onClick={() => setShowExplanation(true)}
              >
                Show Explanation
              </button>
              <button className="button-full" onClick={() => handleNext()}>
                Next
              </button>
            </div>
          ) : (
            <div
              className="buttons-container"
              style={{ justifyContent: "space-between" }}
            >
              <button
                className="button-outlined"
                onClick={() => setShowExplanation(true)}
              >
                Show Explanation
              </button>
              <button className="button-outlined" onClick={() => handleNext()}>
                View Score
              </button>
            </div>
          )}
        </div>

        {showExplanation && (
          <img
            src={
              questions[currentQuestion].explanation[
                Math.floor(Math.random() * 5)
              ]
            }
            alt="explanation"
            width="100%"
            style={{ marginTop: 30, borderRadius: 30 }}
          />
        )}
      </div>
    </div>
  );
};

export default Question;
