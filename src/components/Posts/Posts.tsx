import { query, QueryConstraint, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { animated, Transition } from "react-spring";
import { colPostsRef } from "../../firebase/config";
import PostInterface from "../../interfaces/PostInterface";
import { LoaderHollowCircle } from "../../Loaders/LoaderHollowCircle/LoaderHollowCircle";
import { useAppSelector } from "../../store/hooks";
import { Post } from "../Post/Post";
import cl from "./Posts.module.scss";

export const Posts = () => {
  const { selectedPosts, uid } = useAppSelector((state) => state.user);
  // for selecting every post
  let queryPosts = where("uid", "!=", -1);

  if (selectedPosts) {
    if (selectedPosts === "all") {
      queryPosts = where("uid", "!=", -1);
    } else if (selectedPosts === "liked") {
      queryPosts = where("likes", "array-contains", uid);
    } else if (selectedPosts === "my") {
      queryPosts = where("uid", "==", uid);
    } else {
      // chooses the uid of user selected
      queryPosts = where("uid", "==", selectedPosts);
    }
  }
  const [posts, loading, error] = useCollection(query(colPostsRef, queryPosts as QueryConstraint));
  let timeOfDelay = -125;

  return (
    <div className={cl.contentWrapper}>
      {error && <p>{error.message}</p>}
      {loading ? (
        <LoaderHollowCircle />
      ) : posts && posts.docs.length === 0 ? (
        <div className={cl.noPosts}>No posts found :(</div>
      ) : (
        posts?.docs
          .sort((a, b) => {
            return b.data().createdAt.seconds - a.data().createdAt.seconds;
          })
          .map((doc) => {
            const { uid, userName, userPhotoURL, createdAt, postPhotoURL, text, likes } = doc.data() as PostInterface;
            timeOfDelay += 125;
            return (
              <Transition
                key={doc.id}
                items={true}
                from={{ opacity: 0.1, transform: "translateY(80vh)" }}
                enter={{ opacity: 1, transform: "translateY(0)" }}
                leave={{ opacity: 0, transform: "translateY(-80vh)" }}
                delay={timeOfDelay}
                config={{ mass: 1, tension: 160, friction: 21 }}
              >
                {(style, item) =>
                  item && (
                    <animated.div style={style}>
                      <Post id={doc.id} uid={uid} userName={userName} createdAt={createdAt} userPhotoURL={userPhotoURL} postPhotoURL={postPhotoURL} text={text} likes={likes} isPreview={false} />
                    </animated.div>
                  )
                }
              </Transition>
            );
          })
      )}
      {/* for margin of the last post */}
      <div style={{ color: "transparent", fontSize: "1px" }}>k</div>
    </div>
  );
};
