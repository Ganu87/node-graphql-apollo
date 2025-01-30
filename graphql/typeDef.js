const { gql } = require('apollo-server');

const typeDefs = gql`
    type Employee {
        id: Int!
        name: String!
        email: String
        department: Department
        salary: [Salary]
    }

    type Department {
        id: Int!
        name: String!
        employees: [Employee]
    }

    type Salary {
        id: Int!
        employee_id: Int!
        month: String!
        salary_amount: Float!
    }

    type Query {
        employees: [Employee]
        departments: [Department]
        salaries: [Salary]
        employeeDetails(id: Int!): Employee
    }

    type Mutation {
        addDepartment(name: String!): Department
        updateDepartment(id: Int!, name: String!): Department
        deleteDepartment(id: Int!): String
    }
`;

module.exports = typeDefs;
