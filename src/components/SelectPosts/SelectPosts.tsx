import { query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { colUsersRef } from "../../firebase/config";
import { UserInterface } from "../../interfaces/UserInterface";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPosts } from "../../store/userSlice";
import cl from "./SelectPosts.module.scss";

export const SelectPosts = () => {
  const { uid } = useAppSelector((state) => state.user.user);

  const [data, loading] = useCollection(query(colUsersRef, where("uid", "!=", uid)));
  const { selectedPosts } = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  return (
    <div className={cl.selectPostsWrapper}>
      <div className={cl.selectPostsContent}>
        {loading && <p className={cl.loader}>Loading</p>}
        {data && (
          <>
            <label>
              <input
                checked={selectedPosts === "all"}
                onChange={() => {
                  dispatch(selectPosts({ selectedPosts: "all" }));
                }}
                value={"all"}
                type="radio"
                name="selectPosts"
              />
              <div className={cl.selectPostsItem}>All</div>
            </label>
            <label>
              <input
                onChange={() => {
                  dispatch(selectPosts({ selectedPosts: "liked" }));
                }}
                type="radio"
                name="selectPosts"
              />
              <div className={cl.selectPostsItem}>Liked</div>
            </label>
            <label>
              <input
                onChange={() => {
                  dispatch(selectPosts({ selectedPosts: "my" }));
                }}
                type="radio"
                name="selectPosts"
              />
              <div className={cl.selectPostsItem}>My</div>
            </label>
            {data.docs.map((doc) => {
              const { displayName, uid } = doc.data() as UserInterface;
              return (
                <label key={doc.id}>
                  <input
                    type="radio"
                    onChange={() => {
                      dispatch(selectPosts({ selectedPosts: uid }));
                    }}
                    name="selectPosts"
                  />
                  <div className={cl.selectPostsItem}>{displayName}</div>
                </label>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
