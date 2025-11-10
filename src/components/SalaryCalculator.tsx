import React from "react";
import type { Employee } from "../App";

interface Props {
    employees: Employee[];
}

const SalaryCalculator: React.FC<Props> = ({ employees }) => {
    const totalSalary = employees.reduce(
        (sum, emp) => sum + emp.hourlyRate * emp.hoursWorked,
        0
    );

    return (
        <div>
            <h2 className="card-title">Total Salary Expense</h2>
            <p className="text-3xl font-bold" style={{ color: "white", marginTop: 8 }}>
                ${totalSalary.toFixed(2)}
            </p>
            <p className="muted small" style={{ marginTop: 8 }}>
                Calculated from {employees.length} employee(s)
            </p>
        </div>
    );
};

export default SalaryCalculator;
