import { QuizContextUsing } from "../contexts/QuizContext";

function RevealAnswer(){
    
    const { currentQuestion } = QuizContextUsing();
    const answer = currentQuestion.options[currentQuestion.correctOption]

    return(
        <p style={{fontSize:"16px"}}>The correct answer is <span style={{color:"lightGreen"}}>"{answer}"</span></p>
    )
}

export default RevealAnswer;