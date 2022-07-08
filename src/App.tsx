import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Authentication } from "./components/Authentication/Authentication";
import { Layout } from "./components/Layout/Layout";
import { Register } from "./components/Register/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="usersblogs" element={<Layout />}>
          <Route index element={<Authentication />} />
          <Route path="login" element={<Authentication />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
