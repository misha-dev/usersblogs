import React, { useRef, useState } from "react";
import { MdOutlineKeyboardArrowLeft, MdPhotoCamera } from "react-icons/md";

import cl from "./UserImageLoader.module.scss";

type props = {
  refToWrapper: React.RefObject<HTMLDivElement>;
  setImageFile: React.Dispatch<React.SetStateAction<File>>;
  register: () => void;
  validUserData: boolean;
  moveWrapper: string;
};

export const UserImageLoader: React.FC<props> = ({ refToWrapper, setImageFile, register, moveWrapper, validUserData }) => {
  // null! is for using after current without ? sign
  const refToUserImg = useRef<HTMLInputElement>(null!);
  const [htmlImageReader, setHtmlImageReader] = useState<string | null>(null);
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
            <img src={htmlImageReader ?? require("../../../imgs/userImgPreloader.png")} alt="" className={cl.userImage}></img>
            <div className={cl.photoSign}>
              <MdPhotoCamera style={{ marginLeft: "1px" }} />
            </div>
            <input ref={refToUserImg} onChange={uploadToHTML} type="file" accept="image/*" />
          </div>
        </label>
      </div>
      <div className={cl.actionWrapper}>
        <div
          onClick={() => {
            refToWrapper.current?.classList.remove(moveWrapper);
          }}
          className={cl.back}
        >
          <MdOutlineKeyboardArrowLeft /> Back
        </div>
        <button onClick={register} className={`${cl.register} ${htmlImageReader && validUserData ? "" : "disabled"}`}>
          Register
        </button>
      </div>
    </>
  );
};
