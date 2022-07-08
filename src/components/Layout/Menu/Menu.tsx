import { Link } from "react-router-dom";
import cl from "./Menu.module.scss";

export const Menu = () => {
  return (
    <nav>
      <div className={cl.menu}>
        <Link to={"/usersblogs"}>
          <p>Users blogs</p>
        </Link>
        <button className={cl.logout}>Logout</button>
      </div>
    </nav>
  );
};
