DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2)NOT  NULL,
  department_id INT
);

CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  title VARCHAR(50) NOT NULL, 
  role_id INT,
  manager_id INT DEFAULT '1',
);

INSERT INTO employee (first_name, last_name, title, role_id, manager_id)
VALUES ('Chris', 'Joseph','Head Engineer', 7, 45);


INSERT INTO employee (first_name, last_name, title, role_id, manager_id)
VALUES ('Lali', 'Augustine','Manager', 3, 10);


INSERT INTO employee (first_name, last_name, title, role_id, manager_id)
VALUES ('Bart', 'Simpson', 'Intern', 9, 83);
