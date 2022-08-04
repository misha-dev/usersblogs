import { doc, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import { colCommentsRef, db } from "../../firebase/config";
import PostInterface from "../../interfaces/PostInterface";
import { useAppSelector } from "../../store/hooks";
import { Comments } from "../Comments/Comments";
import cl from "./Post.module.scss";

export const Post = ({ id, uid, userName, postPhotoURL, userPhotoURL, createdAt, text, likes, isPreview }: PostInterface) => {
  const { uid: uidCurrentUser } = useAppSelector((state) => state.user.user);
  const [comments, loading, error] = useCollectionData(query(colCommentsRef, where("postId", "==", id)));
  const commentsRef = useRef<HTMLDivElement>(null!);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (likes.includes(uidCurrentUser)) {
      setLiked(true);
    }
  }, []);
  const likePost = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    const postDocRef = doc(db, "posts", id);

    if (likes.includes(uidCurrentUser)) {
      likes.splice(likes.indexOf(uidCurrentUser), 1);
      updateDoc(postDocRef, {
        likes,
      });
    } else {
      likes.push(uidCurrentUser);
      updateDoc(postDocRef, {
        likes,
      });
    }
    setLiked(!liked);
  };

  const showComments = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    const commentsClassList = commentsRef.current.classList;
    commentsClassList.contains("hide") ? commentsClassList.remove("hide") : commentsClassList.add("hide");
  };
  return (
    <div className={cl.postContentContainer}>
      <div className={cl.postContentWrapper}>
        <div className={cl.postUserPhotoAndDisplayName}>
          <img src={userPhotoURL} className={cl.userPhoto} alt="" />
          <div className={cl.userDisplayName}>{userName}</div>
        </div>

        <div className={cl.postCreatedAt}>Created at {createdAt.toDate().toLocaleString("en-AU").split(",")[0]}</div>
        <img src={postPhotoURL} className={cl.postImg} alt="" />

        <div className={cl.postText}>{text}</div>

        <div className={cl.postOptionsContent}>
          <div className={cl.postOption}>
            {liked ? (
              <BsHeartFill onClick={isPreview ? () => {} : likePost} fontSize="1.25rem" cursor="pointer" />
            ) : (
              <BsHeart onClick={isPreview ? () => {} : likePost} fontSize="1.25rem" cursor="pointer" />
            )}
            {likes.length === 1 ? <span>{likes.length} like</span> : <span>{likes.length} likes</span>}
          </div>
          <div className={cl.postOption}>
            <FaRegCommentAlt onClick={isPreview ? () => {} : showComments} fontSize="1.25rem" cursor="pointer" />

            {comments?.length === 1 ? <span>{comments?.length} comment</span> : <span>{comments?.length} comments</span>}
          </div>
        </div>
      </div>
      <div className="hide" ref={commentsRef}>
        <Comments />
      </div>
    </div>
  );
};
