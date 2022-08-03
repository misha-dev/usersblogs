import { signOut } from "firebase/auth";
import { useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase/config";
import { useAppDispatch } from "../../../store/hooks";
import { logOut } from "../../../store/userSlice";
import cl from "./Menu.module.scss";

export const Menu = () => {
  const [user] = useAuthState(auth);
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
    <nav style={{ height: "73.59px", marginBottom: "20px" }}>
      <div ref={menuRef} style={{ width: "100%" }} className={cl.menu}>
        <Link to={"/usersblogs"}>
          <p>Users blogs</p>
        </Link>
        {user ? (
          <div className={cl.wrapperActions}>
            <Link to={"/usersblogs/addpost"} className={cl.addPost}>
              ADD POST
            </Link>

            <div className={cl.user}>
              <img
                src={user.photoURL!}
                onClick={() => {
                  const logoutClassList = logoutButtonRef.current.classList;
                  logoutClassList.contains(cl.hideLogoutButton) ? logoutClassList.remove(cl.hideLogoutButton) : logoutClassList.add(cl.hideLogoutButton);
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
                className={`${cl.logout} ${cl.hideLogoutButton}`}
              >
                Logout
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
};
