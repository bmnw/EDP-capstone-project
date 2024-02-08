import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const url = new URL("http://localhost:4000/profile/");

function Profile({ userData }) {
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
      Info
      <ul>
        <li>Name: {profile.name}</li>
        <li>Phone Number: {profile.phone_number}</li>
        <li>Role: {profile.role}</li>
        <li>Location: {profile.location}</li>
        <li>Salary {profile.salary}</li>
      </ul>
    </div>
  );
}
export default Profile;
