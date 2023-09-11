import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

export default function App(){

  const [state, dispatch] = useReducer((state, action)=>
  {
    switch(action.type){
      case 'dataReceived':  return{ ...state, 
                                    questions: action.payload,
                                    status: "ready"}
      case 'dataFailed':    return{ ...state, 
                                    status: "error"}                  
      default: throw Error("Action unknow")
    }
  },{questions:[], status: 'loading' /*'loading', 'error', 'ready', 'active', 'finished'*/ });
  

  useEffect(()=>{
    async function recieveData(){
      try {
        const res = await fetch("http://localhost:8000/questions")
        const data = await res.json();
        console.log(data)
        dispatch({type:"dataReceived", payload: data})
      } catch (err) {
        dispatch({type:"dataFailed"})
      }
    }

    recieveData();
  },[])


  return (
    <div className="app">

      <Header/>

      <Main>
        <p>1/15</p>
        <p>Question?</p></Main>

    </div>
  )
}