// Controller function to handle creating a new employee
const Employee  = require('../models/employeSeque');
const createEmployee = async (req, res) => {
    try {
      const employee_id = generateEmployeeID();
      const {
        employee_name,
        employee_type,
        gender,
        date_of_birth,
        join_date,
        department,
        designation,
        level,
        ot_applicable,
        epf_number,
        pan_number,
        reliving_date,
      } = req.body;
      if (!employee_name || !employee_type || !gender || !date_of_birth || !join_date || !department || !designation || !level || !ot_applicable || !epf_number || !pan_number || !reliving_date) {
        return res.status(400).json({ success: false, error: 'Missing required fields in the request body.' });
    }
      // Create the employee record in the database
      const newEmployee = await Employee.create({
        employee_id,
        employee_name,
        employee_type,
        gender,
        date_of_birth,
        join_date,
        department,
        designation,
        level,
        ot_applicable,
        epf_number,
        pan_number,
        reliving_date,
      
      });
  
      // Send a success response with the newly created employee data
      res.status(201).json({ success: true, data: newEmployee });
    } catch (error) {
      // Handle any errors and send an error response
      console.error('Error creating employee:', error);
      res.status(500).json({ success: false, error: 'Failed to create employee.' });
  }
};

  // Function to generate employee ID with prefix "EMP" and five digits
  const generateEmployeeID = () => {
    const prefix = 'EMP';
    const randomDigits = Math.floor(10000 + Math.random() * 90000); // Generate five random digits
    return prefix + randomDigits;
  };

  // Controller function to handle fetching all employees
const getAllEmployees = async (req, res) => {
    try {
        // Fetch all employees from the database
        const employees = await Employee.findAll();

        // Send a success response with the employee data
        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        // Handle any errors and send an error response
        console.error('Error fetching employees:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch employees.' });
    }
};

// Controller function to handle updating an employee
const updateEmployee = async (req, res) => {
    const { id } = req.params; // Extract employee ID from URL params
    const employee = await Employee.findByPk(id); // Find the employee by ID

    // Destructure the fields to update from the request body
    const {
        employee_name,
        employee_type,
        gender,
        date_of_birth,
        join_date,
        department,
        designation,
        level,
        ot_applicable,
        epf_number,
        pan_number,
        reliving_date
    } = req.body;

    try {
        // If employee not found, return error
        if (!employee) {
            return res.status(404).json({ success: false, error: 'Employee not found.' });
        }

        // Update the employee record in the database
        await employee.update({
            employee_name,
            employee_type,
            gender,
            date_of_birth,
            join_date,
            department,
            designation,
            level,
            ot_applicable,
            epf_number,
            pan_number,
            reliving_date
        });

        // Send a success response with the updated employee data
        res.status(200).json({ success: true, data: employee, msg: 'Employee profile updated successfully' });
    } catch (error) {
        // Handle any errors and send an error response
        console.error('Error updating employee profile:', error);
        res.status(500).json({ success: false, error: 'Failed to update employee profile.' });
    }
};

const getEmployeeById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the employee by ID
        const employee = await Employee.findByPk(id);

        // If employee not found, return error
        if (!employee) {
            return res.status(404).json({ success: false, error: 'Employee not found.' });
        }

        // Send the employee data in the response
        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        // Handle any errors and send an error response
        console.error('Error retrieving employee:', error);
        res.status(500).json({ success: false, error: 'Failed to retrieve employee.' });
    }
};

const deleteEmployeeById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the employee by ID
        const employee = await Employee.findByPk(id);

        // If employee not found, return error
        if (!employee) {
            return res.status(404).json({ success: false, error: 'Employee not found.' });
        }

        // Delete the employee from the database
        await employee.destroy();

        // Send a success message in the response
        res.status(200).json({ success: true, message: 'Employee deleted successfully.' });
    } catch (error) {
        // Handle any errors and send an error response
        console.error('Error deleting employee:', error);
        res.status(500).json({ success: false, error: 'Failed to delete employee.' });
    }
};


  module.exports = { createEmployee, getAllEmployees,updateEmployee,getEmployeeById,deleteEmployeeById };
  