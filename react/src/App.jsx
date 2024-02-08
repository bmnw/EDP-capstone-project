import { useState } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Search from "./components/Search";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  return (
    <div>
      <h1>Searchable Enterprise Directory</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
