import { Blog } from "./Blog/Blog";
import cl from "./Blogs.module.scss";

export const Blogs = () => {
  return (
    <div className={cl.contentWrapper}>
      <Blog />
    </div>
  );
};
