-- display all roles
-- SELECT role.id, role.title, role.salary
-- AS salary, department.department 
-- FROM department
-- LEFT JOIN role ON department.id = role.department_id;

-- display all employees
-- SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department, role.salary, IFNULL(CONCAT(m.first_name, ' ', m.last_name), null) AS manager
-- FROM employee
-- JOIN role ON employee.role_id = role.id
-- JOIN department ON role.department_id = department.id
-- LEFT JOIN employee AS m ON employee.manager_id = m.id;

-- SELECT first_name, last_name FROM employee WHERE manager_id IS NULL;