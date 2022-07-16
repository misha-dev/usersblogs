import { useRef, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { Post } from "../Post/Post";
import cl from "./AddPost.module.scss";
import { PostImage } from "./PostImage/PostImage";

export const AddPost = () => {
  const [imageFile, setImageFile] = useState<File>(null!);
  const [htmlImageReader, setHtmlImageReader] = useState<string>(null!);
  const [postText, setPostText] = useState("");
  const user = useAppSelector((state) => state.user.user);
  const refAddPostWrapper = useRef<HTMLDivElement>(null!);
  const refTextArea = useRef<HTMLTextAreaElement>(null!);
  return (
    <div className={cl.addPostMainWrapper}>
      <div className={cl.addPostContentWrapper}>
        <div ref={refAddPostWrapper} className={cl.addPostWrapper}>
          <div className={cl.addPostBox}>
            <div className={cl.addPostForm}>
              <PostImage htmlImageReader={htmlImageReader} setHtmlImageReader={setHtmlImageReader} imageFile={imageFile} setImageFile={setImageFile} />
              <textarea
                ref={refTextArea}
                onKeyUp={(e) => {
                  refTextArea.current.style.height = "auto";
                  // +2 to include borders of textArea
                  const scHeight = e.currentTarget.scrollHeight + 2;
                  refTextArea.current.style.height = `${scHeight}px`;
                }}
                autoComplete="off"
                autoCorrect="off"
                value={postText}
                onChange={(e) => {
                  setPostText(e.currentTarget.value);
                }}
                className={cl.postText}
                placeholder="Enter a text"
              ></textarea>
              <div className={cl.buttonAddPostWrapper}>
                <div
                  className={`${cl.buttonAddPost} ${htmlImageReader && postText ? "" : cl.buttonAddPostDisabled}`}
                  onClick={() => {
                    refAddPostWrapper.current.classList.add(cl.previewSlide);
                  }}
                >
                  Preview
                </div>
              </div>
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
            <div className={cl.buttonPreviewWrapper}>
              <div
                onClick={() => {
                  refAddPostWrapper.current.classList.remove(cl.previewSlide);
                }}
                className={cl.buttonAddPost}
              >
                Back
              </div>
              <div className={cl.buttonAddPost}>POST</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
