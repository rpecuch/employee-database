-- display all roles
-- SELECT role.id, role.title, role.salary
-- AS salary, department.department 
-- FROM department
-- LEFT JOIN role ON department.id = role.department_id;

-- display all employees
-- SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id
-- AS manager_id, role.title, role.salary, department.department
-- FROM role
-- LEFT JOIN (employee, department) ON role.id = employee.role_id AND role.department_id = department.id;

SELECT employee.id, employee.first_name, employee.last_name
AS last_name, role.title, role.salary, department.department
FROM role
LEFT JOIN (employee, department) ON role.id = employee.role_id AND role.department_id = department.id;