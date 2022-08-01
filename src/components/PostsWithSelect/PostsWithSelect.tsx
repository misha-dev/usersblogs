import { Posts } from "../Posts/Posts";
import { SelectPosts } from "../SelectPosts/SelectPosts";
import cl from "./PostsWithSelect.module.scss";

export const PostsWithSelect = () => {
  return (
    <div className={cl.postsWithSelectWrapper}>
      <SelectPosts />
      <Posts />
    </div>
  );
};
