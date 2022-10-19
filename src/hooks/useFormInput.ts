import { useEffect, useRef, useState } from "react";

type validationsType = { [key: string]: number | RegExp };
export const useValidation = (value: string, validations: validationsType) => {
  const [error, setError] = useState("");
  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation] ? setError(`Should be at least ${validations[validation]} letters!`) : setError("");
          break;

        default:
          break;
      }
    }
  }, [value]);

  return { error };
};

export const useFormInput = (initialValue: string, validations: validationsType, type: "text" | "password") => {
  const [value, setValue] = useState(initialValue);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const [dirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);
  const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setDirty(true);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (type === "password") {
      setValue(value);
    } else {
      if ((/^[a-zA-Zа-яА-Я](\w\w*)*/g.test(value) && value.length <= 20) || value === "") {

        setValue(value);
      }
    }
  };

  return { value, setValue, dirty, valid, onBlur, phoneInputRef, onChange, setDirty };
};
