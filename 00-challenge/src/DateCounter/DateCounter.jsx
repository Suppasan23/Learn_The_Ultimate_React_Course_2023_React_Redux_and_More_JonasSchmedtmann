import { useState } from "react";
import "../style.css";

export default function DateCounter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const theDate = new Date();

  theDate.setDate(theDate.getDate() + count);

  function handleSetStep(increment) {
    if (increment) {
      setStep((s) => s + 1);
    } else {
      step > 1 && setStep((s) => s - 1);
    }
  }

  function handleSetCount(increment) {
    if (increment) {
      setCount((c) => c + step);
    } else {
      setCount((c) => c - step);
    }
  }

  return (
    <>
      <h3>Datecounter Chellenge</h3>
      <br />

      <div>
        <button
          onClick={() => handleSetStep(false)}
          style={{ fontSize: 30, width: 40, height: 40 }}
        >
          -
        </button>
        <span
          style={{
            backgroundColor: "#ADD8E6",
            padding: 5,
          }}
        >
          Step:{step}
        </span>
        <button
          onClick={() => handleSetStep(true)}
          style={{ fontSize: 30, width: 40, height: 40 }}
        >
          +
        </button>
      </div>

      <div>
        <button
          onClick={() => handleSetCount(false)}
          style={{ fontSize: 30, width: 40, height: 40 }}
        >
          -
        </button>
        <span style={{ backgroundColor: "#90EE90", padding: 5 }}>
          Count:{count}
        </span>
        <button
          onClick={() => handleSetCount(true)}
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
    </>
  );
}
