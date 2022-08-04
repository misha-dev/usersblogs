import { useState } from "react";
import { CustomTextArea } from "../CustomTextArea/CustomTextArea";
import { Comment } from "./Comment/Comment";
import cl from "./Comments.module.scss";

export const Comments = () => {

  return (
    <div className={cl.commentsWrapper}>
      <Comment />
    </div>
  );
};
