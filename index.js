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

//store initial choices
const departments = ["Sales", "Engineering", "Finance", "Legal"];
const roles = ["Sales Lead", "Lead Engineer", "Account Manager", "Legal Team Lead", "Salesperson", "Software Engineer", "Accountant", "Lawyer"];
const lastNames = ['Doe', 'Brown', 'Kramer','Pecuch', 'Smith', 'Widow', 'Johnson', 'Allen'];
const managers = ['None','Doe', 'Brown', 'Kramer', 'Pecuch'];

//displays list of choices to user
function init() {
    inquirer
    .prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name:'selection',
            choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
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
            case "Quit":
                process.exit();
        }
    })
    .catch((err) => console.error(err));
}

//retrieves input from user and adds new department to database
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
        });
        console.log(`${answer.dptName} department added to database`);
        init();
    })
    .catch((err) => console.error(err));
}

//retrieves input from user and adds new role to database
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
        //retrieve dpt ID from array of dpts
        var dptId = departments.indexOf(answer.roleDpt) + 1;
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answer.roleName, answer.salary, dptId], function(err, results){
            if(err) {
                console.log(err)
            }
        });
        roles.push(answer.roleName);
        console.log(`${answer.roleName} role added to database`);
        init();
    })
    .catch((err) => console.error(err));
}

//retrieves input from user and adds new employee to database
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
        //retrieve role ID from roles array
        var roleId = roles.indexOf(answer.empRole) + 1;
        let managerId;
        //generates manager ID
        if(answer.empManager === 'None') {
            managerId = null;
        }
        else {
            managerId = managers.indexOf(answer.empManager);
        }
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answer.firstName, answer.lastName, roleId, managerId], function(err, results){
            if(err) {
                console.log(err)
            }
        });
        lastNames.push(answer.lastName);
        if (answer.empRole === "Sales Lead" || answer.empRole === "Lead Engineer" || answer.empRole === "Account Manager" || answer.empRole === "Legal Team Lead") {
            managers.push(answer.lastName);
        }
        console.log(`${answer.firstName} ${answer.lastName} added to database`);
        init();
    })
    .catch((err) => console.error(err));
}

//retrieves input from user and updates employee role in database
function updateEmpRole() {
    inquirer
    .prompt([
        {
            type: 'list',
            message: "Which is the employee's last name?",
            name: 'empUpdateName',
            choices: lastNames
        },
        {
            type: 'list',
            message: 'Which role do you want to assign to the selected employee?',
            name: 'empNewRole',
            choices: roles
        }
    ])
    .then((answer) => {
        //retrieves role ID from roles array
        var roleId = roles.indexOf(answer.empNewRole) + 1;
        //retrieves employee ID from lastNames array
        var empId = lastNames.indexOf(answer.empUpdateName) + 1;
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, empId], function(error, results) {
            if(error) {
                console.error(error);
            }
        });
        console.log(`${answer.empUpdateName}'s role updated to ${answer.empNewRole}`);
        init();
    })
    .catch((err) => console.error(err));
}

//displays table with all departments
function viewAllDpts() {
    db.query('SELECT * FROM department', function(err, results){
        if(err) {
            console.error(err);
        }
        else{
            console.table(results);
            init();
        }
    });
}

//displays table with all roles
function viewAllRoles() {
    db.query('SELECT role.id, role.title, role.salary AS salary, department.department FROM department LEFT JOIN role ON department.id = role.department_id', function(err, results){
        if(err) {
            console.error(err);
        }
        else{
            console.table(results);
            init();
        }
    });
}

//displays table with all employees
function viewAllEmployees() {
    db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary, IFNULL(CONCAT(m.first_name, ' ', m.last_name), null) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee AS m ON employee.manager_id = m.id", function(err, results){
        if(err) {
            console.error(err);
        }
        else{
            console.table(results);
            init();
        }
    });
}

//prompts user with options when app loads
init();
