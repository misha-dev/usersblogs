import { Link } from "react-router-dom";

import cl from "./Authentication.module.scss";

export const Authentication = () => {
  return (
    <div className={cl.authContent}>
      <div className={cl.auth_register_login_wrapper}>
        <Link to={"/usersblogs/login"} className={cl.auth_login}>
          Login
        </Link>
        <Link to={"/usersblogs/register"} className={cl.auth_register}>
          Register
        </Link>
      </div>
    </div>
  );
};
