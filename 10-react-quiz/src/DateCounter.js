import { useReducer } from "react";

export default function DateCounter() {

  const [state, dispatch] = useReducer((state, action)=>{
    console.log(state, action)

    switch (action.type) {
      case "dec": return { ...state, count: state.count -1 };
      case "inc": return { ...state, count: state.count +1 };
      case "setCount": return { ...state, count: action.payload };
      case "reset": return {count:0, step:1};
      default: throw new Error ("Unknow action")
    }
  }, {count:0, step:1});

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);

  function dec() {
    dispatch({type:'dec'});
    // setCount((count) => count - 1);
    //setCount((count) => count - step);
  };

  function inc() {
    dispatch({type:'inc'});
    // setCount((count) => count + 1);
    //setCount((count) => count + step);
  };

  function defineCount(inputNum) {
    dispatch({type:'setCount', payload:inputNum});
    //setCount(Number(e.target.value));
  };

  function defineStep(e) {
    //setStep(Number(e.target.value));
  };

  function reset() {
    dispatch({type:'reset'});
    //setCount(0);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={(e) => defineCount(Number(e.target.value))} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}