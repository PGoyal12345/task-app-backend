const mysql = require('mysql2');

const pool = mysql.createConnection({
  host: 'database-1.cz4cw02ssbdr.eu-north-1.rds.amazonaws.com',
  user: 'admin',
  password: '12345678',
  database: 'test_db',
  port: 3306,
});

pool.connect(err => {
  if (err) {
    console.error('Connection error:', err);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = pool;
