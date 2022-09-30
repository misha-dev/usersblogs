import { query, where } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import { colUsersRef } from "../../firebase/config";
import { UserInterface } from "../../interfaces/UserInterface";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPosts } from "../../store/userSlice";

import cl from "./SelectPosts.module.scss";

export const SelectPosts = () => {
  const { uid, selectedPosts } = useAppSelector((state) => state.user);
  let querySelectPosts;
  if (uid) {
    querySelectPosts = where("uid", "!=", uid);
  } else {
    querySelectPosts = where("uid", "!=", -1);
  }
  const [data, loading] = useCollection(query(colUsersRef, querySelectPosts));
  const selectPostsRef = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    selectPostsRef.current.addEventListener("wheel", (e) => {
      e.preventDefault();
      selectPostsRef.current.scrollLeft += e.deltaY;
    });
  }, []);
  const dispatch = useAppDispatch();

  return (
    <div className={cl.selectPostsWrapper}>
      <div ref={selectPostsRef} className={`${cl.selectPostsContent} ${cl.horizontalScroll}`}>
        {(loading || !selectPosts) && <p className={cl.loader}>Loading</p>}
        {data && (
          <>
            <label className={uid ? "" : cl.lastOfBaseSelectors}>
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
            {uid ? (
              <>
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
                <label className={cl.lastOfBaseSelectors}>
                  <input
                    onChange={() => {
                      dispatch(selectPosts({ selectedPosts: "liked" }));
                    }}
                    type="radio"
                    name="selectPosts"
                  />
                  <div className={cl.selectPostsItem}>Liked</div>
                </label>
              </>
            ) : null}
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
