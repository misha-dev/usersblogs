import cl from "./SelectPosts.module.scss";

export const SelectPosts = () => {
  return (
    <div className={cl.selectPostsWrapper}>
      <div className={cl.selectPostsContent}>
        <label>
          <input type="radio" name="selectPosts" />
          <div className={cl.selectPostsItem}>All</div>
        </label>
        <label>
          <input type="radio" name="selectPosts" />
          <div className={cl.selectPostsItem}>Liked</div>
        </label>
      </div>
    </div>
  );
};
