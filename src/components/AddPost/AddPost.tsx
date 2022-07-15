import { useState } from "react";
import cl from "./AddPost.module.scss";
import { PostImage } from "./PostImage/PostImage";

export const AddPost = () => {
  const [imageFile, setImageFile] = useState<File>(null!);
  const [htmlImageReader, setHtmlImageReader] = useState<string>(null!);
  const [postText, setPostText] = useState("");
  return (
    <div className={cl.addPostContentWrapper}>
      <div className={cl.addPostWrapper}>
        <div className={cl.addPostBox}>
          <PostImage htmlImageReader={htmlImageReader} setHtmlImageReader={setHtmlImageReader} imageFile={imageFile} setImageFile={setImageFile} />
          <textarea
            autoComplete="off"
            autoCorrect="off"
            value={postText}
            onChange={(e) => {
              setPostText(e.currentTarget.value);
            }}
            className={cl.postText}
            placeholder="Enter a text"
          ></textarea>
          <div className={cl.previewWrapper}>
            <div className={cl.preview}>Preview</div>
          </div>
        </div>
      </div>
    </div>
  );
};
