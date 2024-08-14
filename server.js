const inquirer = require('inquirer');
const pool = require('./config/connection');

// Function to create a new employee
const createEmployee = async (firstName, lastName, roleId, managerId) => {
  const query = `
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [firstName, lastName, roleId, managerId || null]; // Use null if managerId is not provided

  try {
    const result = await pool.query(query, values);
    console.log('Employee Created:', result.rows[0]);
  } catch (err) {
    console.error('Error creating employee:', err);
  }
};

// Function to display the main menu
const mainMenu = async () => {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'Add New Employee',
      'View All Employees',
      'Exit'
    ],
  });

  switch (action) {
    case 'Add New Employee':
      await addNewEmployee();
      break;
    case 'View All Employees':
      await viewAllEmployees();
      break;
    case 'Exit':
      pool.end(); // Close the database connection before exiting
      process.exit();
  }
};

// Function to add a new employee
const addNewEmployee = async () => {
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the employee\'s first name:',
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the employee\'s last name:',
    },
    {
      type: 'number',
      name: 'roleId',
      message: 'Enter the employee\'s role ID:',
    },
    {
      type: 'number',
      name: 'managerId',
      message: 'Enter the employee\'s manager ID (or leave blank if none):',
      default: null
    },
  ]);

  await createEmployee(firstName, lastName, roleId, managerId);
  await mainMenu();
};

// Function to view all employees
const viewAllEmployees = async () => {
  try {
    const result = await pool.query(`
      SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, 
             COALESCE(m.first_name || ' ' || m.last_name, 'None') AS manager
      FROM employee e
      JOIN role r ON e.role_id = r.id
      JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id;
    `);
    console.table(result.rows);
  } catch (err) {
    console.error('Error fetching employees:', err);
  }
  await mainMenu();
};

// Start the application
mainMenu();
