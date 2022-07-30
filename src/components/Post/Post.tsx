import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import cl from "./Post.module.scss";

interface props {
  uid: string;
  displayName: string;
  createdAt: Timestamp;
  UserPhotoURL: string;
  PostImageURL: string;
  text: string;
  likes: Array<string>;
  isPreview: boolean;
}
export const Post = ({ displayName, createdAt, UserPhotoURL, PostImageURL, text, likes, isPreview }: props) => {
  const [liked, setLiked] = useState(false);
  const likePost = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    setLiked(!liked);
  };
  return (
    <div className={cl.postContentWrapper}>
      <div className={cl.postUserPhotoAndDisplayName}>
        <img src={UserPhotoURL} className={cl.userPhoto} alt="" />
        <div className={cl.userDisplayName}>{displayName}</div>
      </div>

      <div className={cl.postCreatedAt}>Created at {createdAt.toDate().toLocaleString("en-AU").split(",")[0]}</div>
      <img src={PostImageURL} className={cl.postImg} alt="" />

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
