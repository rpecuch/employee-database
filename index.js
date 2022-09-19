const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'business_db'
    }
);

//can't just push to arrays need to update tables as well
const departments = ["Sales", "Engineering", "Finance", "Legal"];
const roles = ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"];
const employees = ['John Doe', 'Mike Smith', 'Ashley Brown','Jane Doe', 'Kevin Kramer', 'Maria Johnson', 'Sarah Smith', 'Tom Allen'];
const managers = ['None','John Doe', 'Ashley Brown', 'Kevin Kramer', 'Sarah Smith'];

//ids in tables are not correct

function init() {
    inquirer
    .prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name:'selection',
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
        }
    )
    .then((answer) => {
        switch(answer.selection) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmpRole();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "View All Departments":
                viewAllDpts();
                break;
            case "Add Department":
                addDepartment();
                break;
        }
    })
    .catch((err) => console.error(err));
}

function addDepartment() {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'dptName'
        }
    ])
    .then((answer) => {
        departments.push(answer.dptName);
        db.query('INSERT INTO department (department) VALUES (?)', answer.dptName, function(err, results){
            if(err) {
                console.log(err)
            }
            else{
                console.log(results);
            }
        });
        console.log(`${answer.dptName} department added to database`);
    })
    .catch((err) => console.error(err));
}

function addRole() {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'roleName'
        },
        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'salary'
        },
        {
            type: 'list',
            message: 'Which department does the role belong to?',
            name: 'roleDpt',
            choices: departments
        }
    ])
    .then((answer) => {
        let dptId;
        //need this to incorporate new dpts
        switch(answer.roleDpt) {
            case "Sales":
                dptId = 1;
                break;
            case "Engineering":
                dptId = 2;
                break;
            case "Finance":
                dptId = 3;
                break;
            case "Legal":
                dptId = 4;
                break;
        }
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answer.roleName, answer.salary, dptId], function(err, results){
            if(err) {
                console.log(err)
            }
            else{
                console.log(results);
            }
        });
        roles.push(answer.roleName);
        console.log(`${answer.roleName} role added to database`);
    })
    .catch((err) => console.error(err));
}

//need to use manager data
function addEmployee() {
    inquirer
    .prompt([
        {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'firstName'
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'lastName'
        },
        {
            type: 'list',
            message: "What is the employee's role?",
            name: 'empRole',
            choices: roles
        },
        {
            type: 'list',
            message: "Who is the employee's manager?",
            name: 'empManager',
            choices: managers
        }
    ])
    .then((answer) => {
        let roleId;
        switch(answer.empRole) {
            case "Sales Lead":
                roleId = 1;
                break;
            case "Salesperson":
                roleId = 2;
                break;
            case "Lead Engineer":
                roleId = 3;
                break;
            case "Software Engineer":
                roleId = 4;
                break;
            case "Account Manager":
                roleId = 5;
                break;
            case "Accountant":
                roleId = 6;
                break;
            case "Legal Team Lead":
                roleId = 7;
                break;
            case "Lawyer":
                roleId = 8;
                break;
        }
        db.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)', [answer.firstName, answer.lastName, roleId], function(err, results){
            if(err) {
                console.log(err)
            }
            else{
                console.log(results);
            }
        });
        employees.push(answer.firstName);
        if (answer.empRole === "Sales Lead" || answer.empRole === "Lead Engineer" || answer.empRole === "Account Manager" || answer.empRole === "Legal Team Lead") {
            managers.push(answer.firstName);
        }
        console.log(`${answer.firstName} ${answer.lastName} added to database`);
    })
    .catch((err) => console.error(err));
}

function updateEmpRole() {
    inquirer
    .prompt([
        {
            type: 'list',
            message: "Which employee's role do you want to update?",
            name: 'empUpdateName',
            choices: employees
        },
        {
            type: 'list',
            message: 'Which role do you want to assign to the selected employee?',
            name: 'empNewRole',
            choices: roles
        }
    ])
    .then((answer) => {
        //figure out values to put in the array
        db.query('UPDATE employee SET role_id = ? WHERE ? = ?', [1, 2, 3], function(error, results) {
            if(error) {
                console.error(error);
            }
            else{
                console.log(results);
            }
        });
        console.log(`${answer.empUpdateName}'s role updated to ${answer.empNewRole}`);
    })
    .catch((err) => console.error(err));
}

function viewAllDpts() {
    db.query('SELECT * FROM department', function(err, results){
        if(err) {
            console.error(err);
        }
        else{
            console.log(results);
            console.table(results);
        }
    });
}

function viewAllRoles() {
    db.query('SELECT * FROM role JOIN department ON role.department_id = department.id', function(err, results){
        if(err) {
            console.error(err);
        }
        else{
            results.forEach((result) => {
                delete result.department_id
            });
            console.table(results);
        }
    });
}

function viewAllEmployees() {
    //figure out manager column
    db.query('SELECT * FROM employee JOIN (role, department) ON (role.id = employee.role_id AND department.id = role.department_id)', function(err, results){
        if(err) {
            console.error(err);
        }
        else{
            results.forEach((result) => {
                delete result.department_id;
                delete result.role_id;
            });
            console.table(results);
        }
    });
}

init();
