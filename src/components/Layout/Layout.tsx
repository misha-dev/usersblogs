import { Outlet } from "react-router-dom";
import { SelectPosts } from "../SelectPosts/SelectPosts";
import cl from "./Layout.module.scss";
import { Menu } from "./Menu/Menu";

export const Layout = () => {
  return (
    <>
      <Menu />
      <div className={cl.mainContent}>
        <SelectPosts />
        <Outlet />
      </div>
    </>
  );
};
