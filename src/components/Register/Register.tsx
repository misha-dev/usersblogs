import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { v4 } from "uuid";

import { auth, colUsersRef, storage } from "../../firebase/config";
import { useFormInput } from "../../hooks/useFormInput";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/userSlice";

import { EmailPassName } from "./EmailPassName/EmailPassName";
import cl from "./Register.module.scss";
import { UserImageLoader } from "./UserImageLoader/UserImageLoader";

export const Register = () => {
  const registerWrapper = useRef<HTMLDivElement | null>(null);
  const email = useFormInput("", { minLength: 5 }, "text");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [imageFile, setImageFile] = useState<File>(null!);
  const photoURL = useRef("");
  const dispatch = useAppDispatch();

  interface User {
    uid: string;
    displayName: string;
    photoURL: string;
  }

  const uploadUserImgToStorage = async () => {
    const storageImgRef = ref(storage, `/userProfileImgs/${v4()}`);
    const response = await uploadBytes(storageImgRef, imageFile);
    const imgUrl = await getDownloadURL(response.ref);
    photoURL.current = imgUrl;
  };

  const registerUser = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email.value, password);
      await uploadUserImgToStorage();

      await updateProfile(auth.currentUser!, {
        displayName,
        photoURL: photoURL.current,
      });
      const uid = userCred.user.uid;

      await addDoc(colUsersRef, { uid, email, displayName, photoURL: photoURL.current } as User);

      dispatch(setUser({ uid, displayName, email: email.value, photoURL: photoURL.current }));
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
              email={email.value}
              onEmailChange={email.onChange}
              onBlurEmail={email.onBlur}
              password={password}
              displayName={displayName}
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
