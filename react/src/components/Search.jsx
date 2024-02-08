import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const url = new URL("http://localhost:4000/search");

function Search({userData}) {
  const [employees, setEmployees] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const getEmployees = function async(searchInput = '') {
    fetch(url + searchInput)
      .then(async (response) => await response.json())
      .then((data) => {
        setEmployees(data);
      });
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="page">
      <input
        type="text"
        placeholder="Enter employee name"
        onChange={handleInputChange}
        value={searchInput}
      />
      <button onClick={() => getEmployees('/' + searchInput)}>Search Directory</button>
      
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
