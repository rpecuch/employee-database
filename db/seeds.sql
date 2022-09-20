INSERT INTO department (department)
VALUES ("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
("Lead Engineer", 150000, 2),
("Account Manager", 160000, 3),
("Legal Team Lead", 250000, 4),
("Salesperson", 80000, 1),
("Software Engineer", 120000, 2),
("Accountant", 125000, 3),
("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null),
("Ashley", "Brown", 2, null),
("Kevin", "Kramer", 3, null),
("Sarah", "Pecuch", 4, null),
("Mike", "Smith", 5, 1),
("Jane", "Widow", 6, 2),
("Maria", "Johnson", 7, 3),
("Tom", "Allen", 8, 4);