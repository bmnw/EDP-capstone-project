const express = require("express");
const app = express();
const PORT = 4000;
const mongo_dao = require("./mongo_dao");
const cors = require("cors");
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});

app.get("/search/:name", (req, res) => {
  mongo_dao.findEmployeeByName(req.params.name, (employee) => {
    if (!employee) {
      res.status(404).end();
    } else {
      res.send(employee);
    }
  });
});

app.get("/profile/:id", (req, res) => {
  mongo_dao.findEmployeeById(req.params.id, (employee) => {
    if (!employee) {
      res.status(404).end();
    } else {
      res.send(employee);
    }
  });
});

app.get("/profile/:id/direct_reports", (req, res) => {
  mongo_dao.findEmployeeById(req.params.id, (employee) => {
    if (!employee) {
      res.status(404).end();
    } else {
      direct_reports_ids = JSON.parse(employee.direct_reports);
      mongo_dao.findEmployeesByIds(direct_reports_ids, (employees) => {
        if (!employees) {
          res.status(404).end();
        } else {
          res.send(employees);
        }
      });
    }
  });
});

app.get("/search", (req, res) => {
  mongo_dao.findFirst15Employee((employee) => {
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
