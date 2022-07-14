import { BsHeartFill } from "react-icons/bs";
import cl from "./Blog.module.scss";
export const Blog = () => {
  return (
    <div className={cl.blogContentWrapper}>
      <div className={cl.blogUserPhotoAndDisplayName}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Check_green_icon.svg/2048px-Check_green_icon.svg.png" className={cl.userPhoto} alt="" />
        <div className={cl.userDisplayName}>Misha</div>
      </div>

      <div className={cl.postCreatedAt}>Created at 15/04/2022</div>
      <img src="https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt48f811476e162ed0/620c15764ae5ae6845c6b0c9/LOL_Homepage_Modal_(1680x650)_(1).jpg" className={cl.postImg} alt="" />

      <div className={cl.postText}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi numquam accusamus dignissimos. Iste voluptatum asperiores a, veritatis quidem at ipsum eius delectus perspiciatis ut ipsa
        repudiandae? Fuga asperiores tempore vitae!
      </div>

      <div className={cl.postLikeContent}>
        <div className={cl.postLike}>
          <BsHeartFill color="#54a3a0" fontSize="1.25rem" cursor="pointer" /> <span>0 likes</span>
        </div>
      </div>
    </div>
  );
};
