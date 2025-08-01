import { Employee } from "../interfaces/employee.interface";

// A method to generate data with a specified number of data entries. The output will be an employee data
function generateDummyEmployees(count: number): Employee[] {
    return Array.from({ length: count }, (_, i) => ({
        username: `user${i + 1}`,
        firstName: `First${i + 1}`,
        lastName: `Last${i + 1}`,
        email: `user${i + 1}@example.com`,
        birthDate: new Date(
            1990,
            0,
            1 + (i % 28),
            Math.floor(Math.random() * 24),
            Math.floor(Math.random() * 60),
            Math.floor(Math.random() * 60)
        ).toISOString(),
        basicSalary: 10000 + (i * 123.45),
        status: i % 2 === 0 ? "active" : "inactive",
        group: i % 3 === 0 ? "IT" : i % 3 === 1 ? "HR" : "Finance",
        description: `Employee number ${i + 1}`,
    }));
}

export const EMPLOYEE: Employee[] = generateDummyEmployees(100);
