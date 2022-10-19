type baseParams = {
  id: string;
  name: string;
};

export type InputType = {
  placeholder: string;
  type: "password" | "text";
  handler: useFormType;
} & baseParams;

export type useFormType = {
  value: string;
  dirty: boolean;
  valid: {
    error: string;
  };
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
