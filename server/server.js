const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./dbConnect/pgDB')
const employeeRouter = require('./routes/index');
const EmployeeModel = require('./models/employeSeque');



app.use((req, res, next) => {
  console.log('Request headers:', req.headers);
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(express.json());

// Check database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
        // Sync the model with the database after establishing connection
        return EmployeeModel.sync();
    })
    .then(() => {
        console.log('Employee model synchronized with database.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
    
app.use(cors({
    origin: "*",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  }));

// Routes
app.use('/employee', employeeRouter);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






// // Connect to the database
// client.connect()
//   .then(() => {
//     console.log('Connected to PostgreSQL database');
//       // Call the insertData function after connecting to the database
//       insertData();
//   })
  
//   .catch((err) => {
//     console.error('Error connecting to the database:', err);
//   });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
