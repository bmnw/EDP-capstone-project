import { useState } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Search from "./components/Search";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Prediction from "./components/Prediction";

function App() {
  const [userData, setUserData] = useState({});
  return (
    <div>
      <h1>Searchable Enterprise Directory</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/search" element={<Search userData={userData} />} />
          <Route
            path="/profile/:id"
            element={<Profile userData={userData} setUserData={setUserData} />}
          />
          <Route
            path="/login"
            element={<Login userData={userData} setUserData={setUserData} />}
          />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
