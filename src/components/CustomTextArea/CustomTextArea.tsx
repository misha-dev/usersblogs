import { useRef } from "react";
import cl from "./CustomTextArea.module.scss";

interface CustomTextAreaProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  onEnter?: () => void;
}

export const CustomTextArea = ({ text, setText, onEnter }: CustomTextAreaProps) => {
  const refTextArea = useRef<HTMLTextAreaElement>(null!);

  return (
    <textarea
      onKeyDown={(e) => {
        if (e.key === "Enter" && text !== "".trim()) {
          if (onEnter) {
            e.preventDefault();
            onEnter();
          }
        }
      }}
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
