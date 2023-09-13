import { useEffect } from "react";

function Timer({dispatch, secondRemaining}){
    const mins = Math.floor(secondRemaining / 60);
    const secconds = secondRemaining % 60;

    useEffect(()=>{
        const id = setInterval(function() {
            dispatch({type:"tick"})
            console.log("1")
        }, 1000)

        return () => clearInterval(id);
    }, [dispatch])

    return(
        <div className="timer">
            {mins < 10 && "0"}{mins}
            :{secconds < 10 && "0"}{secconds}</div>
    )
}

export default Timer;