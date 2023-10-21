import styles from "./Sidebar.module.css"
import AppNav from "./AppNav";
import Logo from "./Logo";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <>
            <Link to="/">Back</Link>

            <div className={styles.sidebar}>

                <Logo />

                

                <AppNav />

                <p>List of cities</p>

                <footer className={styles.footer}>
                    <p className={styles.copyright}>
                        &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
                    </p>
                </footer>

            </div>
        </>
    )
}

export default Sidebar;
