import logo from './logo.svg';
import './App.css';
import up from './up.png';
import down from './down.png';
import time from './time.png';
import React, { useState, useEffect } from "react";

function App() {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [started, setStarted] = useState(false);
  const [showBoom, setShowBoom] = useState(false);
  const [paused, setPaused] = useState(false);
  const { hours, minutes, seconds } = time;
  let interval;
  useEffect(() => {
    if (started) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setTime({
            ...time,
            seconds: seconds - 1,
          });
        }
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              clearInterval(interval);
              setStarted(false);
              setShowBoom(true);
            } else {
              setTime({
                ...time,
                hours: hours - 1,
                minutes: 59,
                seconds: 59,
              });
            }
          } else {
            setTime({
              ...time,
              minutes: minutes - 1,
              seconds: 59,
            });
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [time, started]);

  const startCountdown = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      return;
    }

    setStarted(true);
    setPaused(false);
  };

  const resetCountodown = () => {
    setStarted(false);
    setTime({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  };

  const handleChange = (type, waktu) => {
    setShowBoom(false);
    if (type === "increment" && waktu === "h") {
      if (hours + 1 > 24) {
        return;
      }
      setTime({ ...time, hours: hours + 1 });
    }

    if (type === "decrement" && waktu === "h") {
      if (hours - 1 < 0) {
        return;
      }
      setTime({ ...time, hours: hours - 1 });
    }

    if (type === "increment" && waktu === "m") {
      if (minutes + 1 > 59) {
        return;
      }
      setTime({ ...time, minutes: minutes + 1 });
    }

    if (type === "decrement" && waktu === "m") {
      if (minutes - 1 < 0) {
        return;
      }
      setTime({ ...time, minutes: minutes - 1 });
    }

    if (type === "increment" && waktu === "s") {
      if (seconds + 1 > 59) {
        return;
      }
      setTime({ ...time, seconds: seconds + 1 });
    }

    if (type === "decrement" && waktu === "s") {
      if (seconds - 1 < 0) {
        return;
      }
      setTime({ ...time, seconds: seconds - 1 });
    }
  };

  const pauseCountdown = () => {
    clearInterval(interval);
    setPaused(true);
    if (started) {
      setStarted(false);
    } else {
      setStarted(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className="Title">
          <img src={clock} className="time"></img>SIMPLE COUNTDOWN<img src={clock} className="time"></img>
        </p>
        <div className="boom2">
          {showBoom && "BOOMMM!!!"}
        </div>
        <div className="boom">
          {started && !showBoom && "Remaining:"}
        </div>
        <div className="hour">
          {hours}<a style={{ marginRight: '1.8rem' }}></a> : <a style={{ marginLeft: '1rem' }}></a>{minutes} <a style={{ marginLeft: '2rem' }}></a>:<a style={{ marginLeft: '0.7rem' }}></a> {seconds}
        </div>
        <img src={uparrow} className="arrow1" onClick={(e) => handleChange("increment", "h")}>
          up
        </img>
        <img src={downarrow} className="arrow6" onClick={(e) => handleChange("decrement", "h")}>
          down
        </img>
        <img src={uparrow} className="arrow2" onClick={(e) => handleChange("increment", "m")}>
          up
        </img>
        <img src={downarrow} className="arrow3" onClick={(e) => handleChange("decrement", "m")}>
          down
        </img>
        <img src={uparrow} className="arrow4" onClick={(e) => handleChange("increment", "s")}>
          up
        </img>
        <img src={downarrow} className="arrow5" onClick={(e) => handleChange("decrement", "s")}>
          down
        </img>
        <button className="startbutton" onClick={startCountdown}>
          {paused ? "RESUME" : "START"}
        </button>
        <button className="resetbutton" onClick={resetCountodown}> 
        RESET
        </button>
        {started && <button className="pausebutton" onClick={pauseCountdown}> 
        PAUSE
        </button>}
      </header>
    </div>
  );
}

export default App;

