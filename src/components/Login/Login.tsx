import { useState } from "react";
import cl from "./Login.module.scss";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className={cl.loginContentWrapper}>
      <div className={cl.loginWrapper}>
        <div className={cl.loginInputs}>
          <div className="inputWrapper">
            <input
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              value={email}
              autoCorrect="false"
              autoComplete="false"
              id="email"
              required
              type="text"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="inputWrapper">
            <input
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              value={password}
              autoCorrect="false"
              autoComplete="false"
              id="password"
              required
              type="text"
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <button className={cl.loginButton}>Login</button>
      </div>
    </div>
  );
};
