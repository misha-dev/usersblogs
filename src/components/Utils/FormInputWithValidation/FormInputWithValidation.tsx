import { InputType } from "../../../interfaces/InputTypes.types";
import { FormInput } from "../FormInput/FormInput";

import cl from "./FormInputWithValidation.module.scss";

export const FormInputWithValidation = ({ handler, id, name, placeholder, type }: InputType) => {
  console.log(handler.dirty);

  return (
    <div className={cl.inputWrapperValidation}>
      <FormInput id={id} name={name} handler={handler} placeholder={placeholder} type={type} />
      {handler.valid.error && !handler.dirty ? null : <div className={cl.registerFormError}>{handler.valid.error}</div>}
    </div>
  );
};
