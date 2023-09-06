import { useEffect, useState } from "react";

export default function CurrencyConverter(){

    const [theValue, setTheValue] = useState(1)
    const [formUnit, setFormUnit] = useState('USD');
    const [toUnit, setToUnit] = useState('USD');
    const [theResult, setTheResult] = useState("");
    
    useEffect(() => {
        async function converter()
        {

            const response = await fetch(`https://api.frankfurter.app/latest?amount=${theValue}&from=${formUnit}&to=${toUnit}`);
            const data = await response.json();

            console.log(data)
            setTheResult(`${data.amount} ${formUnit} = ${data.rates[toUnit]} ${toUnit}`);

        }
    
        if(formUnit === toUnit) return setTheResult(`${theValue} ${formUnit} = ${theValue} ${toUnit}`);
        converter();
    }, [theValue, formUnit, toUnit]);
    
    // `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

    return (
        <>

        <h3>Currency Converter</h3>
        <br/>

        <div>

            <input 
                type="text" 
                value={theValue} 
                onChange={(e) => setTheValue(Number(e.target.value))}
            />

            <select value={formUnit} onChange={(e) => setFormUnit(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>

            <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>

        </div>

            <br/>
            <p>{theResult}</p>
            <br/>

        </>
      );
    }