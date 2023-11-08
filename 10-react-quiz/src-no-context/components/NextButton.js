function NextButton({ index, numQuestions, dispatch }){

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