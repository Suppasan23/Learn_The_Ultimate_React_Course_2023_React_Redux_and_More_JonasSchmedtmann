import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import ProgressBar from "./ProgressBar";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

export default function App(){

  const [{status, questions, index, choosing, points, highscore, secondRemaining}, dispatch] = useReducer((state, action)=>
  {
    switch(action.type){
      case 'dataReceived':  return{ ...state, 
                                    questions: action.payload,
                                    status: "ready"}
      case 'dataFailed':    return{ ...state, 
                                    status: "error"}             
      case 'starto':        return{ ...state, 
                                    status: "active",
                                    secondRemaining: state.questions.length * 30}        
      case 'newChoosing':   const currentQuestion = state.questions.at(state.index);
                            return{ ...state, 
                                    choosing: action.payload,
                                    points: currentQuestion.correctOption === action.payload ? state.points + currentQuestion.points : state.points} 
      case 'nextQuestion':  return{...state, 
                                    index: state.index + 1,
                                    choosing: null}
      case 'finished':      return{...state,
                                    status: "finished",
                                    index: state.index + 1,
                                    highscore: (state.points > state.highscore) ? state.points : state.highscore}
      case 'restarto':      return{ ...state, 
                                    status: "ready",
                                    index: 0,
                                    choosing: null,
                                    points: 0,
                                  }    
      case 'tick':          return{ ...state,
                                    secondRemaining: state.secondRemaining - 1,
                                    status: state.secondRemaining === 0 ? 'finished' : state.status
                                  }
      default: throw Error("Action unknow")
    }
  },{
    status: 'loading'/*'loading', 'error', 'ready', 'active', 'finished'*/, 
    questions:[],  
    index: 0,
    choosing: null,
    points: 0,
    highscore: 0,
    secondRemaining: null,
  });

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points , 0);


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
        {status === 'active' && <>
                                  <Timer dispatch={dispatch} secondRemaining={secondRemaining}/>
                                  <ProgressBar index={index} 
                                               numQuestions={numQuestions}
                                               points={points}
                                               maxPossiblePoints={maxPossiblePoints}/>      
                                  <Questions index={index} 
                                             numQuestions={numQuestions}
                                             currentQuestion={questions[index]}
                                             choosing={choosing}
                                             dispatch={dispatch}/>
                                </>}
        {status === 'finished' && <>
                                    <ProgressBar index={index} 
                                                 numQuestions={numQuestions}
                                                 points={points}
                                                 maxPossiblePoints={maxPossiblePoints}/>
                                    <FinishScreen points={points} 
                                                  maxPossiblePoints={maxPossiblePoints} 
                                                  highscore={highscore}
                                                  dispatch={dispatch}/>
                                  </>}
      </Main>
    </div>
  )
}