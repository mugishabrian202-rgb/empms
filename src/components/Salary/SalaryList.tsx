import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import type { Salary, Employee } from "../../types";
import SalaryForm from "./SalaryForm";
import "./SalaryList.css";

const SalaryList: React.FC = () => {
    const [salaries, setSalaries] = useState<Salary[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [sortBy, setSortBy] = useState<"name" | "salary">("salary");

    const fetch = async () => {
        try {
            const [sRes, eRes] = await Promise.all([API.get<Salary[]>("/api/salaries"), API.get<Employee[]>("/api/employees")]);
            setSalaries(sRes.data);
            setEmployees(eRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetch(); }, []);

    const del = async (id: number) => {
        if (!confirm("Delete salary record?")) return;
        await API.delete(`/api/salaries/${id}`);
        fetch();
    };

    const salaryData = employees
        .map((emp) => ({
            ...emp,
            totalSalary: (emp.hourlyRate ?? 0) * (emp.hoursWorked ?? 0),
        }))
        .sort((a, b) => {
            if (sortBy === "salary") {
                return b.totalSalary - a.totalSalary;
            }
            const nameA = (a.firstName ?? "").toLowerCase();
            const nameB = (b.firstName ?? "").toLowerCase();
            return nameA.localeCompare(nameB);
        });

    return (
        <div className="py-8">
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1 bg- p-5 rounded-2xl shadow">
                    <SalaryForm employees={employees} onAdded={fetch} />
                </div>
                <div className="md:col-span-2">
                    <div className="salary-list-container">
                        <div className="list-header">
                            <h2 className="card-title">💰 Salary Details</h2>
                            <div className="sort-controls">
                                <label htmlFor="sort-by" className="sort-label">Sort by:</label>
                                <select
                                    id="sort-by"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as "name" | "salary")}
                                    className="sort-select"
                                >
                                    <option value="salary">Salary (High to Low)</option>
                                    <option value="name">Name (A to Z)</option>
                                </select>
                            </div>
                        </div>

                        {employees.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">📭</div>
                                <p className="muted small">No employees to display.</p>
                            </div>
                        ) : (
                            <div className="salary-table-wrapper">
                                <table className="salary-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th>Hourly Rate</th>
                                            <th>Hours Worked</th>
                                            <th>Total Salary</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {salaryData.map((emp) => (
                                            <tr key={emp.id}>
                                                <td className="col-name">
                                                    {emp.firstName || emp.name || "Unnamed"}
                                                </td>
                                                <td className="col-role">{emp.position || emp.role || "—"}</td>
                                                <td className="col-rate">${(emp.hourlyRate ?? 0).toFixed(2)}</td>
                                                <td className="col-hours">{(emp.hoursWorked ?? 0).toFixed(1)}h</td>
                                                <td className="col-salary">
                                                    ${emp.totalSalary.toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryList;
