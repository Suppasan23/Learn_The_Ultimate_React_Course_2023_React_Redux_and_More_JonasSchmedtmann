function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }){
    const percentage = (points/maxPossiblePoints)*100
    
    function emoji() {
        if(percentage === 100) return '🥇'
        if(percentage >= 80 && percentage <= 100) return '🥈'
        if(percentage >= 60 && percentage <= 80) return '🥉'
        if(percentage < 60) return '😢'
    }

    return(
        <>
            <p className="result">
                <span>{emoji()}</span>Your Scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)} %)
            </p>
            <p className="highscore">
                (Highscore: {highscore} points)
            </p>

            <button className="btn btn-ui" onClick={()=>dispatch({type:"starto"})}>Restart Quiz</button>
        </>
    )
}

export default FinishScreen;