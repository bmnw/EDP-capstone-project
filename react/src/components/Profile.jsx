import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

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
    <Box>
      <Grid container direction="row" alignItems="left" justifyContent="left">
        <Button onClick={backToSearch} variant="contained" color="primary">
          Back
        </Button>
      </Grid>

      <Typography sx={{marginTop: 3}} variant='h6'>Employee Information</Typography>

      

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
    </Box>
  );
}
export default Profile;
