import { Comment } from "./Comment/Comment";
import cl from "./Comments.module.scss";

export const Comments = () => {
  return (
    <div className={cl.commentsWrapper}>
      <Comment />
    </div>
  );
};
