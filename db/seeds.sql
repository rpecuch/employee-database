INSERT INTO department (id, name)
VALUES (1, "Sales"),
(2, "Engineering"),
(3, "Finance"),
(4, "Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 1),
(2, "Salesperson", 80000, 1),
(3, "Lead Engineer", 150000, 2),
(4, "Software Engineer", 120000, 2),
(5, "Account Manager", 160000, 3),
(6, "Accountant", 125000, 3),
(7, "Legal Team Lead", 250000, 4),
(8, "Lawyer", 190000, 4);

-- entire manager_id column is populating as null
INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (1, "John", "Doe", 1),
(2, "Mike", "Smith", 2),
(3, "Ashley", "Brown", 3),
(4, "Jane", "Doe", 4),
(5, "Kevin", "Kramer", 5),
(6, "Maria", "Johnson", 6),
(7, "Sarah", "Smith", 7),
(8, "Tom", "Allen", 8);