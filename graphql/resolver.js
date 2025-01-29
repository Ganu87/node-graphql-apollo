const { Query } = require('pg');
const db = require('../db/db');

const resolvers = {

    Query: {
        employees: async () => {
            const result = await db.query("SELECT * FROM EMPLOYEE");
            return result.rows;
        },
        departments: async () => {
            const result = await db.query("SELECT * FROM DEPARTMENT");
            return result.rows;
        },
        salaries: async () => {
            const result = await db.query("SELECT * FROM SALARY");
            return result.rows;
        },
        employeeDetails: async (_, { id }) => {
            const employee = (await db.query("SELECT * FROM EMPLOYEE WHERE ID=:$1", [id])).rows[0];
            if (employee) {
                const department = (await db.query("SELECT * FROM DEPARTMENT WHERE ID=:$1", [employee.department_id])).rows[0];
                const salary = (await db.query("SELECT * FROM SALARY WHERE EMPLOYEE_ID=$1", [id])).rows;

                return { ...employee, department, salary };
            }
            return null;
        },
    },
    Employee: {
        department: async (employee) => {
            const result = await db.query("SELECT * FROM DEPARTMENT WHERE ID=:$1", [employee.department_id]);
            return result.rows[0];
        },
        salary: async (employee) => {
            const result = await db.query("SELECT * FROM SALARY WHERE WHERE EMPLOYEE_ID=:$1", [employee.id]);
            return result.rows;
        },
    },
    Department: {
        employees: async (department) => {
            const result = await db.query("SELECT * FROM EMPLOYEE WHERE DEPARTMENT_ID=:$1", [department.id]);
            return result.rows;
        },
    },
};

module.exports = resolvers;