import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

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
      <Typography sx={{ marginTop: 3 }} variant="h6">
        Employee Information
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography>Name: {profile.name}</Typography>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LocalPhoneIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography>Phone Number: {profile.phone_number}</Typography>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography>Job Role: {profile.role}</Typography>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography>Office Location: {profile.location}</Typography>
          </ListItemText>
        </ListItem>
      </List>

      {reports.length > 0 && (
        <>
          <Typography variant="h6">Direct Reports</Typography>
          <List>
            {reports.map((employee) => {
              return (
                <ListItem key={employee.id}>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography>{employee.name}</Typography>
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        </>
      )}

      {userData.id === profile.id && (
        <Grid container direction="row" alignItems="left" justifyContent="left">
          <Button onClick={logOut} variant="contained" color="secondary">
            Logout
          </Button>
        </Grid>
      )}
    </Box>
  );
}
export default Profile;
