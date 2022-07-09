import { EmailPassName } from "./EmailPassName/EmailPassName";
import cl from "./Register.module.scss";

export const Register = () => {
  return (
    <div className={cl.registerContent}>
      <div className={cl.registerWrapper}>
        <div className={cl.registrationBox}>
          <EmailPassName />
        </div>
        <div className={cl.registrationBox}>
          kk
        </div>
      </div>
    </div>
  );
};
