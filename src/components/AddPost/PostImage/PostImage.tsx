import { useRef } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import cl from "./PostImage.module.scss";

interface props {
  imageFile: File;
  setImageFile: React.Dispatch<React.SetStateAction<File>>;
  htmlImageReader: string;
  setHtmlImageReader: React.Dispatch<React.SetStateAction<string>>;
}

export const PostImage = ({ imageFile, setImageFile, htmlImageReader, setHtmlImageReader }: props) => {
  const refToPostImg = useRef<HTMLInputElement>(null!);

  const uploadToHTML: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const file = refToPostImg.current.files![0];

    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const result = reader.result;
        setHtmlImageReader(result as string);

        refToPostImg.current.value = "";
      };
    }
  };

  return (
    <label className={cl.postImgContent}>
      {htmlImageReader ? (
        <img src={htmlImageReader} alt="" className={cl.userImage}></img>
      ) : (
        <div className={cl.postImgSample}>
          <MdAddPhotoAlternate size={70} />
          <div className={cl.postImgSampleText}>Choose photo</div>
        </div>
      )}

      <input ref={refToPostImg} onChange={uploadToHTML} type="file" accept="image/*" />
    </label>
  );
};
