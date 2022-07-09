import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import cl from "./EmailPassName.module.scss";

export const EmailPassName = () => {
  return (
    <>
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
        Next <MdOutlineKeyboardArrowRight />
      </div>
    </>
  );
};
