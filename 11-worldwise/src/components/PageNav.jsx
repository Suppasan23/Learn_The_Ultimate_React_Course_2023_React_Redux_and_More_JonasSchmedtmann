import styles from "./PageNav.module.css";
import { NavLink } from "react-router-dom";

function PageNav() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li><NavLink to='/' style={{fontSize:"20px"}}>Home</NavLink></li>
                <li><NavLink to='/product' style={{fontSize:"20px"}}>Product</NavLink></li>
                <li><NavLink to='/pricing' style={{fontSize:"20px"}}>Pricing</NavLink></li>
                <li><NavLink to='/login' style={{fontSize:"20px"}}>Login</NavLink></li>
            </ul>
        </nav>
    )
}

export default PageNav;