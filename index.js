const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

function init() {
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name:'selection',
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
        }
    ]);
    //direct to correct function depending on what they select
}

function addDepartment() {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'dptName'
        }
    ]);
    //console.log that dpt was added to database
}

function addRole() {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is the name of the role',
            name: 'roleName'
        },
        {
            type: 'input',
            message: 'What is the salary of the role',
            name: 'salary'
        },
        {
            type: 'list',
            message: 'Which department does the role belong to?',
            name: 'roleDpt',
            //need to find a way for new dpts to be added to this list
            choices: ['Engineering', 'Finance', 'Legal', 'Sales']
        }
    ]);
    //console.log that role was added to database
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
            //need to find a way for new roles to be added to this list
            choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"]
        },
        {
            type: 'list',
            message: "Who is the employee's manager?",
            name: 'empManager',
            //need to find a way for new managers to be added to this list
            choices: ['None', 'John Doe', 'Ashley Brown', 'Kevin Kramer', 'Sarah Smith']
        }
    ]);
    //console.log that role was added to database
}

function updateEmpRole() {
    inquirer
    .prompt([
        {
            type: 'list',
            message: "Which employee's role do you want to update?",
            name: 'empUpdateName',
            //for choices retrieve employee list
        },
        {
            type: 'list',
            message: 'Which role do you want to assign to the selected employee?',
            name: 'empNewRole',
            //for choices retrieve list of roles
        }
    ]);
    //console.log that role was updated
}

function viewAllEmployees() {
    //want id, first name, and last name categories from employee table
    //want title from role table
}

init();
