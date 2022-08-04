import { Timestamp } from "firebase/firestore";

export interface CommentInterface {
  postId: string;
  userName: string;
  photoURL: string;
  createdAt: Timestamp;
}
