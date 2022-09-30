import { DocumentData, QuerySnapshot } from "firebase/firestore";

import { CommentInterface } from "../../interfaces/CommentInterface";

import { Comment } from "./Comment/Comment";
import cl from "./Comments.module.scss";

interface CommentsProps {
  comments: QuerySnapshot<DocumentData>;
}

export const Comments = ({ comments }: CommentsProps) => {
  return (
    <>
      {comments.docs
        .sort((a, b) => {
          return a.data().createdAt.seconds - b.data().createdAt.seconds;
        })
        .map((doc) => {
          const { userName, photoURL, createdAt, text, postId } = doc.data() as CommentInterface;

          return (
            <div key={doc.id} className={cl.commentsWrapper}>
              <Comment postId={postId} createdAt={createdAt} photoURL={photoURL} text={text} userName={userName} />
            </div>
          );
        })}
    </>
  );
};
