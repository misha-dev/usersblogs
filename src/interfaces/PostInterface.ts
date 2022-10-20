import { Timestamp } from "firebase/firestore";

export default interface PostInterface {
  uid: string;
  id: string;
  userName: string;
  text: string;
  userPhotoURL: string;
  postPhotoURL: string;
  likes: Array<string>;
  createdAt: Timestamp;
  isPreview: boolean;
};;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
