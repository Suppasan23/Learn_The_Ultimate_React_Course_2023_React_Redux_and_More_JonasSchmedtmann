import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
  "Be rich 🤑",
  "Be more rich 🤑",
  "Be more more rich 🤑",
  "Be more more more rich 🤑",
  "Be extremely rich 🤑",
];

export default function App() {
  return (
    <div>
      <Step />
      <Step />
    </div>
  );
}

function Step() {
  const [step, setStep] = useState(0);
  const [emoji, setEmoji] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 0) {
      setStep((s) => s - 1);
      setEmoji(emoji.slice(0, emoji.lastIndexOf("💰")));
    }
  }

  function handleNext() {
    if (step < messages.length - 1) {
      setStep((s) => s + 1);
      for (let i = 1; i <= step; i++) {
        setEmoji(emoji.concat("💰"));
      }
    }
  }

  return (
    <div>
      <button className="close" onClick={() => setIsOpen((isOp) => !isOp)}>
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            {messages.map((_, i) => (
              <div className={step >= i ? "active" : ""} key={i}>
                {i + 1}
              </div>
            ))}
          </div>

          <p className="message">
            Step {step + 1}:{messages[step]}
            {emoji}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#FFFFFF" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#FFFFFF" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div> //for IsOpen
  );
}
