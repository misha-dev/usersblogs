import { Timestamp } from "firebase/firestore";

export interface CommentInterface {
  uid: string;
  userName: string;
  photoURL: string;
  createdAt: Timestamp;
}
