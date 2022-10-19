import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import { FormInput } from "../../Utils/FormInput/FormInput";

import cl from "./EmailPassName.module.scss";

type props = {
  refToWrapper: React.RefObject<HTMLDivElement>;
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurEmail: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  displayName: string;
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
  moveWrapper: string;
};

export const EmailPassName = ({ refToWrapper, email, onEmailChange: emailOnChange, onBlurEmail, password, setPassword, displayName, setDisplayName, moveWrapper }: props) => {
  return (
    <>
      <div className={cl.registrationEmailPassNameWrapper}>
        <FormInput id="email" name="email" onChange={emailOnChange} placeholder="email" type="email" value={email} onBlur={onBlurEmail} />

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

        <div className="inputWrapper">
          <input
            onChange={(e) => {
              setDisplayName(e.currentTarget.value);
            }}
            value={displayName}
            autoCorrect="false"
            autoComplete="false"
            id="displayName"
            required
            type="text"
          />
          <label htmlFor="displayName">Display Name</label>
        </div>
      </div>
      <div className={cl.nextPageWrapper}>
        <div
          className={`${cl.nextPage} ${email && password && displayName ? "" : "disabled"}`}
          onClick={() => {
            refToWrapper.current?.classList.add(moveWrapper);
          }}
        >
          Next <MdOutlineKeyboardArrowRight />
        </div>
      </div>
    </>
  );
};
