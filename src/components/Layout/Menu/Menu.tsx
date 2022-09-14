import { signOut } from "firebase/auth";
import { useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase/config";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { logOut } from "../../../store/userSlice";
import cl from "./Menu.module.scss";

export const Menu = () => {
  const [user] = useAuthState(auth);
  // for updating photoURL cause after register we update user with photoURL, but that change doesn't rerender the component, so we should use here Redux Toolkit
  const photoURL = useAppSelector((state) => state.user.photoURL);

  const menuRef = useRef<HTMLDivElement>(null!);
  const logoutButtonRef = useRef<HTMLButtonElement>(null!);

  const onScrollColorMenu = (e: Event) => {
    const scrolled = window.scrollY;
    if (scrolled !== 0) {
      menuRef.current.classList.add(cl.coloredMenu);
    } else {
      menuRef.current.classList.remove(cl.coloredMenu);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScrollColorMenu);
    return () => {
      window.removeEventListener("scroll", onScrollColorMenu);
    };
  }, []);

  const dispatch = useAppDispatch();
  return (
    <nav className={cl.navStyling}>
      <div ref={menuRef} style={{ width: "100%" }} className={cl.menu}>
        <Link to={"/usersblogs"}>
          <p>Users blogs</p>
        </Link>
        <div className={cl.wrapperActions}>
          {user ? (
            <>
              <Link to={"/usersblogs/addpost"} className={cl.actionsButton}>
                ADD POST
              </Link>

              <div className={cl.user}>
                <img
                  src={photoURL}
                  onClick={() => {
                    const logoutClassList = logoutButtonRef.current.classList;
                    logoutClassList.contains("hide") ? logoutClassList.remove("hide") : logoutClassList.add("hide");
                  }}
                  alt=""
                />
                <button
                  ref={logoutButtonRef}
                  onClick={() => {
                    signOut(auth).then(() => {
                      dispatch(logOut());
                    });
                  }}
                  className={`${cl.logout} hide`}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to={"/usersblogs/authentication"}>
              <div className={cl.actionsButton}>Register/Login</div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
