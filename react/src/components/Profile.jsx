import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const url = new URL("http://localhost:4000/profile/");

function Profile({ userData, setUserData }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const profile_url = url + id;
  const reports_url = profile_url + "/direct_reports";
  const [profile, setProfile] = useState([]);
  const [reports, setReports] = useState([]);

  const getProfile = function async() {
    fetch(profile_url)
      .then(async (response) => await response.json())
      .then((data) => {
        setProfile(data);
      });
  };

  const getReports = function async() {
    fetch(reports_url)
      .then(async (response) => await response.json())
      .then((data) => {
        setReports(data);
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
    if (+id === userData.id) {
      setProfile(userData);
      console.log("get from user");
    } else {
      getProfile();
      console.log("get from db");
    }
  }, []);

  if (profile.direct_reports !== undefined) {
    getReports();
  }
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
      Direct Reports
      {profile.direct_reports !== undefined && (
        <ul>
          {reports.map((employee) => {
            return (
              <li key={employee.id}>
                <div>{employee.name}</div>
              </li>
            );
          })}
        </ul>
      )}
      {userData.id === profile.id && <button onClick={logOut}>Logout</button>}
    </div>
  );
}
export default Profile;
