function StartScreen({numQuestions, dispatch}) {

    return(
        <div className="Start">
            <h2>Welcome to The React Quiz!</h2>
            <h3>{numQuestions} question to test your React mastery</h3>
            <button className="btn btn-ui" onClick={()=>dispatch({type:"starto"})}>Let's Get It Done</button>
        </div>
    )
}

export default StartScreen