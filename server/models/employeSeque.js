// Import Sequelize library and data types
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dbConnect/pgDB');
require('dotenv').config();


// Define the Employee model
const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  employee_id: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  employee_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  employee_type: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false
  },
  join_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  department: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  designation: {
    type: DataTypes.STRING(255),
  },
  level: {
    type: DataTypes.STRING(255),
  },
  ot_applicable: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  epf_number: {
    type: DataTypes.STRING(255)
  },
  pan_number: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  reliving_date: {
    type: DataTypes.DATE
  },

});

module.exports = Employee;


