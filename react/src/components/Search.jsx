import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const url = new URL("http://localhost:4000/search");

function Search() {
  const [employees, setEmployees] = useState([]);
  const getEmployees = function async() {
    fetch(url)
      .then(async (response) => await response.json())
      .then((data) => {
        setEmployees(data);
      });
  };
  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="page">
      {employees.map((employee) => {
        return (
          <Link key={employee.id} to={`/profile/${employee.id}`}>
            <div> {employee.name}</div>
          </Link>
        );
      })}
    </div>
  );
}
export default Search;
