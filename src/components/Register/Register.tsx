import { useRef } from "react";
import { EmailPassName } from "./EmailPassName/EmailPassName";
import cl from "./Register.module.scss";

export const Register = () => {
  const registerWrapper = useRef<HTMLDivElement | null>(null);
  return (
    <div className={cl.registerContent}>
      <div ref={registerWrapper} className={cl.registerWrapper}>
        <div className={cl.registrationBox}>
          <EmailPassName />
        </div>
        <div className={cl.registrationBox}>kk</div>
      </div>
    </div>
  );
};
