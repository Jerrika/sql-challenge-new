const { Pool } = require('pg');

const pool = new Pool({
  user: 'jerrikagabriel',       
  host: 'localhost',         
  database: 'employeetracker_db',   
  password: 'r3dKitten61',  
  port: 5432,                
});


module.exports = pool;