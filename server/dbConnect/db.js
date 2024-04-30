//const express = require('express');
// const { Pool } = require('pg');

// const app = express();

// // Create a new Pool instance for connecting to the database
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'root',
//   port: 5432, // Default PostgreSQL port
// });

// // Test the database connection
// pool.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//   } else {
//     console.log('Connected to PostgreSQL database:', res.rows[0].now);
//   }
// });

// // Define routes or middleware here...

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



// const { Client } = require('pg');

// // Create a new Client instance for connecting to the database
// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'root',
//   port: 5432, // Default PostgreSQL port
// });
// module.exports = client;