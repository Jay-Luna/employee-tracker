-- CREATE DATABASE --
DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

-- DEPARTMENT TABLE ----
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);

-- ROLE TABLE ----
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- EMPLOYEE TABLE ----
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- DEPARTMENT SEEDS -----
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");

-- ROLE SEEDS -------
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 190000, 4);

-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("John", "Doe", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Jane", "Doe", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Cookes","Sushi",3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Pizza", "Cheese", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Chicken", "Parm", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Ramen", "Egg", 6, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Juice", "Water", 6, 5);

-- SELECTING ALL DATA -- 
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;