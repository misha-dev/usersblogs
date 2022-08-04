import { CommentInterface } from "../../../interfaces/CommentInterface";
import cl from "./Comment.module.scss";

export const Comment = ({ text, userName, photoURL, createdAt }: CommentInterface) => {
  return (
    <div className={cl.commentWrapper}>
      <div className={cl.commentInfo}>
        <div className={cl.commentUserInfo}>
          <img src={photoURL} alt="" />
          <div className={cl.userName}>{userName}</div>
        </div>
        <div className={cl.commentCreatedAt}>{createdAt?.toDate().toLocaleString("en-AU").split(",")[0]}</div>
      </div>
      <div className={cl.commentText}>{text}</div>
    </div>
  );
};
