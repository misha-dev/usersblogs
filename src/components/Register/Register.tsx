import { useRef, useState } from "react";
import { EmailPassName } from "./EmailPassName/EmailPassName";
import cl from "./Register.module.scss";
import { UserImageLoader } from "./UserImageLoader/UserImageLoader";

export const Register = () => {
  const registerWrapper = useRef<HTMLDivElement | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [imageFile, setImageFile] = useState<File>(null!);

  return (
    <div className={cl.registerContent}>
      <div ref={registerWrapper} className={cl.registerWrapper}>
        <div className={cl.registrationBox}>
          <EmailPassName refToWrapper={registerWrapper} email={email} password={password} displayName={displayName} setEmail={setEmail} setPassword={setPassword} setDisplayName={setDisplayName} />
        </div>
        <div className={cl.registrationBox}>
          <UserImageLoader refToWrapper={registerWrapper} imageFile={imageFile} setImageFile={setImageFile} />
        </div>
      </div>
    </div>
  );
};
