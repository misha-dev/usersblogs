import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { v4 } from "uuid";
import { auth, colUsersRef, storage } from "../../firebase/config";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/userSlice";
import { EmailPassName } from "./EmailPassName/EmailPassName";
import cl from "./Register.module.scss";
import { UserImageLoader } from "./UserImageLoader/UserImageLoader";

export const Register = () => {
  const registerWrapper = useRef<HTMLDivElement | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [imageFile, setImageFile] = useState<File>(null!);
  const photoURL = useRef("");
  const dispatch = useAppDispatch();

  const uploadUserImgToStorage = async () => {
    const storageImgRef = ref(storage, `/userProfileImgs/${v4()}`);
    const response = await uploadBytes(storageImgRef, imageFile);
    const imgUrl = await getDownloadURL(response.ref);
    photoURL.current = imgUrl;
  };

  const registerUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await uploadUserImgToStorage();

      await updateProfile(auth.currentUser!, {
        displayName,
        photoURL: photoURL.current,
      });
      const uid = auth.currentUser!.uid;

      await addDoc(colUsersRef, { uid, displayName, photoURL: photoURL.current });

      dispatch(setUser({ uid, displayName, email, photoURL: photoURL.current }));
    } catch (error) {
      alert("Enter valid data!");
    }
  };

  return (
    <div className={cl.registerContentWrapper}>
      <div className={cl.registerContent}>
        <div ref={registerWrapper} className={cl.registerWrapper}>
          <div className={cl.registrationBox}>
            <EmailPassName
              refToWrapper={registerWrapper}
              email={email}
              password={password}
              displayName={displayName}
              setEmail={setEmail}
              setPassword={setPassword}
              setDisplayName={setDisplayName}
              moveWrapper={cl.registerWrapperMoveForward}
            />
          </div>
          <div className={cl.registrationBox}>
            <UserImageLoader refToWrapper={registerWrapper} moveWrapper={cl.registerWrapperMoveForward} imageFile={imageFile} setImageFile={setImageFile} register={registerUser} />
          </div>
        </div>
      </div>
    </div>
  );
};
