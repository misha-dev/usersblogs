import { addDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { colPostsRef, storage } from "../../firebase/config";
import PostInterface from "../../interfaces/PostInterface";
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
  const photoURL = useRef<string>(null!);
  const navigate = useNavigate();

  const uploadPostImgToStorage = async () => {
    const storageImgRef = ref(storage, `/PostsImgs/${v4()}`);
    const response = await uploadBytes(storageImgRef, imageFile);
    const imgUrl = await getDownloadURL(response.ref);
    photoURL.current = imgUrl;
  };

  const createPost = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setTimeout(() => {
      navigate("/usersblogs", { replace: true });
    }, 1000);
    await uploadPostImgToStorage();
    await addDoc(colPostsRef, {
      uid: user.uid,
      userName: user.displayName,
      userPhotoURL: user.photoURL,
      postPhotoURL: photoURL.current,
      createdAt: Timestamp.now(),
      text: postText,
      likes: new Array<string>(),
    } as PostInterface);
  };
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
              id={"sample"}
              postPhotoURL={htmlImageReader}
              userPhotoURL={user.photoURL}
              createdAt={Timestamp.now()}
              userName={user.displayName}
              isPreview={true}
              likes={new Array<string>()}
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
              <button onClick={createPost} className={cl.buttonAddPost}>
                POST
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
