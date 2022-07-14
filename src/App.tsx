import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Authentication } from "./components/Authentication/Authentication";
import { Blogs } from "./components/Blogs/Blogs";
import { Layout } from "./components/Layout/Layout";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { auth } from "./firebase/config";
import { useAppDispatch } from "./store/hooks";
import { setUser } from "./store/userSlice";

function App() {
  const dispatch = useAppDispatch();
  const [checkLogged, setCheckLogged] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        if (displayName && email && photoURL) {
          dispatch(setUser({ uid, displayName, email, photoURL }));
        }
      }
      setCheckLogged(true);
      unsub();
    });
  }, []);
  return (
    <div className="App">
      {checkLogged ? (
        <Routes>
          <Route path="usersblogs" element={<Layout />}>
            <Route index element={user ? <Blogs /> : <Authentication />} />
            {user ? null : (
              <>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </>
            )}
            <Route path="*" element={<Navigate to={"/usersblogs"} replace />} />
          </Route>
        </Routes>
      ) : null}
    </div>
  );
}

export default App;
