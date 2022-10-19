type baseParams = {
  id: string;
  name: string;
  value: string;
};

export type InputType = {
  placeholder: string;
  type: "password" | "email" | "text";
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & baseParams;

export type InputTypeErrors = InputType & { valid: { error: string }; dirty: boolean };
