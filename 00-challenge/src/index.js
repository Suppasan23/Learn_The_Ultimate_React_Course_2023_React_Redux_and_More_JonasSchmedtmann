import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./style.css";

function App() {
  return (
    <div className="card">
      <Avatar image="avatar/sigma-men.jpg" />

      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar(props) {
  return (
    <>
      <img
        className="avatar"
        src={props.image}
        alt={props.image.substring(props.image.lastIndexOf("/") + 1)}
        width={500}
      ></img>
    </>
  );
}

function Intro() {
  return (
    <>
      <h1>Brave Man</h1>
      <p>
        A "brave man" refers to an individual who displays courage and
        fearlessness in the face of challenges, danger, or adversity.
      </p>
    </>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      <Skill skill="Sword" emoji="⚔️" color="#B03A2E" />
      <Skill skill="Axe" emoji="🪓" color="#1A5276" />
      <Skill skill="Bow" emoji="🏹" color="#0E6655" />
      <Skill skill="Shield" emoji="🛡️" color="#B7950B" />
      <Skill skill="Magic" emoji="☄️" color="#5D6D7E" />
      <Skill skill="Summon" emoji="🦄" color="#A569BD" />
    </div>
  );
}

function Skill(props) {
  return (
    <div className="skill" style={{ backgroundColor: props.color }}>
      <span>{props.skill}</span>
      <span>{props.emoji}</span>
    </div>
  );
}

// Render Zone
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
