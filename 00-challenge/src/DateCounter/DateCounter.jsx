import { useState } from "react";
import "../style.css";

export default function DateCounter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const theDate = new Date();

  theDate.setDate(theDate.getDate() + count);

  function handleSetStep(receiveValue) {
    setStep(receiveValue);
  }

  function handleSetCount(receiveValue) {
    setCount(receiveValue);
  }

  function handleReset() {
    setStep(1);
    setCount(0);
  }

  return (
    <>
      <h3>Datecounter Chellenge</h3>
      <br />

      <div>
        <input
          type="range"
          min="1"
          max="10"
          value={step}
          onChange={(e) => handleSetStep(Number(e.target.value))}
        />
        <span>{step}</span>
      </div>

      <div>
        <button
          onClick={() => setCount((c) => c - step)}
          style={{ fontSize: 30, width: 40, height: 40 }}
        >
          -
        </button>
        <input
          style={{ backgroundColor: "#90EE90", padding: 5, fontSize: 15 }}
          type="text"
          value={count}
          onChange={(e) => handleSetCount(Number(e.target.value))}
        ></input>
        <button
          onClick={() => setCount((c) => c + step)}
          style={{ fontSize: 30, width: 40, height: 40 }}
        >
          +
        </button>
      </div>

      <div>
        <br />
      </div>

      <div>
        <p style={{ fontSize: 20 }}>
          {count === 0 ? "Today is" : `${count} days from today`} ={" "}
          {theDate.getDate()}/{theDate.getMonth() + 1}/{theDate.getFullYear()}
        </p>
      </div>

      {(count !== 0 || step !== 1) && (
        <div>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </>
  );
}
