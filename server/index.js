const express = require("express");
const app = express();
const PORT = 4000;
const mongo_dao = require("./mongo_dao");
const cors = require("cors");
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});

app.get("/employees/:name", (req, res) => {
  mongo_dao.findEmployeeByName(req.params.name, (employee) => {
    if (!employee) {
      res.status(404).end();
    } else {
      res.send(employee);
    }
  });
});

app.get("/login/:username", (req, res) => {
  mongo_dao.findEmployeeByUsername(req.params.username, (employee) => {
    if (!employee) {
      res.status(404).end();
    } else {
      res.send(employee);
    }
  });
});
