import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import type { Employee } from "../../types";
import { motion } from "framer-motion";
import EmployeeForm from "./EmployeeForm";
import "./EmployeeList.css";

interface Props {
    employees: Employee[];
    onDelete?: (id: string | number) => void;
    loading?: boolean;
}

const EmployeeList: React.FC<Props> = ({  }) => {
    const [employeeData, setEmployeeData] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchEmployees = async () => {
        try {
            setIsLoading(true);
            const res = await API.get<Employee[]>("/api/employees");
            setEmployeeData(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id?: number) => {
        if (id === undefined || id === null) {
            console.warn("No employee id provided for delete");
            return;
        }
        if (!confirm("Delete this employee?")) return;
        await API.delete(`/api/employees/${id}`);
        fetchEmployees();
    };

    return (
        <div className="employee-list-container py-8">
            <div className="flex items-center justify-between mb-6">
                <motion.h1 className="text-2xl font-bold text-gray-800" initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                    Employees
                </motion.h1>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                    <div className="bg- p-5 rounded-2xl shadow">
                        <EmployeeForm onAdd={() => fetchEmployees()} />
                    </div>
                </div>

                <div className="md:col-span-2">
                    {isLoading && (
                        <motion.div className="loading-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="spinner" />
                            <p className="muted small">Loading employees...</p>
                        </motion.div>
                    )}
                    {!isLoading && employeeData.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-icon">📭</div>
                            <p className="muted small">No employees yet — add employees using the form.</p>
                        </div>
                    )}
                    <motion.div
                        className="employee-grid"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.05 },
                            },
                        }}
                    >
                        {employeeData.map((emp) => (
                            <motion.div
                                key={emp.employeeNumber}
                                className="employee-card card-glass bg- p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div>
                                    <h3 className="employee-name text-lg font-semibold text-gray-800">
                                        {emp.firstName || emp.name || `${emp.firstName ?? ""} ${emp.lastName ?? ""}`.trim() || "Unnamed"}
                                    </h3>
                                    <p className="card-sub text-sm text-gray-500">
                                        {emp.position || emp.role || "Unassigned"}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <button
                                        className="btn-delete text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                        onClick={() => handleDelete(emp.employeeNumber)}
                                        aria-label={`Delete ${emp.firstName ?? emp.name ?? "employee"}`}
                                        title="Delete employee"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="card-body">
                                    <div className="info-grid">
                                        {emp.Department && (
                                            <div className="info-item">
                                                <span className="info-label">Department</span>
                                                <span className="info-value">{emp.Department.departmentName}</span>
                                            </div>
                                        )}
                                        {emp.telephone && (
                                            <div className="info-item">
                                                <span className="info-label">📞 Phone</span>
                                                <span className="info-value">{emp.telephone}</span>
                                            </div>
                                        )}
                                        {emp.address && (
                                            <div className="info-item">
                                                <span className="info-label">📍 Address</span>
                                                <span className="info-value">{emp.address}</span>
                                            </div>
                                        )}
                                        {emp.hiredDate && (
                                            <div className="info-item">
                                                <span className="info-label">🗓️ Hired</span>
                                                <span className="info-value">{new Date(emp.hiredDate).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
