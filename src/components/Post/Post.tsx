import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import PostInterface from "../../interfaces/PostInterface";
import cl from "./Post.module.scss";

export const Post = ({ id, uid, userName, postPhotoURL, userPhotoURL, createdAt, text, likes, isPreview }: PostInterface) => {
  const [liked, setLiked] = useState(false);
  const likePost = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
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

      <div className={cl.postLikeContent}>
        <div className={cl.postLike}>
          {liked ? (
            <BsHeartFill onClick={isPreview ? () => {} : likePost} fontSize="1.25rem" cursor="pointer" />
          ) : (
            <BsHeart onClick={isPreview ? () => {} : likePost} fontSize="1.25rem" cursor="pointer" />
          )}
          <span>{likes.length} likes</span>
        </div>
      </div>
    </div>
  );
};
