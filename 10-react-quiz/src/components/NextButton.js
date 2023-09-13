function NextButton({ index, numQuestion, dispatch }){

    if(index < numQuestion -1){
        return(
            <button className="btn btn-ui" onClick={()=>dispatch({type:"nextQuestion"})}>Next</button>
        )
    }

    if(index === numQuestion -1){
        return(
            <button className="btn btn-ui" onClick={()=>dispatch({type:"finished"})}>Finish</button>
        )
    }
}

export default NextButton;