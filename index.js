const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const departments = ["Sales", "Engineering", "Finance", "Legal"];
const roles = ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"];
const employees = ['John Doe', 'Mike Smith', 'Ashley Brown','Jane Doe', 'Kevin Kramer', 'Maria Johnson', 'Sarah Smith', 'Tom Allen'];
const managers = ['None','John Doe', 'Ashley Brown', 'Kevin Kramer', 'Sarah Smith'];

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
        console.log(departments);
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
        //need to save the other data with the role name
        roles.push(answer.roleName);
        console.log(roles);
        console.log(`${answer.roleName} role added to database`);
    })
    .catch((err) => console.error(err));
}

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
        //need to save the other data with the emp name
        employees.push(answer.firstName);
        if (answer.empRole === "Sales Lead" || answer.empRole === "Lead Engineer" || answer.empRole === "Account Manager" || answer.empRole === "Legal Team Lead") {
            managers.push(answer.firstName);
        }
        console.log(employees);
        console.log(managers);
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
        //update the role
        console.log(`${answer.empUpdateName}'s role updated to ${answer.empNewRole}`);
    })
    .catch((err) => console.error(err));
}

function viewAllDpts() {
    //display both cols from dpt table
}

function viewAllRoles() {
    //want id and title from role table
    //want name from dpt table
    //want salary from role table
}

function viewAllEmployees() {
    //want id, first name, and last name categories from employee table
    //want title from role table
    //want name from dpt table
    //want salary from role table
    //want manager from employee table
}

init();
