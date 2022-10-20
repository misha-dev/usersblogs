import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebase/config";
import { useFormInput } from "../../hooks/useFormInput";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/userSlice";
import { FormInputWithValidation } from "../Utils/FormInputWithValidation/FormInputWithValidation";

import cl from "./Login.module.scss";
export const Login = () => {
  const email = useFormInput("", { email: true }, "text");
  const password = useFormInput("", { notEmpty: true }, "password");
  const dispatch = useAppDispatch();
  const validUserData = !(Boolean(email.valid.error) || Boolean(password.valid.error));
  return (
    <div className={cl.loginContentWrapper}>
      <form
        // for search in jest test
        name="loginForm"
        aria-label="loginForm"
        onSubmit={(e) => {
          e.preventDefault();
          signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
              const { uid, email, displayName, photoURL } = userCredential.user;
              if (displayName && email && photoURL) {
                dispatch(setUser({ uid, email, displayName, photoURL }));
              }
            })
            .catch((error) => {
              alert("Invalid password or email");
            });
        }}
        action="#"
      >
        <div className={cl.loginWrapper}>
          <div className={cl.loginInputs}>
            <FormInputWithValidation handler={email} id={"email"} name={"email"} placeholder={"Email"} type={"text"} />
            <FormInputWithValidation handler={password} id={"password"} name={"password"} placeholder={"Password"} type={"password"} />
          </div>
          <button className={`${cl.loginButton} ${validUserData ? "" : "disabled"}`}>Login</button>
        </div>
      </form>
    </div>
  );
};
