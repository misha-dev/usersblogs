import { InputType } from "../../../interfaces/InputTypes.types";

import cl from "./FormInput.module.scss";

export const FormInput = ({ handler, id, name, placeholder, type }: InputType) => {
  return (
    <div className={cl.inputWrapper}>
      <input onChange={handler.onChange} value={handler.value} onBlur={handler.onBlur } autoCorrect="false" autoComplete="false" id={id} name={name} required type={type} />
      <label htmlFor={id}>{placeholder}</label>
    </div>
  );
};
