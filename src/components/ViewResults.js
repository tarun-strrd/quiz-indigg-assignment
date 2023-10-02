import React, { useEffect, useState } from "react";
const ViewResults = ({ finalScore, totalScore, retake, stats }) => {
  console.log(stats, finalScore, totalScore);
  const finalPercent = Math.round((finalScore / totalScore) * 100);
  const [finalColor, setFinalColor] = useState("gray");
  const [feedBack, setFeedBack] = useState("");

  useEffect(() => {
    if (finalPercent >= 75) {
      setFeedBack("Excellent Work! Any way this is a dummy quiz.");
      setFinalColor("green");
    } else if (finalPercent >= 50) {
      setFeedBack("Good Work! Still marks wont be counted");
      setFinalColor("lightgreen");
    } else if (finalPercent >= 25) {
      setFeedBack("Better Luck Next Time!");
      setFinalColor("salmon");
    } else {
      setFeedBack("You need to work hard!");
      setFinalColor("red");
    }
  }, []);

  return (
    <div className="wrapper">
      <h1 style={{ fontStyle: "sans-serif" }}>Results are here...</h1>
      <div className="results-container">
        <div
          className="pie"
          style={{
            "--pie-color": finalColor,
            "--pie-percent": finalPercent + "%",
          }}
        >
          <div className="pie-filler">
            <div className="final-score-text">{finalPercent}%</div>
          </div>
        </div>

        <div className="stats-container">
          <h3>Your Score : {finalScore}</h3>
          <p>Correct:{stats.correctAnswers}</p>
          <p>Incorrect:{stats.wrongAnswers}</p>
          <p>Skipped:{stats.skips}</p>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <h2>{feedBack}</h2>
      </div>
      <div style={{ width: "50%" }}>
        <button className="button-outlined" onClick={() => retake()}>
          Retake Quiz
        </button>
      </div>
    </div>
  );
};

export default ViewResults;
