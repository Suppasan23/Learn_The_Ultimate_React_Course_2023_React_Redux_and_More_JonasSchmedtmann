import { useEffect, useState } from "react";
import "../index.css"
import styles from "./Login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import { AuthContext_Using } from "../contexts/AuthContext";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const {isAuthenticated, login} = AuthContext_Using();
  const navigate = useNavigate();

  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  
  useEffect(()=>{
      if(isAuthenticated === true){
        navigate("/app", {replace: true});
      }
  },[isAuthenticated, navigate])

  async function handleLogin(e) {
    e.preventDefault();
    await login(email, password)
  }

  return (
    <main className={styles.login}>

      <PageNav />

      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className={styles.div_button}>
          <button className={styles.button}><strong>Login</strong></button>
          <button className={styles.button}><strong><NavLink to='/'>Cancel</NavLink></strong></button>
        </div>
      </form>
    </main>
  );
}
