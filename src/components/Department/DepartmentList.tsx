import React, { useEffect, useState } from "react";
import { api } from "../../utils/api";
import "./DepartmentList.css";

interface Department {
  departmentCode: string;
  departmentName: string;
  grossSalary?: number;
}

const DepartmentList: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    api
      .get<Department[]>("/api/departments")
      .then((res) => {
        if (!cancelled) setDepartments(res.data || []);
      })
      .catch((err) => {
        console.error("Failed fetching departments", err);
        if (!cancelled) setError("Failed to load departments");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="department-list-container">
      <div className="list-header">
        <h2 className="card-title">🏢 Departments</h2>
        <p className="list-subtitle">{departments.length} department{departments.length !== 1 ? "s" : ""}</p>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p className="muted small">Loading departments...</p>
        </div>
      ) : departments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p className="muted small">No departments found.</p>
        </div>
      ) : (
        <div className="department-grid">
          {departments.map((dept) => (
            <div key={dept.departmentCode} className="department-card card-glass">
              <h3 className="dept-name">{dept.departmentName}</h3>
              <p className="dept-code">{dept.departmentCode}</p>
              {dept.grossSalary && (
                <div className="dept-salary">
                  <span className="salary-label">Gross Salary</span>
                  <span className="salary-value">${dept.grossSalary.toFixed(2)}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentList;
