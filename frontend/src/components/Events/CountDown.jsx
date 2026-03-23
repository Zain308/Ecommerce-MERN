import React, { useEffect, useState } from "react";

const CountDown = () => {
  const calculateTimeLeft = () => {
    // BUG FIX: Updated date to future (May 2026) so timer doesn't start at "Time's up"
    const difference = +new Date("2026-05-15") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval] && interval !== "seconds") {
      return null;
    }

    return (
      <span key={interval} className="text-[25px] text-[#475ad2] font-[600]">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="flex items-center gap-2">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Event has ended!</span>
      )}
    </div>
  );
};

export default CountDown; 