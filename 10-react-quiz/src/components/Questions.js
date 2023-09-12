import RevealAnswer from "./RevealAnswer";
import Options from "./Options"

function Questions({currentQuestion, choosing, dispatch}){

    console.log(currentQuestion);
    
    return(
        <div>
            <p style={{fontSize:"30px"}}>{currentQuestion.question}</p>

            <div>
                {currentQuestion.options.map((eachOpt, index) => (
                    <Options    key={index}
                                index={index}
                                eachOpt={eachOpt}
                                choosing={choosing}
                                answer={index === currentQuestion.correctOption}
                                dispatch={dispatch}/>
                ))}
            </div>

            <div>
                {(choosing !== null && choosing !== currentQuestion.correctOption) && 
                    <RevealAnswer answer={currentQuestion.options[currentQuestion.correctOption]}/>
                }
            </div>

        </div>
    );
}

export default Questions;