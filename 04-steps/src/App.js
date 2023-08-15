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

  const [step, setStep] = useState(0);
  const [emoji, setEmoji] = useState("")

  function handlePrevious(){
    if(step > 0){
      setStep(step - 1)
      setEmoji(emoji.slice(0, emoji.lastIndexOf("💰")));
    } 
  }

  function handleNext(){
    if(step < messages.length -1) {
      setStep(step + 1)
      for (let i = 1; i <= step; i++) {
        setEmoji(emoji.concat("💰"));
      }
    }
  }

  for (let i = 1; i <= messages.length; i++) {
    <div className={step >= i && "active"}>{i+1}</div>;
  }
  
  return (
    <>
      <div className="steps">
        <div className="numbers">
          {
            messages.map((_, i) => (<div className={step >= i ? "active" : ""}>{i + 1}</div>)) 
          }
        </div>

        <p className="message">
          Step {step+1}:{messages[step]}{emoji}
        </p>
        <div className="buttons">
          <button style={{ backgroundColor: "#7950f2", color: "#FFFFFF" }} onClick={handlePrevious}>Previous</button>
          <button style={{ backgroundColor: "#7950f2", color: "#FFFFFF" }} onClick={handleNext}>Next</button>
        </div>
      </div>
    </>
  );
}