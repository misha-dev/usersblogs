import { InputType } from "../../../interfaces/InputTypes.types";

export const FormInput = ({ value, id, name, placeholder, onChange, type, onBlur }: InputType) => {
  return (
    <div className="inputWrapper">
      <input onChange={onChange} value={value} onBlur={onBlur} autoCorrect="false" autoComplete="false" id={id} name={name} required type={type} />
      <label htmlFor={id}>{placeholder}</label>
    </div>
  );
};
