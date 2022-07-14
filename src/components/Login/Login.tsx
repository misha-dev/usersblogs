import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase/config";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/userSlice";
import cl from "./Login.module.scss";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  return (
    <div className={cl.loginContentWrapper}>
      <form action="#">
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
                type="password"
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button
            onClick={() => {
              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  const { uid, email, displayName, photoURL } = userCredential.user;
                  if (displayName && email && photoURL) {
                    dispatch(setUser({ uid, email, displayName, photoURL }));
                  }
                })
                .catch((error) => {
                  alert("Invalid password or email");
                  setPassword("");
                });
            }}
            className={cl.loginButton}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
