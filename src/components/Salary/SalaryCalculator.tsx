import React from "react";
import type { Employee } from "../../types";
import "./SalaryCalculator.css";

interface Props {
  employees: Employee[];
}

const SalaryCalculator: React.FC<Props> = ({ employees }) => {
  const totalSalary = employees.reduce((sum, emp) => {
    const h = emp.hourlyRate ?? 0;
    const hrs = emp.hoursWorked ?? 0;
    return sum + h * hrs;
  }, 0);

  const avgSalary = employees.length > 0 ? totalSalary / employees.length : 0;

  return (
    <div className="salary-calculator">
      <div className="calc-header">
        <h2 className="card-title">💰 Salary Overview</h2>
        <p className="calc-subtitle">Real-time payroll calculations</p>
      </div>

      <div className="calc-metrics">
        <div className="metric-card">
          <div className="metric-icon">💵</div>
          <div className="metric-content">
            <p className="metric-label">Total Payroll</p>
            <p className="metric-value">${totalSalary.toFixed(2)}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <p className="metric-label">Average Salary</p>
            <p className="metric-value">${avgSalary.toFixed(2)}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <p className="metric-label">Total Employees</p>
            <p className="metric-value">{employees.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculator;
