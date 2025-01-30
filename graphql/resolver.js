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
            const employeeQuery = await db.query("SELECT * FROM EMPLOYEE WHERE ID = $1", [id]);
            if (employeeQuery.rows.length === 0) return null;

            const employee = employeeQuery.rows[0];

            // Fetch department
            const departmentQuery = await db.query("SELECT * FROM DEPARTMENT WHERE ID = $1", [employee.department_id]);
            const department = departmentQuery.rows[0] || null;

            // Fetch salary details
            const salaryQuery = await db.query("SELECT * FROM SALARY WHERE EMPLOYEE_ID = $1", [id]);
            const salary = salaryQuery.rows;

            return { ...employee, department, salary };
        },
    },
    Employee: {
        department: async (employee) => {
            const result = await db.query("SELECT * FROM DEPARTMENT WHERE ID = $1", [employee.department_id]);
            return result.rows[0];
        },
        salary: async (employee) => {
            const result = await db.query("SELECT * FROM SALARY WHERE EMPLOYEE_ID = $1", [employee.id]);
            return result.rows;
        },
    },
    Department: {
        employees: async (department) => {
            const result = await db.query("SELECT * FROM EMPLOYEE WHERE DEPARTMENT_ID = $1", [department.id]);
            return result.rows;
        },
    },
    
    Mutation: {
        // Add Department
        addDepartment: async (_, { name }) => {
            const result = await db.query(
                "INSERT INTO DEPARTMENT (name) VALUES ($1) RETURNING *",
                [name]
            );
            return result.rows[0]; // Returns the newly created department
        },

        // Update Department
        updateDepartment: async (_, { id, name }) => {
            const result = await db.query(
                "UPDATE DEPARTMENT SET name = $1 WHERE id = $2 RETURNING *",
                [name, id]
            );
            return result.rows[0]; // Returns the updated department
        },

        // Delete Department
        deleteDepartment: async (_, { id }) => {
            await db.query("DELETE FROM DEPARTMENT WHERE id = $1", [id]);
            return `Department with ID ${id} deleted successfully.`;
        },
    },
};

module.exports = resolvers;
