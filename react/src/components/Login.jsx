import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const url = new URL("http://localhost:4000/login/");

function Login({ userData, setUserData }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getUser = function async(username) {
    fetch(url + username)
      .then(async (response) => await response.json())
      .then(async (data) => {
        if (password === data.password) {
          setUserData(data);
          navigate("/search");
        } else {
          alert("Invalid login credentials. Please try again.");
        }
      });
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <Typography variant='h6'>Username</Typography>
      </Grid>
      <Grid item>
        <TextField
          label="Enter username"
          variant="filled"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Typography variant='h6'>Password</Typography>
      </Grid>
      <Grid item>
        <TextField
          label="Enter password"
          variant="filled"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={() => getUser(username)}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
}
export default Login;
