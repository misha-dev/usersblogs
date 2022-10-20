type baseParams = {
  id: string;
  name: string;
};

type HandlerState<T> = {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
};

export type InputType = {
  placeholder: string;
  type: "password" | "text";
  handler: useFormType;
} & baseParams;

export type useFormType = {
  dirty: boolean;
  valid: {
    error: string;
  };
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & HandlerState<string>;
