function ProgressBar({ index, numQuestion, points, maxPossiblePoints }){

    return(
        <header className="progress">

            <progress max={numQuestion} value={index}></progress>

            <p>
                Progress <strong>{index}</strong> / {numQuestion}
            </p>

            <p>
                <strong>{points}</strong> / {maxPossiblePoints}
            </p>
        </header>
    )
}


export default ProgressBar;