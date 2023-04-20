import React, { useState, useEffect } from "react";

const Timer = (props) => {
  const { gameOver, startTimer } = props;


  const [seconds, setSeconds] = useState(60);
  const [intervalState, setIntervalState] = useState(null);

  useEffect(() => {
    if (startTimer) {
      clock();
    }
  }, [startTimer]);

  useEffect(() => {
    if (seconds === -1) {
      clearInterval(intervalState);
      gameOver();
    }
  }, [seconds, gameOver, intervalState]);

  const clock = () => {
    setIntervalState(
      setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000)
    );
  };

  return (
    <div>
      <div
        className="timer"
        style={{ color: seconds < 10 ? "orangered" : "white" }}
      >
        {seconds}s
      </div>
    </div>
  );
};

export default Timer;
