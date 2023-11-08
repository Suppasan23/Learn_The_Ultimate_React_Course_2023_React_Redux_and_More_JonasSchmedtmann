function ProgressBar({ index, numQuestions, points, maxPossiblePoints }){

    return(
        <header className="progress">

            <progress max={numQuestions} value={index}></progress>

            <p>
                Progress <strong>{index}</strong> / {numQuestions}
            </p>

            <p>
                <strong>{points}</strong> / {maxPossiblePoints}
            </p>
        </header>
    )
}


export default ProgressBar;