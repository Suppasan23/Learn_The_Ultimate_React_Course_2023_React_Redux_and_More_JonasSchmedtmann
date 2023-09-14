import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

function Homepage() {
    return (
        <>
            <p>
                <span>WorldWise</span>&nbsp;
            </p>

            <div>
                <PageNav />
                <AppNav />
            </div>

            <div>
                <Link to="/app">Go to the app</Link>
            </div>
            
            <img src="src\images\rrrr.jpg" alt="Mountian festival"/>
        </>
    )
}

export default Homepage;
