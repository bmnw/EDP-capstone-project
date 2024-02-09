import { useState } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Search from "./components/Search";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function App() {
  const [userData, setUserData] = useState({});
  return (
    <Container>
      <Typography variant='h4'>Searchable Enterprise Directory</Typography>
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
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
