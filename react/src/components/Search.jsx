import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";

const url = new URL("http://localhost:4000/search");

function Search({ userData }) {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const getEmployees = function async(searchInput = "") {
    fetch(url + searchInput)
      .then(async (response) => await response.json())
      .then((data) => {
        setEmployees(data);
      });
  };

  const navigateToProfile = (userId) => {
    navigate("/profile/" + userId);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <Box>
      <Grid container direction="row" alignItems="right" justifyContent="right">
        <Button
          onClick={() => navigateToProfile(userData.id)}
          variant="contained"
          color="secondary"
        >
          My Profile
        </Button>
      </Grid>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="left"
        justifyContent="left"
      >
        <Grid item>
          <TextField
            label="Search staff directory"
            variant="filled"
            value={searchInput}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => getEmployees("/" + searchInput)}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Typography sx={{ marginTop: 5 }} variant="h6">
        Search Results
      </Typography>
      <List>
        {employees.map((employee) => {
          return (
            <>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon/>
                </ListItemIcon>
                <ListItemText>
                  <Link key={employee.id} to={`/profile/${employee.id}`}>
                    <Typography> {employee.name}</Typography>
                  </Link>
                </ListItemText>
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>
    </Box>
  );
}
export default Search;
