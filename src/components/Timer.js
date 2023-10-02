import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

const Timer = ({ timeUp }) => {
  //console.log("timer");
  const [totalTime, setTotalTime] = useState(15);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (currentTime >= totalTime) {
      console.log("timeup");
      timeUp();
      return;
    }
    const intervalId = setInterval(() => {
      setCurrentTime((prevTime) => prevTime + 0.05);
    }, 0.05 * 1000);

    return () => clearInterval(intervalId);
  }, [currentTime]);

  return (
    <div style={{ width: "100%" }}>
      <ProgressBar currentTime={currentTime} totalTime={totalTime} />
    </div>
  );
};

export default Timer;
