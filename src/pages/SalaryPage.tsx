import React from "react";
import SalaryList from "../components/Salary/SalaryList";
import type { Employee } from "../types";

interface Props {
  employees: Employee[];
}

const SalaryPage: React.FC<Props> = ({ employees }) => {
  return (
    <div className="dashboard-container">
      <div className="card-glass p-6">
        <SalaryList employees={employees} />
      </div>
    </div>
  );
};

export default SalaryPage;