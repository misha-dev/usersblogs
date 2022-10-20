import { useEffect, useState } from "react";

import { useFormType } from "../interfaces/InputTypes.types";

type validationsType = { [key: string]: number | boolean | RegExp };
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const useValidation = (value: string, validations: validationsType) => {
  const [error, setError] = useState("");
  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
      case "notEmpty":
        value.length ? setError("") : setError("Required");
        break;
      case "minLength":
        value.length < validations[validation] ? setError(`Should be at least ${validations[validation]} letters!`) : setError("");
        break;
      case "email":
        emailRegex.test(value) ? setError("") : setError("Enter correct email!");
        break;

      default:
        break;
      }
    }
  }, [value]);

  return { error };
};

export const useFormInput = (initialValue: string, validations: validationsType, type: "text" | "password"): useFormType => {
  const [value, setValue] = useState(initialValue);
  const [dirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);
  const onBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setDirty(true);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (type === "password" && value.length <= 15) {
      setValue(value);
    } else {
      if ((/^[a-zA-Zа-яА-Я](\w\w*)*/g.test(value) && value.length <= 25) || value === "") {
        setValue(value);
      }
    }
  };

  return { value, dirty, valid, onBlur, onChange, setValue };
};
