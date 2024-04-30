import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, Typography, Toolbar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import '../dashboard/dashboard.css'; // Import CSS file for styling

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/employee/get-all');
            setEmployees(response.data.data);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const handleDelete = async (employee_id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this employee?");
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:4000/employee/delete-by-id/${employee_id}`);
                fetchData();
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    return (
        <div className="dashboard">
            <Toolbar className="dashboard-toolbar">
                <Typography variant="h4">Employee Dashboard</Typography>
                <IconButton component={Link} to="/addEmployee" className="add-icon-button">
                    <AddCircleIcon />
                </IconButton>
            </Toolbar>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Date of Birth</TableCell>
                        <TableCell>Join Date</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Designation</TableCell>
                        <TableCell>Level</TableCell>
                        <TableCell>Over-Time</TableCell>
                        <TableCell>PF No</TableCell>
                        <TableCell>Pan No</TableCell>
                        <TableCell>Reliving Date</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.employee_id}</TableCell>
                            <TableCell>{employee.employee_name}</TableCell>
                            <TableCell>{employee.employee_type}</TableCell>
                            <TableCell>{employee.gender}</TableCell>
                            <TableCell>{formatDate(employee.date_of_birth)}</TableCell>
                            <TableCell>{formatDate(employee.join_date)}</TableCell>
                            <TableCell>{employee.department}</TableCell>
                            <TableCell>{employee.designation}</TableCell>
                            <TableCell>{employee.level}</TableCell>
                            <TableCell>{employee.ot_applicable}</TableCell>
                            <TableCell>{employee.epf_number}</TableCell>
                            <TableCell>{employee.pan_number}</TableCell>
                            <TableCell>{formatDate(employee.reliving_date)}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleDelete(employee.id)} className="delete-icon-button">
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton component={Link} to={`/editEmployee/${employee.id}`} className="edit-icon-button">
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Dashboard;
