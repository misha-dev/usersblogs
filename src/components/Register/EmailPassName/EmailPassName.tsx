import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import { useFormType } from "../../../interfaces/InputTypes.types";

import { FormInputWithValidation } from "../../Utils/FormInputWithValidation/FormInputWithValidation";

import cl from "./EmailPassName.module.scss";

type props = {
  refToWrapper: React.RefObject<HTMLDivElement>;
  email: useFormType;
  password: useFormType;
  displayName: useFormType;
  moveWrapper: string;
  validUserData: boolean;
};

export const EmailPassName = ({ refToWrapper, email, password, displayName, moveWrapper, validUserData }: props) => {
  return (
    <>
      <div className={cl.registrationEmailPassNameWrapper}>
        <FormInputWithValidation id="email" name="email" placeholder="Email" handler={email} type="text" />
        <FormInputWithValidation id="password" name="password" placeholder="Password" handler={password} type="password" />
        <FormInputWithValidation id="displayName" name="displayName" placeholder="Display Name" handler={displayName} type="text" />
      </div>
      <div className={cl.nextPageWrapper}>
        <div
          className={`${cl.nextPage} ${validUserData ? "" : "disabled"}`}
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
