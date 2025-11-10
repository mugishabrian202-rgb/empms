import React, { useState, useEffect } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import SalaryCalculator from "./components/SalaryCalculator";
import "./App.css";

export interface Employee {
  id: number;
  name: string;
  role: string;
  hourlyRate: number;
  hoursWorked: number;
}

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Load data from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("employees");
    if (saved) setEmployees(JSON.parse(saved));
  }, []);

  // Save to LocalStorage whenever employees change
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (employee: Employee) => {
    setEmployees([...employees, employee]);
  };

  const deleteEmployee = (id: number) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <div className="min-h-screen p-6" style={{ background: "linear-gradient(180deg,#061226 0%, #04050A 100%)" }}>
      <div className="app-header">
        <div className="app-title">
          <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg,#7c5cff,#4a92ff)", boxShadow: "0 8px 30px rgba(76,58,255,0.18)" }} />
          <div>
            <h1>Employee Management</h1>
            <div className="app-sub">Dark • Modern • Clean</div>
          </div>
        </div>
      </div>

      <div className="grid-modern">
        <div className="card-glass p-6">
          <EmployeeForm onAdd={addEmployee} />
        </div>

        <div className="card-glass p-6">
          <SalaryCalculator employees={employees} />
        </div>
      </div>

      <div className="card-glass p-6 mt-8">
        <EmployeeList onDelete={deleteEmployee} employees={[]} />
      </div>
    </div>
  );
};

export default App;
