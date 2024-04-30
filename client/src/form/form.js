import React, { useEffect, useState } from "react";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import '../form/form.css'; // Import the CSS file

const useStyles = makeStyles((theme) => ({
  // Define any additional styles here if needed
}));

export default function Form() {
    const classes = useStyles();

    const [formData, setFormData] = useState({
        employee_name: '',
        employee_type: '',
        gender: '',
        date_of_birth: '',
        join_date: '',
        department: '',
        designation: '',
        level: '',
        ot_applicable: '',
        epf_number: '',
        pan_number: '',
        reliving_date: '',
    });

    const [errors, setErrors] = useState({}); 
    const [isEmployeeName, setIsEmployeeName]= useState(false);
    const [isEmployeeTypeSelected, setIsEmployeeTypeSelected] = useState(false);
    const [isGenderSelected, setIsGenderSelected] = useState(false);
    const [isDepartmentSelected, setIsDepartmentSelected] = useState(false);
    const [isDesignationSelected, setIsDesignationSelected] = useState(false);
    const [isLevelSelected, setIsLevelSelected] = useState(false);
    const [isOTApplicableSelected, setIsOTApplicableSelected] = useState(false);
    const [open, setOpen] = useState(false);
    const validateFormData = (data) => {
        let errors = {};

        // Validate each field and set error message if invalid
        if (!data.employee_name.trim()) {
            errors.employee_name = 'Employee name is required';
        }
    
        if (!data.employee_type.trim()) {
            errors.employee_type = 'Employee type is required';
        }
    
        if (!data.gender.trim()) {
            errors.gender = 'Gender is required';
        }
    
        if (!data.date_of_birth.trim()) {
            errors.date_of_birth = 'Date of birth is required';
        }
    
        if (!data.join_date.trim()) {
            errors.join_date = 'Join date is required';
        }
    
        if (!data.department.trim()) {
            errors.department = 'Department is required';
        }
    
        if (!data.designation.trim()) {
            errors.designation = 'Designation is required';
        }
    
        if (!data.level.trim()) {
            errors.level = 'Level is required';
        }
    
        if (!data.ot_applicable.trim()) {
            errors.ot_applicable = 'OT applicable is required';
        }
    
        if (!data.epf_number.trim()) {
            errors.epf_number = 'EPF number is required';
        }
    
        if (!data.pan_number.trim()) {
            errors.pan_number = 'PAN number is required';
        }
    
        if (!data.reliving_date.trim()) {
            errors.reliving_date = 'Reliving date is required';
        }
    
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validationError = validateFormData(formData);
            if (Object.keys(validationError).length === 0) {
                const response = await axios.post('http://localhost:4000/employee/create', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Response:', response.data);
                setOpen(true);
                setFormData({
                    employee_name: '',
                    employee_type: '',
                    gender: '',
                    date_of_birth: '',
                    join_date: '',
                    department: '',
                    designation: '',
                    level: '',
                    ot_applicable: '',
                    epf_number: '',
                    pan_number: '',
                    reliving_date: '',
                });
            } else {
                setErrors(validationError);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const getData = await axios.get('http://localhost:4000/employee/get-all')
                const res = await getData.data
                console.log(res, 'get')
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="root">
            <h2>Employee Form</h2>
            <form className= "form" onSubmit={handleSubmit}>
                {/* Employee name */}
                {!isEmployeeName && (
                    <Typography variant="subtitle1" className="input-label">
                        Enter Full Name
                    </Typography>
                )}
                <input className="input" 
                type="text" 
                name="employee_name" 
                value={formData.employee_name} 
                error={Boolean(errors.employee_name)}
                helperText={errors.employee_name}
                onChange={handleChange} />


                {/* Employee type */}
                {!isEmployeeTypeSelected && (
                    <Typography variant="subtitle1" className="select-label">
                        Select Employee Type
                    </Typography>
                )}
                <Select className="select"
                    label="Employee Type"
                    name="employee_type"
                    value={formData.employee_type}
                    onChange={handleChange}
                    error={Boolean(errors.employee_type)}
                >
    <MenuItem value="" disabled selected>
        Select Employee Type
    </MenuItem>
    <MenuItem value="onsite">Onsite</MenuItem>
    <MenuItem value="remote">Remote</MenuItem>
    <MenuItem value="hybrid">Hybrid</MenuItem>
    
</Select>
                {/* Gender */}
                {!isGenderSelected && (
                    <Typography variant="subtitle1" className="select-label">
                        Select Employee Gender
                    </Typography>
                )}
                <Select
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    error={Boolean(errors.gender)}
                >
                    <MenuItem value="" disabled selected>Select Gender</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="others">Others</MenuItem>
                </Select>
                {/* Date of birth */}
                <TextField className="date-input"
                    label="Date of Birth"
                    name="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    error={Boolean(errors.date_of_birth)}
                    helperText={errors.date_of_birth}
                />
                {/* Join date */}
                <TextField className="date-input"
                    label="Join Date"
                    name="join_date"
                    type="date"
                    value={formData.join_date}
                    onChange={handleChange}
                    error={Boolean(errors.join_date)}
                    helperText={errors.join_date}
                />
                {/* Department */}
                {!isDepartmentSelected && (
                    <Typography variant="subtitle1" className="select-label">
                        Select Employee Department
                    </Typography>
                )}
                <Select
                    label="Department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    error={Boolean(errors.department)}
                >
                    <MenuItem value="" disabled selected>Select Department</MenuItem>
                    <MenuItem value="IT">IT</MenuItem>
                    <MenuItem value="NON-IT">NON-IT</MenuItem>
                </Select>
                {/* Designation */}
                {!isDesignationSelected && (
                    <Typography variant="subtitle1" className="select-label">
                        Select Employee Designation
                    </Typography>
                )}
                <Select
                    label="Designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    error={Boolean(errors.designation)}
                >
                    <MenuItem value="" disabled selected>Select Designation</MenuItem>
                    <MenuItem value="FrontEnd Developer">FrontEnd Developer</MenuItem>
                    <MenuItem value="BackEnd Developer">BackEnd Developer</MenuItem>
                    <MenuItem value="Full Stack Developer">Full Stack Developer</MenuItem>
                    <MenuItem value="Purchase Team">Purchase Team</MenuItem>
                    <MenuItem value="Sales Team">Sales Team</MenuItem>
                    <MenuItem value="QA Team">QA Team</MenuItem>
                </Select>
                {/* Level */}
                {!isLevelSelected && (
                    <Typography variant="subtitle1" className="select-label">
                        Select Employee Level
                    </Typography>
                )}
                <Select
                    label="Level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    error={Boolean(errors.level)}
                >
                    <MenuItem value="" disabled selected>Rate Level</MenuItem>
                    <MenuItem value="Junior">Junior</MenuItem>
                    <MenuItem value="Mid-Level">Mid-Level</MenuItem>
                    <MenuItem value="Senior">Senior</MenuItem>
                </Select>
                {/* OT Applicable */}
                {!isOTApplicableSelected && (
                    <Typography variant="subtitle1" className="select-label">
                        Over-Time
                    </Typography>
                )}
                <Select
                    label="OT Applicable"
                    name="ot_applicable"
                    value={formData.ot_applicable}
                    onChange={handleChange}
                    error={Boolean(errors.ot_applicable)}
                >
                    <MenuItem value=""disabled selected>Over Time</MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                </Select>
                {/* EPF Number */}
                <TextField
                    label="EPF Number"
                    name="epf_number"
                    value={formData.epf_number}
                    onChange={handleChange}
                    error={Boolean(errors.epf_number)}
                    helperText={errors.epf_number}
                />
                {/* PAN Number */}
                <TextField
                    label="PAN Number"
                    name="pan_number"
                    value={formData.pan_number}
                    onChange={handleChange}
                    error={Boolean(errors.pan_number)}
                    helperText={errors.pan_number}
                />
                {/* Reliving Date */}
                <TextField className="date-input"
                    label="Reliving Date"
                    name="reliving_date"
                    type="date"
                    value={formData.reliving_date}
                    onChange={handleChange}
                    error={Boolean(errors.reliving_date)}
                    helperText={errors.reliving_date}
                />
                <Button className="button" variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </form>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Form Submitted Successfully!</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Your form has been submitted successfully.
                    </Typography>
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