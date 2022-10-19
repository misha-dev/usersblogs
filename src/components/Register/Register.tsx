import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { v4 } from "uuid";

import { auth, colUsersRef, storage } from "../../firebase/config";
import { useFormInput } from "../../hooks/useFormInput";
import { UserBaseType } from "../../interfaces/UserInterface";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/userSlice";

import { EmailPassName } from "./EmailPassName/EmailPassName";
import cl from "./Register.module.scss";
import { UserImageLoader } from "./UserImageLoader/UserImageLoader";

export const Register = () => {
  const registerWrapper = useRef<HTMLDivElement | null>(null);
  const email = useFormInput("", { email: true }, "text");
  const password = useFormInput("", { minLength: 5 }, "password");
  const displayName = useFormInput("", { minLength: 5 }, "text");

  const [imageFile, setImageFile] = useState<File>(null!);
  const photoURL = useRef("");
  const dispatch = useAppDispatch();

  const validUserData = !(Boolean(email.valid.error) || Boolean(password.valid.error) || Boolean(displayName.valid.error));

  const uploadUserImgToStorage = async () => {
    const storageImgRef = ref(storage, `/userProfileImgs/${v4()}`);
    const response = await uploadBytes(storageImgRef, imageFile);
    const imgUrl = await getDownloadURL(response.ref);
    photoURL.current = imgUrl;
  };

  const registerUser = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email.value, password.value);
      await uploadUserImgToStorage();

      await updateProfile(auth.currentUser!, {
        displayName: displayName.value,
        photoURL: photoURL.current,
      });
      const uid = userCred.user.uid;

      await addDoc(colUsersRef, { uid, email: email.value, displayName: displayName.value, photoURL: photoURL.current } as UserBaseType);

      dispatch(setUser({ uid, displayName: displayName.value, email: email.value, photoURL: photoURL.current }));
    } catch (error) {
      alert("Enter valid data!");
    }
  };

  return (
    <div className={cl.registerContentWrapper}>
      <div className={cl.registerContent}>
        <div ref={registerWrapper} className={cl.registerWrapper}>
          <div className={cl.registrationBox}>
            <EmailPassName validUserData={validUserData} refToWrapper={registerWrapper} email={email} password={password} displayName={displayName} moveWrapper={cl.registerWrapperMoveForward} />
          </div>
          <div className={cl.registrationBox}>
            <UserImageLoader validUserData={validUserData} refToWrapper={registerWrapper} moveWrapper={cl.registerWrapperMoveForward} setImageFile={setImageFile} register={registerUser} />
          </div>
        </div>
      </div>
    </div>
  );
};
