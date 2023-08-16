import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./style.css";

const skillData = [
  {
    skill: "Sword",
    emoji: "⚔️",
    level: "advanced",
    color: "#B03A2E",
  },
  {
    skill: "Axe",
    emoji: "🪓",
    level: "Intermediate",
    color: "#1A5276",
  },
  {
    skill: "Bow",
    emoji: "🏹",
    level: "beginner",
    color: "#0E6655",
  },
  {
    skill: "Shield",
    emoji: "🛡️",
    level: "advanced",
    color: "#B7950B",
  },
  {
    skill: "Magic",
    emoji: "☄️",
    level: "Intermediate",
    color: "#5D6D7E",
  },
  {
    skill: "Summon",
    emoji: "🦄",
    level: "beginner",
    color: "#A569BD",
  },
];

function App() {
  return (
    <div className="app-container">
      <div className="card">
        <Avatar image="avatar/sigma-men.jpg" />

        <div className="data">
          <Intro />
          <SkillList />
        </div>
      </div>
      <div className="card">
        <OpenTheDoor />
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
      <h1>The Black Worrior</h1>
      <p>
        A "brave man" refers to an individual who displays courage and
        fearlessness in the face of challenges, danger, or adversity.
      </p>
    </>
  );
}

function SkillList() {
  return (
    <>
      {skillData.length > 0 ? (
        <ul className="skill-list">
          {skillData.map((eachSkill, index) => (
            <Skill
              skill={eachSkill.skill}
              emoji={eachSkill.emoji}
              level={eachSkill.level}
              color={eachSkill.color}
              key={index}
            />
          ))}
        </ul>
      ) : (
        <p>Data not found</p>
      )}
    </>
  );
}

function Skill({ skill, emoji, level, color }) {
  return (
    <li className="skill" style={{ backgroundColor: color }}>
      <span>{emoji}</span>
      <span>{skill}</span>
      <span>
        {level === "advanced" && "💪"}
        {level === "Intermediate" && "👍"}
        {level === "beginner" && "👶"}
      </span>
    </li>
  );
}

function OpenTheDoor() {
  const [doorState, setDoorState] = useState(true);

  return (
    <>
      <div>
        <img
          onClick={() => setDoorState((door) => !door)}
          src={doorState ? "avatar/dooropen.jpg" : "avatar/doorclose.jpg"}
          alt={doorState ? "dooropen" : "doorclose"}
          width={300}
        ></img>
      </div>
    </>
  );
}

// Render Zone
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
