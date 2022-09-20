INSERT INTO department (department)
VALUES ("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Account Manager", 160000, 3),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);

-- entire manager_id column is populating as null
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null),
("Mike", "Smith", 2, 1),
("Ashley", "Brown", 3, null),
("Jane", "Doe", 4, 3),
("Kevin", "Kramer", 5, null),
("Maria", "Johnson", 6, 5),
("Sarah", "Smith", 7, null),
("Tom", "Allen", 8, 7);