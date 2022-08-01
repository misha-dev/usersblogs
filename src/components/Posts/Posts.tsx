import { query, QueryConstraint, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { colPostsRef } from "../../firebase/config";
import PostInterface from "../../interfaces/PostInterface";
import { LoaderHollowCircle } from "../../Loaders/LoaderHollowCircle/LoaderHollowCircle";
import { useAppSelector } from "../../store/hooks";
import { Post } from "../Post/Post";
import cl from "./Posts.module.scss";

export const Posts = () => {
  const { selectedPosts, uid } = useAppSelector((state) => state.user.user);
  // for selecting every post
  let queryPosts = where("uid", "!=", -1);

  if (selectedPosts && uid) {
    if (selectedPosts === "all") {
      queryPosts = where("uid", "!=", -1);
    } else if (selectedPosts === "liked") {
      queryPosts = where("likes", "array-contains", uid);
    } else if (selectedPosts === "my") {
      queryPosts = where("uid", "==", uid);
    } else {
      queryPosts = where("uid", "==", selectedPosts);
    }
  }
  const [data, loading, error] = useCollection(query(colPostsRef, queryPosts as QueryConstraint));

  return (
    <div className={cl.contentWrapper}>
      {error && <p>{error.message}</p>}
      {loading ? (
        <LoaderHollowCircle />
      ) : (
        data && (
            data.docs
              .sort((a, b) => {
                return b.data().createdAt.seconds - a.data().createdAt.seconds;
              })
              .map((doc) => {
                const { uid, userName, userPhotoURL, createdAt, postPhotoURL, text, likes } = doc.data() as PostInterface;
                return (
                  <Post
                    key={doc.id}
                    id={doc.id}
                    uid={uid}
                    userName={userName}
                    createdAt={createdAt}
                    userPhotoURL={userPhotoURL}
                    postPhotoURL={postPhotoURL}
                    text={text}
                    likes={likes}
                    isPreview={false}
                  />
                );
              })
        )
      )}
    </div>
  );
};
