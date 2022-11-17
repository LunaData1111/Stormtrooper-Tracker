USE empires_db

INSERT INTO department(name)
VALUES ("Bad batch"), ("501"), ("Company-153");

INSERT INTO role(title, salary, department_id)
VALUES ("Captin", 70000, 1), ("Seargant", 50000, 2), ("Private", 25000, 3);

INSERT INTO stormtrooper(first_name, last_name, role_id, manager_id)
VALUES ("Hunter", "Clone", 1, null), ("Hound", "Clone", 2, 1), ("Axe", "Clone", 3, 2);
