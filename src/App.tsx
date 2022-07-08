import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Authentication } from "./components/Authentication/Authentication";
import { Layout } from "./components/Layout/Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="usersblogs" element={<Layout />}>
          <Route index element={<Authentication />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
