import React from "react";

const ProgressBar = ({ currentTime, totalTime }) => {
  //   console.log(currentTime);
  //   console.log(totalTime);
  const progress = (currentTime / totalTime) * 100;

  return (
    <div className="progress-bar">
      <div
        className="filler"
        style={{
          width: `${100 - progress}%`,
          display: `${progress === 100 ? "none" : ""}`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
