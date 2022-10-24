import { signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
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
  const [logoutButtonShow, setLogoutButtonShow] = useState(false);

  useEffect(() => {
    const onScrollColorMenu = (e: Event) => {
      const scrolled = window.scrollY;
      if (scrolled !== 0) {
        menuRef.current.classList.add(cl.coloredMenu);
      } else {
        menuRef.current.classList.remove(cl.coloredMenu);
      }
    };

    const hideLogoutButton = (e: MouseEvent) => {
      setLogoutButtonShow(false);
    };
    window.addEventListener("scroll", onScrollColorMenu);
    window.addEventListener("click", hideLogoutButton);
    return () => {
      window.removeEventListener("scroll", onScrollColorMenu);
      window.removeEventListener("click", hideLogoutButton);
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setLogoutButtonShow(!logoutButtonShow);
                  }}
                  alt=""
                />
                <button
                  onClick={(e) => {
                    signOut(auth).then(() => {
                      dispatch(logOut());
                    });
                  }}
                  className={`${cl.logout} ${logoutButtonShow ? "" : "hide"}`}
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
