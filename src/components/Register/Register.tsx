import cl from "./Register.module.scss";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
export const Register = () => {
  return (
    <div className={cl.registerContent}>
      <div className={cl.registerWrapper}>
        <div className={cl.registrationBox}>
          <div className={cl.registrationEmailPassNameWrapper}>
            <div className={cl.inputWrapper}>
              <input id="email" required type="text" />
              <label htmlFor="email">Email</label>
            </div>

            <div className={cl.inputWrapper}>
              <input id="password" required type="password" />
              <label htmlFor="password">Password</label>
            </div>

            <div className={cl.inputWrapper}>
              <input id="displayName" required type="text" />
              <label htmlFor="displayName">Display Name</label>
            </div>
          </div>
          <div className={cl.nextPage}>
            Next Page <MdOutlineKeyboardArrowRight />
          </div>
        </div>
        <div className={cl.registrationBox}>kkk</div>
      </div>
    </div>
  );
};
