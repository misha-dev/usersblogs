import { Timestamp } from "firebase/firestore";
import { Post } from "../Post/Post";
import cl from "./Posts.module.scss";

export const Posts = () => {
  return (
    <div className={cl.contentWrapper}>
      <Post
        uid={"d"}
        id={"d"}
        displayName={"Misha"}
        createdAt={Timestamp.now()}
        UserPhotoURL={"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Check_green_icon.svg/2048px-Check_green_icon.svg.png"}
        PostImageURL={"https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt48f811476e162ed0/620c15764ae5ae6845c6b0c9/LOL_Homepage_Modal_(1680x650)_(1).jpg"}
        text={
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi numquam accusamus dignissimos. Iste voluptatum asperiores a, veritatis quidem at ipsum eius delectus perspiciatis ut ipsa? repudiandae Fuga asperiores tempore vitae!"
        }
        likes={["d"]}
        isPreview={false}
      />
    </div>
  );
};
