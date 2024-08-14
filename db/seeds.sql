-- Insert into the department table
INSERT INTO department (name) 
VALUES  ('Human Resources'),
        ('Engineering'),
        ('Maintenance'),
        ('Quality Assurance');  -- Corrected spelling

-- Insert into the role table
INSERT INTO role (title, salary, department_id) 
VALUES ('HR Manager', 75000, 1),
       ('Recruiter', 60000, 1),
       ('Software Engineer', 90000, 2),
       ('Maintenance Tech', 55000, 3),
       ('Quality Assurance Lead', 80000, 4);  -- Corrected spelling and added salary column

-- Insert into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id, hire_date) 
VALUES ('Abby', 'Days', 1, NULL, '2023-01-15'),
       ('Carl Lee', 'Smith', 3, 1, '2022-08-22'),
       ('Alieu', 'Danso', 4, 2, '2024-02-05'),
       ('Brian', 'Talbert', 5, NULL, '2023-11-30'),
       ('Jonathan', 'Jacks', 5, 3, '2024-03-01');


