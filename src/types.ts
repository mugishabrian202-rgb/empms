export interface Department {
    departmentCode: string;
    departmentName: string;
    grossSalary?: number;
}

export type Salary = {
    salaryID: number;
    employeeNumber: number;
    month: string;
    grossSalary: number;
    totalDeduction: number;
    netSalary: number;
    Employee?: Employee;
}

export interface Employee {
    // Single canonical Employee shape that covers the different shapes used across components.
    // id is string to allow both client-generated UUIDs and backend numeric IDs.
    id: string;
    // Legacy API fields (optional)
    employeeNumber?: number;

    // Personal / display
    firstName?: string;
    lastName?: string;
    name?: string; // fallback full name

    // Job
    role?: string;
    position?: string;

    // Payroll
    hourlyRate?: number;
    hoursWorked?: number;

    // Misc
    address?: string;
    telephone?: string;
    gender?: string;
    hiredDate?: string;
    Department?: Department;
}
