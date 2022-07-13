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
    <nav>
      <div className={cl.menu}>
        <Link to={"/usersblogs"}>
          <p>Users blogs</p>
        </Link>
        {user ? (
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
        ) : null}
      </div>
    </nav>
  );
};
