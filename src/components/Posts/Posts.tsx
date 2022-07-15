import { Post } from "../Post/Post";
import cl from "./Posts.module.scss";

export const Posts = () => {
  return (
    <div className={cl.contentWrapper}>
      <Post />
    </div>
  );
};
