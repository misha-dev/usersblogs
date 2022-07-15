import { useState } from "react";
import cl from "./AddPost.module.scss";
import { PostImage } from "./PostImage/PostImage";

export const AddPost = () => {
  const [imageFile, setImageFile] = useState<File>(null!);
  const [htmlImageReader, setHtmlImageReader] = useState<string>(null!);
  return (
    <div className={cl.addPostContentWrapper}>
      <div className={cl.addPostWrapper}>
        <div className={cl.addPostBox}>
          <PostImage htmlImageReader={htmlImageReader} setHtmlImageReader={setHtmlImageReader} imageFile={imageFile} setImageFile={setImageFile} />
        </div>
      </div>
    </div>
  );
};
