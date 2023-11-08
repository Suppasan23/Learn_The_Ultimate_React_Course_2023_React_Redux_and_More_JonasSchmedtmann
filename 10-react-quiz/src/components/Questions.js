import RevealAnswer from "./RevealAnswer";
import Options from "./Options"
import NextButton from "./NextButton";
import { QuizContextUsing } from "../contexts/QuizContext";


function Questions(){

    const { currentQuestion, choosing } = QuizContextUsing();
    
    return(
        <>
            <div>
                <p style={{fontSize:"30px"}}>{currentQuestion.question}</p>

                <div>
                    {currentQuestion.options.map((eachOpt, i) => (
                        <Options    key={i}
                                    i={i}
                                    eachOpt={eachOpt}
                        />
                    ))}
                </div>

                <div>
                    {(choosing !== null && choosing !== currentQuestion.correctOption) && <RevealAnswer/>}
                </div>

                <div>
                    {(choosing !== null) && <NextButton/>}
                </div>

            </div>
        </>
    );
}

export default Questions;