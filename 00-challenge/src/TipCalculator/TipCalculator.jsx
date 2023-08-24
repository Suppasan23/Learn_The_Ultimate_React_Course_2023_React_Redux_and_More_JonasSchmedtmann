import { useState } from "react";
import "./style.css";

export default function TipCalculator(){

    const [theBill, setTheBill] = useState(0);
    const [satisfaction1, setSatisfaction1] = useState(0);
    const [satisfaction2, setSatisfaction2] = useState(0);

    return(
        <>
            <Heading/>
            <Bill
                    theBill={theBill} 
                    setTheBill={setTheBill}/>
            <PercentSatisfaction
                    satisfaction={satisfaction1}
                    setSatisfaction={setSatisfaction1}>
                    How much was the bill? &nbsp;</PercentSatisfaction>
            <PercentSatisfaction
                    satisfaction={satisfaction2}
                    setSatisfaction={setSatisfaction2}>
                    How did you like the service? &nbsp;</PercentSatisfaction>
            <Calculation
                    theBill={theBill}
                    satisfaction1={satisfaction1}
                    satisfaction2={satisfaction2}/>
            <Reset
                    setTheBill={setTheBill}
                    setSatisfaction1={setSatisfaction1}
                    setSatisfaction2={setSatisfaction2}/>
        </>  
    )  
}

function Heading(){
    return(
        <div>
            <h3>Tip Calculator</h3>
            <br/>
        </div>
    )
}

function Bill({theBill, setTheBill}) {
    return (
        <div> 
            <p>How much was the bill? &nbsp; 
                <input type="text" value={theBill} onChange={(e)=>setTheBill(Number(e.target.value))}/>
            </p>
        </div>
    );
}

function PercentSatisfaction({ satisfaction, setSatisfaction, children }) {
    return (
        <div>
            <p>
                {children}
                <select value={satisfaction} onChange={(e) => setSatisfaction(Number(e.target.value))}>
                    <option value={0}>Dissatisfied (0%)</option>
                    <option value={5}>It was okay (5%)</option>
                    <option value={10}>It was good (10%)</option>
                    <option value={20}>Absolutely amazing! (20%)</option>
                </select>
            </p>
        </div>
    );
}

function Calculation({ theBill, satisfaction1, satisfaction2 }) {
    const tip = (theBill * ((satisfaction1 + satisfaction2) / 2)) / 100;
    const total = theBill + tip;

    return (
        <div>
            <br />
            <p style={{ fontWeight: 'bold' }}>
                You pay ${total} {tip > 0 && ` (${theBill} + $${tip} tip)`}
            </p>
        </div>
    );
}


function Reset({setTheBill, setSatisfaction1, setSatisfaction2}){

    function resetAll(){
        setTheBill(0);
        setSatisfaction1(0);
        setSatisfaction2(0);
    }

    return(
        <div>
            <br/>
            <button style={{fontWeight : 'bold'}} onClick={()=>resetAll()}>Reset</button>
        </div>
    )
}