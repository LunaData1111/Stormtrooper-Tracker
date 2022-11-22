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
          "Update stormtrooper roles",
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

// showing all Departments.
const viewDepartments = () => {
  db.query("select * from department", (err, res) => {
    if (err) throw err;
    console.table(res);
    initialPrompt();
  });
};

// the roles of the troopers.
const viewRoles = () => {
  db.query("select * from role", (err, res) => {
    if (err) throw err;
    console.table(res);
    initialPrompt();
  });
};

// view the list of troopers.
const viewTroopers = () => {
  db.query("select * from stormtrooper", (err, res) => {
    if (err) throw err;
    console.table(res);
    initialPrompt();
  });
};

// add a new department.
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

// adding a new role.
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

// addd a new trooper.
const addTrooper = () => {
  db.query("select * from stormtrooper", (err, res) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the Stormtrooper's first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the Stormtrooper's last name?",
        },
        {
          type: "list",
          name: "roles",
          message: "What is their role id?",
          choices: res.map((stormtrooper) => stormtrooper.role_id),
        },
        {
          type: "list",
          name: "manager",
          message: "What is their Captin last name?",
          choices: [1, 2],
        },
      ])
      .then((data) => {
        db.query(
          "INSERT into stormtrooper SET ?",
          {
            first_name: data.firstName,
            last_name: data.lastName,
            role_id: data.roles,
            manager_id: data.manager,
          },
          (err) => {
            if (err) throw err;
            console.log("new trooper added");
            initialPrompt();
          }
        );
      });
  });
};

// update the stormtrooper.
const updateTrooper = () => {
  db.query("select * from stormtrooper", (err, res) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "stormtrooper",
          message: "Which stormtrooper would you like to update?",
          choices: res.map((stormtrooper) => stormtrooper.first_name),
        },
        {
          type: "list",
          name: "roleId",
          message: "What is their new role?",
          choices: res.map((stormtrooper) => stormtrooper.role_id),
        },
      ])

      .then((data) => {
        db.query("UPDATE stormtrooper SET role_id = ? where first_name = ?", [
          data.roleId,
          data.stormtrooper,
        ]);
        initialPrompt();
      });
  });
};

// const exit = () => {
//   process.exit();
// };

initialPrompt();
