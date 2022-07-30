import { orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { colPostsRef } from "../../firebase/config";
import PostInterface from "../../interfaces/PostInterface";
import { LoaderHollowCircle } from "../../Loaders/LoaderHollowCircle/LoaderHollowCircle";
import { Post } from "../Post/Post";
import cl from "./Posts.module.scss";

export const Posts = () => {
  const [data, loading, error] = useCollection(query(colPostsRef, orderBy("createdAt")));
  return (
    <div className={cl.contentWrapper}>
      {error && <p>{error.message}</p>}
      {loading ? (
        <LoaderHollowCircle />
      ) : (
        data &&
        data.docs.map((doc) => {
          const { uid, userName, userPhotoURL, createdAt, postPhotoURL, text, likes } = doc.data() as PostInterface;
          return <Post key={doc.id} uid={uid} displayName={userName} createdAt={createdAt} UserPhotoURL={userPhotoURL} PostImageURL={postPhotoURL} text={text} likes={likes} isPreview={false} />;
        })
      )}
    </div>
  );
};
