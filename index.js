const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection({
  port: 3306,
  user: "root",
  password: "gg666",
  database: "empires_db",
});

function initialPrompt() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all troopers",
          "Add a new department",
          "Add a new role",
          "Add a new trooper",
          "Update trooper roles",
          "Exit",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all troopers":
          viewTroopers();
          break;
        case "Add a new department":
          addDepartment();
          break;
        case "Add a new role":
          addRole();
          break;
        case "Add a new trooper":
          addTrooper();
          break;
        case "Update stormtrooper roles":
          updateTrooper();
          break;
        case "exit":
          connection.end();
          break;
      }
    });
}

const viewDepartments = () => {
  db.query("select * from department", (err, res) => {
    if (err) throw err;
    console.table(res);
    initialPrompt();
  });
};
const viewRoles = () => {
  db.query("select * from role", (err, res) => {
    if (err) throw err;
    console.table(res);
    initialPrompt();
  });
};
const viewTroopers = () => {
  db.query("select * from stormtrooper", (err, res) => {
    if (err) throw err;
    console.table(res);
    initialPrompt();
  });
};
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "name of your department?",
      },
    ])
    .then((data) => {
      db.query("insert into department set ?", {
        name: data.newDepartment,
      });
      console.log("department added");
      initialPrompt();
    });
};
const addRole = () => {
  db.query("select * from department", (err, res) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "newTitle",
          message: "What is the role of the new Trooper?",
        },
        {
          type: "input",
          name: "newSalary",
          message: "What is the salary for the new Trooper?",
        },
        {
          type: "list",
          name: "departmentId",
          message: "What is the departmentid for new Trooper?",
          choices: res.map((department) => department.id),
        },
      ])
      .then((data) => {
        db.query("insert into role set ?", {
          title: data.newTitle,
          salary: data.newSalary,
          department_id: data.departmentId,
        });
        console.log("new role added.");
        initialPrompt();
      });
  });
};

initialPrompt();
