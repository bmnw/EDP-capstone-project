import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
const url = new URL("http://localhost:4000/prediction");

function Prediction() {
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState([]);
  const [input1, setInput1] = useState("Hartford");
  const [input2, setInput2] = useState("employee");
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input1: input1, input2: input2 }),
  };
  const getPrediction = function async() {
    fetch(url, requestOptions)
      .then(async (response) => await response.json())
      .then((data) => {
        setPrediction(data);
      });
  };
  const backToSearch = () => {
    navigate("/search");
  };

  useEffect(() => {
    getPrediction();
  }, []);
  const handleDropdownChangeLocation = (event) => {
    setInput1(event.target.value);
    getPrediction();
  };
  const handleDropdownChangeRole = (event) => {
    setInput2(event.target.value);
    getPrediction();
  };
  return (
    <div className="page">
      <Grid container direction="row" alignItems="right" justifyContent="right">
        <Button onClick={backToSearch} variant="contained" color="secondary">
          Back
        </Button>
      </Grid>
      <div>
        <label htmlFor="cities">Select a city:</label>
        <select id="cities" onChange={handleDropdownChangeLocation}>
          <option value="Hartford">Hartford</option>
          <option value="St. Paul">St. Paul</option>
        </select>
      </div>
      <div>
        <label htmlFor="cities">Select a role:</label>
        <select id="roles" onChange={handleDropdownChangeRole}>
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="hr">HR</option>
        </select>
      </div>
      <div>estimated salary: {prediction}</div>
    </div>
  );
}
export default Prediction;
