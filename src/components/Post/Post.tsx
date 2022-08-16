import { addDoc, doc, query, Timestamp, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import { colCommentsRef, db } from "../../firebase/config";
import { CommentInterface } from "../../interfaces/CommentInterface";
import PostInterface from "../../interfaces/PostInterface";
import { useAppSelector } from "../../store/hooks";
import { dateFormat } from "../../utils/dateFormat";
import { Comments } from "../Comments/Comments";
import { CustomTextArea } from "../CustomTextArea/CustomTextArea";
import cl from "./Post.module.scss";

export const Post = ({ id, uid, userName, postPhotoURL, userPhotoURL, createdAt, text, likes, isPreview }: PostInterface) => {
  const [comments, loading, error] = useCollection(query(colCommentsRef, where("postId", "==", id)));
  const { uid: uidCurrentUser, displayName, photoURL } = useAppSelector((state) => state.user.user);
  const [commentText, setCommentText] = useState("");

  const commentsRef = useRef<HTMLDivElement>(null!);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (likes.includes(uidCurrentUser)) {
      setLiked(true);
    }
  }, []);
  const likePost = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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

  const showComments = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const commentsClassList = commentsRef.current.classList;
    commentsClassList.contains("hide") ? commentsClassList.remove("hide") : commentsClassList.add("hide");
  };

  const addComment = () => {
    if (commentText.trim() !== "") {
      addDoc(colCommentsRef, {
        postId: id,
        userName: displayName,
        photoURL,
        text: commentText,
        createdAt: Timestamp.now(),
      } as CommentInterface);
      setCommentText("");
    }
  };
  return (
    <div className={cl.postContentContainer}>
      <div className={cl.postContentWrapper}>
        <div className={cl.postUserPhotoAndDisplayName}>
          <img src={userPhotoURL} className={cl.userPhoto} alt="" />
          <div className={cl.userDisplayName}>{userName}</div>
        </div>

        <div className={cl.postCreatedAt}>Created at {dateFormat.format(createdAt.toDate())}</div>
        <img src={postPhotoURL} className={cl.postImg} alt="" />

        <div className={cl.postText}>{text}</div>

        <div className={cl.postOptionsContent}>
          <div className={cl.postOption} onClick={isPreview ? () => {} : likePost}>
            {liked ? <BsHeartFill className={cl.iconPostOption} /> : <BsHeart className={cl.iconPostOption} />}
            {likes.length === 1 ? <span>{likes.length} like</span> : <span>{likes.length} likes</span>}
          </div>
          <div className={cl.postOption} onClick={isPreview ? () => {} : showComments}>
            <FaRegCommentAlt className={cl.iconPostOption} />

            {comments?.docs.length === 1 ? <span>{comments?.docs.length} comment</span> : <span>{comments?.docs.length} comments</span>}
          </div>
        </div>
      </div>
      <div className="hide" ref={commentsRef}>
        {comments && <Comments comments={comments} />}
        <div style={{ marginTop: "10px" }}>
          <CustomTextArea onEnter={addComment} text={commentText} setText={setCommentText} />
        </div>
        <div className={cl.buttonSendWrapper}>
          <button className={`${cl.buttonSend} ${commentText.trim() === "" ? "disabled" : ""}`} onClick={addComment}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
