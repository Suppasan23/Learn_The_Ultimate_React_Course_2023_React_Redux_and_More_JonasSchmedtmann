import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

function QuizContextProvider({children}) {

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
            dispatch({type:"dataReceived", payload: data})
          } catch (err) {
            dispatch({type:"dataFailed"})
          }
        }
    
        recieveData();
      },[])

      return(
        <QuizContext.Provider 
        value={{    status,
                    questions, 
                    currentQuestion:questions[index],
                    index, 
                    choosing, 
                    points, 
                    highscore, 
                    secondRemaining,
                    dispatch,
                    numQuestions,
                    maxPossiblePoints,
        }}>
        {children}
        </QuizContext.Provider>
      )
}

function QuizContextUsing() {
    const x = useContext(QuizContext);
    if (x === undefined) { throw new Error("QuizContextUsing was used outside the QuizContextProvider"); }
    return x;
  }

export {QuizContextProvider, QuizContextUsing}