import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { Post } from "../Post/Post";
import cl from "./AddPost.module.scss";
import { PostImage } from "./PostImage/PostImage";

export const AddPost = () => {
  const [imageFile, setImageFile] = useState<File>(null!);
  const [htmlImageReader, setHtmlImageReader] = useState<string>(null!);
  const [postText, setPostText] = useState("");
  const user = useAppSelector((state) => state.user.user);
  return (
    <div className={cl.addPostMainWrapper}>
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
          <div className={`${cl.addPostBox} ${cl.addPostBoxPreview}`}>
            <Post
              uid={user.uid}
              id="1"
              PostImageURL={htmlImageReader}
              UserPhotoURL={user.photoURL}
              createdAt={"15/02/2022"}
              displayName={user.displayName}
              isPreview={true}
              likes={[]}
              text={postText}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
