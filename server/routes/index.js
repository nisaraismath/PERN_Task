const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// POST route to create a new employee
router.post('/create', employeeController.createEmployee);
router.get('/get-all', employeeController.getAllEmployees)
router.get('/get-by-id/:id',employeeController.getEmployeeById);
router.put('/update-by-id/:id',employeeController.updateEmployee);
router.delete('/delete-by-id/:id',employeeController.deleteEmployeeById);

module.exports = router;
