import { useRef } from "react";
import { EmailPassName } from "./EmailPassName/EmailPassName";
import cl from "./Register.module.scss";
import { UserImage } from "./UserImage/UserImage";

export const Register = () => {
  const registerWrapper = useRef<HTMLDivElement | null>(null);
  return (
    <div className={cl.registerContent}>
      <div ref={registerWrapper} className={cl.registerWrapper}>
        <div className={cl.registrationBox}>
          <EmailPassName refToWrapper={registerWrapper} />
        </div>
        <div className={cl.registrationBox}>
          <UserImage refToWrapper={registerWrapper} />
        </div>
      </div>
    </div>
  );
};
