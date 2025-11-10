import React from "react";
import type { Employee } from "../types";

interface Props {
  employees: Employee[];
}

const ReportsPage: React.FC<Props> = ({ employees }) => {
  return (
    <div className="dashboard-container">
      <div className="card-glass p-6">
        <h2 className="card-title">📊 Reports</h2>
        <p className="muted small" style={{ marginTop: 12 }}>
          Total Employees: {employees.length}
        </p>
        <p className="muted small">
          Total Payroll: $
          {employees
            .reduce((sum, emp) => sum + (emp.hourlyRate ?? 0) * (emp.hoursWorked ?? 0), 0)
            .toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ReportsPage;