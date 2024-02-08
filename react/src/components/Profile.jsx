import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const url = new URL("http://localhost:4000/profile/");

function Profile({ userData, setUserData }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const profile_url = url + id;
  const [profile, setProfile] = useState([]);

  const getProfile = function async() {
    fetch(profile_url)
      .then(async (response) => await response.json())
      .then((data) => {
        setProfile(data);
      });
  };

  const backToSearch = () => {
    navigate("/search");
  };

  const logOut = () => {
    // clears userData
    setUserData({});
    navigate("/login");
  };

  useEffect(() => {
    if (id === userData.id) {
      console.log("using the userData");
      setProfile(userData);
    } else {
      console.log("fetching from db");
      getProfile();
    }
  }, []);

  return (
    <div className="page">
      <button onClick={backToSearch}>Back to Search</button>
      Info
      <ul>
        <li>Name: {profile.name}</li>
        <li>Phone Number: {profile.phone_number}</li>
        <li>Role: {profile.role}</li>
        <li>Location: {profile.location}</li>
        {userData.role === "hr" ||
        (userData.role === "manager" &&
          userData.direct_reports.includes(profile.id)) ||
        userData.id === profile.id ? (
          <li>Salary {profile.salary}</li>
        ) : (
          <></>
        )}
      </ul>
      {userData.id === profile.id && <button onClick={logOut}>Logout</button>}
    </div>
  );
}
export default Profile;
