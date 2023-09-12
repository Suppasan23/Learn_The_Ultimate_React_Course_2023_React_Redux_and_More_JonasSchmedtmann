import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";


export default function App(){

  const [{questions, status}, dispatch] = useReducer((state, action)=>
  {
    switch(action.type){
      case 'dataReceived':  return{ ...state, 
                                    questions: action.payload,
                                    status: "ready"}
      case 'dataFailed':    return{ ...state, 
                                    status: "error"}             
      case 'starto':        return{ ...state, 
                                    status: "active",
                                    index: action.payload}        
      default: throw Error("Action unknow")
    }
  },{questions:[], status: 'loading'/*'loading', 'error', 'ready', 'active', 'finished'*/, index: 0  });

  const numQuestions = questions.length;

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

      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
        {status === 'active' && <Questions />}
      </Main>

    </div>
  )
}