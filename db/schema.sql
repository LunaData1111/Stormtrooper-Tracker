DROP DATABASE IF EXISTS empires_db;
CREATE DATABASE empires_db;
USE empires_db;

CREATE TABLE department(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR NOT NULL 
);

CREATE TABLE role(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR NOT NULL,
    salary DECIMAL,
    department_id INT 
);

CREATE TABLE stormtooper(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    role_id INT,
    manager_id INT 
);