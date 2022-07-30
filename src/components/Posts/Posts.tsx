import { useCollection } from "react-firebase-hooks/firestore";
import { colPostsRef } from "../../firebase/config";
import PostInterface from "../../interfaces/PostInterface";
import { Post } from "../Post/Post";
import cl from "./Posts.module.scss";

export const Posts = () => {
  const [data, loading, error] = useCollection(colPostsRef);
  return (
    <div className={cl.contentWrapper}>
      {error && <p>{error.message}</p>}
      {loading ? (
        <p>Loading</p>
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
