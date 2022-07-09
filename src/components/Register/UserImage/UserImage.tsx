import { MdOutlineKeyboardArrowLeft, MdPhotoCamera } from "react-icons/md";
import cl from "./UserImage.module.scss";

export const UserImage = () => {
  return (
    <>
      <div className={cl.userImgContent}>
        <div className={cl.header}>Choose profile image</div>
        <label>
          <div className={cl.imageWrapper}>
            <img src={require("../../../imgs/userImgPreloader.png")} alt="" className={cl.userImageSample}></img>
            <div className={cl.photoSign}>
              <MdPhotoCamera />
            </div>
            <input type="file" />
          </div>
        </label>
      </div>
      <div className={cl.back}>
        <MdOutlineKeyboardArrowLeft /> Back
      </div>
    </>
  );
};
