
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../form/form.css'; // Import the CSS file

function Editpage() {
    const [data, setData] = useState(null);
    const [formData, setFormData] = useState(null);
    const [open, setOpen] = useState(false); 
    const { id } = useParams();
    // const history = useNavigate();

    useEffect(() => {
        const fetchEmployeeById = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/employee/get-by-id/${id}`);
                setData(response.data.data);
                setFormData(response.data.data); // Set form data for editing
            } catch (error) {
                console.error('Error fetching employee by ID:', error);
            }
        };
        fetchEmployeeById();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/employee/update-by-id/${id}`, formData);
            console.log('Employee updated successfully:', response.data);
            setOpen(true); 
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };
    const handleClose = () => {
        setOpen(false); // Close the dialog
    };

    const handleCancel = () => {
        setFormData(data); // Reset form data to initial state
        setOpen(false); // Close the dialog
    };

    return (
        <div className="root">
             <h2>Update Employee Form</h2>
            {formData && (
                <form className= "form"  onSubmit={handleSubmit}>
                   <div>
                        <Typography variant="subtitle1">Employee Name:</Typography>
                        <TextField className='input'
                            type="text"
                            name="employee_name"
                            value={formData.employee_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Typography variant="subtitle1">Employee Type:</Typography>
                        <Select
                            name="employee_type"
                            value={formData.employee_type}
                            onChange={handleChange}
                        >
                            <MenuItem value="" disabled>Select Employee Type</MenuItem>
                            <MenuItem value="onsite">Onsite</MenuItem>
                            <MenuItem value="remote">Remote</MenuItem>
                            <MenuItem value="hybrid">Hybrid</MenuItem>
                        </Select>
                    </div>
                    <div>
                    <label>Gender  :  </label>
                    <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange} >
                    <MenuItem value="" disabled selected>Select Gender</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="others">Others</MenuItem>
                </Select>
                    </div>
                    <div>
                        <label>Employee Department  :  </label>
                        <Select
                    label="Department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                >
                    <MenuItem value="" disabled selected>Select Department</MenuItem>
                    <MenuItem value="IT">IT</MenuItem>
                    <MenuItem value="NON-IT">NON-IT</MenuItem>
                </Select>                    </div>
                    <div>
                        <label>Employee Designation  :  </label>
                        <Select
                    label="Designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                >
                    <MenuItem value="" disabled selected>Select Designation</MenuItem>
                    <MenuItem value="FrontEnd Developer">FrontEnd Developer</MenuItem>
                    <MenuItem value="BackEnd Developer">BackEnd Developer</MenuItem>
                    <MenuItem value="Full Stack Developer">Full Stack Developer</MenuItem>
                    <MenuItem value="Purchase Team">Purchase Team</MenuItem>
                    <MenuItem value="Sales Team">Sales Team</MenuItem>
                    <MenuItem value="QA Team">QA Team</MenuItem>
                </Select>                   
                 </div>
                    <div>
                        <label>Employee Level  :  </label>
                        <Select
                    label="Level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                >
                    <MenuItem value="" disabled selected>Rate Level</MenuItem>
                    <MenuItem value="Junior">Junior</MenuItem>
                    <MenuItem value="Mid-Level">Mid-Level</MenuItem>
                    <MenuItem value="Senior">Senior</MenuItem>
                </Select>                    </div>
                    <div>
                        <label>Over-Time  :  </label>
                        <Select
                    label="OT Applicable"
                    name="ot_applicable"
                    value={formData.ot_applicable}
                    onChange={handleChange}
                >
                    <MenuItem value=""disabled selected>Over Time</MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                </Select>                    </div>
                    <div>
                        <label>PF Number:</label>
                        <input className="input" type="text" name="epf_number" value={formData.epf_number} onChange={handleChange} />
                    </div>
                    <div>
                        <label>PAN Number:</label>
                        <input className="input" type="text" name="pan_number" value={formData.pan_number} onChange={handleChange} />
                    </div>
                    <div className='btn'>
                    <Button type="submit" variant="contained" color="primary">Update</Button>
                    <Button onClick={handleCancel} variant="contained" color="secondary">Cancel</Button>
                    </div>
                </form>
            )}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Employee Updated</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Employee details have been successfully updated.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Editpage;
