import { Timestamp } from "firebase/firestore";

export interface CommentInterface {
  postId: string;
  text: string;
  userName: string;
  photoURL: string;
  createdAt: Timestamp;
}
