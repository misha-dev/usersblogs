import { addDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { colPostsRef, storage } from "../../firebase/config";
import PostInterface from "../../interfaces/PostInterface";
import { useAppSelector } from "../../store/hooks";
import { CustomTextArea } from "../CustomTextArea/CustomTextArea";
import { Post } from "../Post/Post";
import cl from "./AddPost.module.scss";
import { PostImage } from "./PostImage/PostImage";

export const AddPost = () => {
  const [imageFile, setImageFile] = useState<File>(null!);
  const [htmlImageReader, setHtmlImageReader] = useState<string>(null!);
  const [postText, setPostText] = useState("");
  const [postButtonText, setPostButtonText] = useState("POST");
  const user = useAppSelector((state) => state.user.user);
  const refAddPostWrapper = useRef<HTMLDivElement>(null!);
  const photoURL = useRef<string>(null!);
  const postButtonRef = useRef<HTMLButtonElement>(null!);
  const navigate = useNavigate();

  const uploadPostImgToStorage = async () => {
    const storageImgRef = ref(storage, `/PostsImgs/${v4()}`);
    const response = await uploadBytes(storageImgRef, imageFile);
    const imgUrl = await getDownloadURL(response.ref);
    photoURL.current = imgUrl;
  };

  const createPost = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    postButtonRef.current.classList.add("disabled");
    setPostButtonText("Posting");
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

              <CustomTextArea text={postText} setText={setPostText} />
              <div className={cl.buttonAddPostWrapper}>
                <button
                  className={`${cl.buttonAddPost} ${htmlImageReader ? "" : "disabled"}`}
                  onClick={() => {
                    refAddPostWrapper.current.classList.add(cl.previewSlide);
                  }}
                >
                  Preview
                </button>
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
              <button ref={postButtonRef} onClick={createPost} className={cl.buttonAddPost}>
                {postButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
