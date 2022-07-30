import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase/config";
import { useAppDispatch } from "../../../store/hooks";
import { logOut } from "../../../store/userSlice";
import cl from "./Menu.module.scss";

export const Menu = () => {
  const [user] = useAuthState(auth);

  const dispatch = useAppDispatch();
  return (
    <nav style={{ height: "73.59px" }}>
      <div style={{ width: "100%" }} className={cl.menu}>
        <Link to={"/usersblogs"}>
          <p>Users blogs</p>
        </Link>
        {user ? (
          <div className={cl.wrapperActions}>
            <Link to={"/usersblogs/addpost"} onClick={() => {}} className={cl.addPost}>
              ADD POST
            </Link>
            <button
              onClick={() => {
                signOut(auth).then(() => {
                  dispatch(logOut());
                });
              }}
              className={cl.logout}
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </nav>
  );
};
