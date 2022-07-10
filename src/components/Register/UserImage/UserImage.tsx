import React, { useRef, useState } from "react";
import { MdOutlineKeyboardArrowLeft, MdPhotoCamera } from "react-icons/md";
import cl from "./UserImage.module.scss";

type props = {
  refToWrapper: React.RefObject<HTMLDivElement>;
  imageFile: File;
  setImageFile: React.Dispatch<React.SetStateAction<File>>;
};

export const UserImage = ({ refToWrapper, imageFile, setImageFile }: props) => {
  // null! is for using after current without ? sign
  const refToUserImg = useRef<HTMLInputElement>(null!);
  const [htmlImageReader, setHtmlImageReader] = useState("");
  const uploadToHTML: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const file = refToUserImg.current.files![0];

    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const result = reader.result;
        setHtmlImageReader(result as string);
        refToUserImg.current.value = "";
      };
    }
  };
  return (
    <>
      <div className={cl.userImgContent}>
        <div className={cl.header}>Choose profile image</div>
        <label>
          <div className={cl.imageWrapper}>
            <img src={htmlImageReader ? htmlImageReader : require("../../../imgs/userImgPreloader.png")} alt="" className={cl.userImageSample}></img>
            <div className={cl.photoSign}>
              <MdPhotoCamera />
            </div>
            <input ref={refToUserImg} onChange={uploadToHTML} type="file" />
          </div>
        </label>
      </div>
      <div className={cl.back}>
        <MdOutlineKeyboardArrowLeft /> Back
      </div>
    </>
  );
};
