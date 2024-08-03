import React, { useState, useRef } from "react";
import noise from "./assets/gong.mp3";
import noiseEnd from "./assets/splosh.mp3";
import "./Box.css";

export default function Box() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [soundInterval, setSoundInterval] = useState(20);
  const [maxSeconds, setMaxTime] = useState(60);
  const [startStop, setStartStop] = useState("paused");
  const [viewStartStop, setViewStartStop] = useState(true);
  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio(noise));
  const audioRefEnd = useRef(new Audio(noiseEnd));

  const timeKeeper = () => {
    if (startStop === "paused") {
      setStartStop("started");
      intervalRef.current = setInterval(() => {
        setTotalSeconds((prevTotal) => {
          let newTotalSeconds = prevTotal + 1;
          if (newTotalSeconds % soundInterval === 0) {
            audioRef.current.volume = 0.5;
            audioRef.current.play();
          }
          if (newTotalSeconds >= maxSeconds) {
            newTotalSeconds = 0;
            clearInterval(intervalRef.current);
            setViewStartStop(false);
            setStartStop("paused");
            audioRefEnd.current.play();
          }
          return newTotalSeconds;
        });
        setSeconds((prev) => {
          const newSeconds = prev + 1;
          if (newSeconds === 60) {
            setMinutes((min) => min + 1);
            return 0;
          } else {
            return newSeconds;
          }
        });
      }, 1000);
    } else {
      setStartStop("paused");
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="pop-up">
      <h1>Timer</h1>
      <h1>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>
      <div className="selectors">
        <select
          className="select"
          onChange={(e) => {
            setMaxTime(e.target.value);
          }}
        >
          <option value={60}>1 Minute</option>
          <option value={120}>2 Minutes</option>
          <option value={300}>5 Minutes</option>
          <option value={600}>10 Minutes</option>
          <option value={900}>15 Minutes</option>
          <option value={1200}>20 Minutes </option>
        </select>
        <select
          className="select"
          onChange={(e) => {
            setSoundInterval(e.target.value);
          }}
        >
          <option value={20}>20 seconds</option>
          <option value={30}>30 seconds</option>
          <option value={60}>1 minute</option>
          <option value={120}>2 minutes</option>
          <option value={300}>5 minutes</option>
        </select>
      </div>
      <div className="buttons">
        {viewStartStop ? (
          <button onClick={() => timeKeeper()}>
            {startStop === "paused" ? "Start" : "Pause"}
          </button>
        ) : null}
        <button
          onClick={() => {
            setMinutes(0);
            setSeconds(0);
            setTotalSeconds(0);
            clearInterval(intervalRef.current);
            setStartStop("paused");
            setViewStartStop(true);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
