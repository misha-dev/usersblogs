import { Timestamp } from "firebase/firestore";

export default interface PostInterface {
  uid: string;
  userName: string;
  text: string;
  userPhotoURL: string;
  postPhotoURL: string;
  likes: Array<string>;
  createdAt: Timestamp;
}
