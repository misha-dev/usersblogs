import { useRef } from "react";
import cl from "./CustomTextArea.module.scss";

interface CustomTextAreaProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export const CustomTextArea = ({ text, setText }: CustomTextAreaProps) => {
  const refTextArea = useRef<HTMLTextAreaElement>(null!);

  return (
    <textarea
      ref={refTextArea}
      onKeyUp={(e) => {
        refTextArea.current.style.height = "auto";
        // +2 to include borders of textArea
        const scHeight = e.currentTarget.scrollHeight + 2;
        refTextArea.current.style.height = `${scHeight}px`;
      }}
      autoComplete="off"
      autoCorrect="off"
      value={text}
      onChange={(e) => {
        setText(e.currentTarget.value);
      }}
      className={cl.textAreaStyle}
      placeholder="Enter a text"
    />
  );
};
