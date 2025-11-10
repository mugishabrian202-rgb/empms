import React from "react";
import EmployeeForm from "../components/Employee/EmployeeForm";
import EmployeeList from "../components/Employee/EmployeeList";
import SalaryCalculator from "../components/Salary/SalaryCalculator";
import type { Employee } from "../types";

interface Props {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  onAdd: (emp: Employee) => void;
  onDelete: (id: string | number) => void;
  onErrorDismiss: () => void;
}

const EmployeeDashboard: React.FC<Props> = ({
  employees,
  loading,
  error,
  onAdd,
  onDelete,
  onErrorDismiss,
}) => {
  return (
    <div className="dashboard-container">
      {error && (
        <div className="error-banner" role="status">
          {error}
          <button
            onClick={onErrorDismiss}
            style={{
              marginLeft: "0.5rem",
              background: "transparent",
              border: "none",
              color: "#ffb4b4",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}

      <div className="grid-modern">
        <section className="card-glass p-6">
          <EmployeeForm onAdd={onAdd} />
        </section>

        <section className="card-glass p-6">
          <SalaryCalculator employees={employees} />
        </section>
      </div>

      <div className="card-glass p-6 mt-8">
        <EmployeeList
          employees={employees}
          onDelete={onDelete}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EmployeeDashboard;