import RevealAnswer from "./RevealAnswer";
import Options from "./Options"
import NextButton from "./NextButton";


function Questions({index, currentQuestion, numQuestion, choosing, dispatch}){

    console.log(currentQuestion);
    
    return(
        <>
            <div>
                <p style={{fontSize:"30px"}}>{currentQuestion.question}</p>

                <div>
                    {currentQuestion.options.map((eachOpt, i) => (
                        <Options    key={i}
                        i={i}
                                    eachOpt={eachOpt}
                                    choosing={choosing}
                                    answer={i === currentQuestion.correctOption}
                                    dispatch={dispatch}/>
                    ))}
                </div>

                <div>
                    {(choosing !== null && choosing !== currentQuestion.correctOption) && 
                        <RevealAnswer answer={currentQuestion.options[currentQuestion.correctOption]}/>
                    }
                </div>

                <div>
                    {(choosing !== null) && <NextButton index={index} numQuestion={numQuestion} dispatch={dispatch}/>}
                </div>

            </div>
        </>
    );
}

export default Questions;