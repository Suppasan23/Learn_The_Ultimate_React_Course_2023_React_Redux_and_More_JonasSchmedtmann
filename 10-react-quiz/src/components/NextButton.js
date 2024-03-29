import { QuizContextUsing } from "../contexts/QuizContext";

function NextButton(){

    const { index, numQuestions, dispatch } = QuizContextUsing();

    if(index < numQuestions -1){
        return(
            <button className="btn btn-ui" onClick={()=>dispatch({type:"nextQuestion"})}>Next</button>
        )
    }

    if(index === numQuestions -1){
        return(
            <button className="btn btn-ui" onClick={()=>dispatch({type:"finished"})}>Finish</button>
        )
    }
}

export default NextButton;