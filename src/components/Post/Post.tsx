import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import { db } from "../../firebase/config";
import PostInterface from "../../interfaces/PostInterface";
import { useAppSelector } from "../../store/hooks";
import cl from "./Post.module.scss";

export const Post = ({ id, uid, userName, postPhotoURL, userPhotoURL, createdAt, text, likes, isPreview }: PostInterface) => {
  const { uid: uidCurrentUser } = useAppSelector((state) => state.user.user);
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
  return (
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
          <span>{likes.length} likes</span>
        </div>
        <div className={cl.postOption}>
          <FaRegCommentAlt onClick={isPreview ? () => {} : likePost} fontSize="1.25rem" cursor="pointer" />

          <span>{0} comments</span>
        </div>
      </div>
    </div>
  );
};
