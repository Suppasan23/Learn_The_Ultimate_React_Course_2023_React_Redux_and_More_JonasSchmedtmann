import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./style.css";
import CardSkill from "./CardSkill/CardSkill.jsx";
import OpenTheDoor from "./OpenTheDoor/OpenTheDoor";
import DateCounter from "./DateCounter/DateCounter";
import FlashCards from "./FlashCards/FlashCards";
import Accordion from "./Accordion/Accordion";
import TipCalculator from "./TipCalculator/TipCalculator";
import TextExpander from "./TextExpander/TextExpander";
import CurrencyConverter from "./CurrencyConverter/CurrencyConverter";
import GeoLocation from "./GeoLocation/GeoLocation"
import BankAccount from "./BackAccount/BankAccount";

function App() {
  return (
    <div className="flex-container">

      <div className="box">
        <BankAccount />
      </div>
      <div className="box">
        <GeoLocation />
      </div>
      <div className="box">
        <CurrencyConverter />
      </div>
      <div className="box">
        <TextExpander />
      </div>
      <div className="box">
        <TipCalculator />
      </div>
      <div className="box">
        <Accordion />
      </div>
      <div className="box">
        <FlashCards />
      </div>
      <div className="box">
        <DateCounter />
      </div>
      <div className="box">
        <OpenTheDoor />
      </div>
      <div className="box">
        <CardSkill />
      </div>
      
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
