// const { Client } = require('pg');
// const client = require('../dbConnect/pgDB');

// class Employee {
//   constructor(data) {
//     this.employee_id = data.employee_id;
//     this.employee_name = data.employee_name;
//     this.employee_type = data.employee_type;
//     this.gender = data.gender;
//     this.date_of_birth = data.date_of_birth;
//     this.join_date = data.join_date;
//     this.department = data.department;
//   }

//   async save() {
//     const query = `
//       INSERT INTO employees (employee_id, employee_name, employee_type, gender, date_of_birth, join_date, department)
//       VALUES ($1, $2, $3, $4, $5, $6, $7)
//       RETURNING *;
//     `;
//     const values = [
//       this.employee_id,
//       this.employee_name,
//       this.employee_type,
//       this.gender,
//       this.date_of_birth,
//       this.join_date,
//       this.department
//     ];

//     try {
//       const result = await client.query(query, values);
//       return result.rows[0];
//     } catch (error) {
//       console.error('Error inserting data:', error);
//       throw error;
//     }
//   }
// }

// module.exports = Employee;
