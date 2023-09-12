import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";


export default function App(){

  const [{status, questions, index, choosing, points}, dispatch] = useReducer((state, action)=>
  {
    switch(action.type){
      case 'dataReceived':  return{ ...state, 
                                    questions: action.payload,
                                    status: "ready"}
      case 'dataFailed':    return{ ...state, 
                                    status: "error"}             
      case 'starto':        return{ ...state, 
                                    status: "active"}        
      case 'newChoosing':   const currentQuestion = state.questions.at(state.index);
                            return{ ...state, 
                                    choosing: action.payload,
                                    points: currentQuestion.correctOption === action.payload ? state.points + currentQuestion.points : state.points} 
      default: throw Error("Action unknow")
    }
  },{
    status: 'loading'/*'loading', 'error', 'ready', 'active', 'finished'*/, 
    questions:[],  
    index: 0,
    choosing: null,
    points: 0,
  });

  //const numQuestions = questions.length;

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
        {status === 'ready' && <StartScreen numQuestions={questions.length} dispatch={dispatch}/>}
        {status === 'active' && <Questions currentQuestion={questions[index]}
                                           choosing={choosing}
                                           dispatch={dispatch}/>}
      </Main>

    </div>
  )
}