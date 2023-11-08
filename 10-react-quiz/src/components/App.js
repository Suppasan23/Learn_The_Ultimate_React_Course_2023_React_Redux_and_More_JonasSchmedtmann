import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import ProgressBar from "./ProgressBar";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import { QuizContextUsing } from "../contexts/QuizContext";

export default function App(){
  const {status} = QuizContextUsing();

  return (
    <div className="app">
        <Header />
      
        <Main>
          {status === 'loading' && <Loader />}
          {status === 'error' && <Error />}
          {status === 'ready' && <StartScreen />}
          {status === 'active' && <>
                                    <Timer />
                                    <ProgressBar />      
                                    <Questions />
                                  </>}
          {status === 'finished' && <>
                                      <ProgressBar />
                                      <FinishScreen />
                                    </>}
        </Main>
    </div>
  )
}