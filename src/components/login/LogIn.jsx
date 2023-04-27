import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { verifiedUser } from "../../utils/database/user";
import emailImage from "../../utils/images/mail.svg";
import passwordImage from "../../utils/images/password.svg";
import styles from "./login.module.css";
function LogIn({ setLogin }) {
  // for login use email - shubham@gmail.com password - 123456
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();
    if (!verifiedUser(email, password)) return;
    setLogin(true);
    navigate("/tasks");
  }
  return (
    <div className={styles.login_container}>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <div className={styles.input_container}>
          <label htmlFor="email" className={styles.label_container}>
            <img src={emailImage} alt="" width={32} />
            <span>Email</span>
          </label>
          <input
            className={styles.input_el}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            required
            minLength={8}
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="password" className={styles.label_container}>
            <img src={passwordImage} alt="" width={32} />
            <span>Password</span>
          </label>
          <input
            className={styles.input_el}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            required
            minLength={6}
          />
        </div>
        <input
          className={styles.input_submit}
          type="submit"
          value="Login"
          id="submit"
        />
      </form>
    </div>
  );
}

export default LogIn;
