import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// 🧩 Define TypeScript interfaces
interface Department {
    departmentCode: string;
    departmentName: string;
    grossSalary: number;
}

interface Employee {
    employeeNumber: number;
    firstName: string;
    lastName: string;
    position: string;
    address?: string;
    telephone?: string;
    gender?: string;
    hiredDate?: string;
    Department?: Department;
}

const EmployeeList: React.FC<{ employees?: Employee[]; onDelete?: (id: number) => void }> = ({ employees: propsEmployees = [], onDelete }) => {
    const [employees, setEmployees] = useState<Employee[]>(propsEmployees);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get<Employee[]>("http://localhost:5000/api/employees")
            .then((res) => setEmployees(res.data))
            .catch((err) => console.error("Error fetching employees:", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-6" style={{ background: "transparent" }}>
            <motion.h2
                className="card-title"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                👩‍💼 Employee Directory
            </motion.h2>

            {loading ? (
                <motion.div className="muted small" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Loading employees...
                </motion.div>
            ) : employees.length === 0 ? (
                <div className="muted small" style={{ marginTop: 12 }}>
                    No employees yet — add employees on the left.
                </div>
            ) : (
                <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, scale: 0.98 }, visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.06 } } }}>
                    {employees.map((emp) => (
                        <motion.div
                            key={emp.employeeNumber}
                            className="p-4 card-glass"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                                <div>
                                    <h3 className="card-title">
                                        {emp.firstName} {emp.lastName}
                                    </h3>
                                    <div className="card-sub" style={{ marginTop: 6 }}>
                                        {emp.position} • {emp.Department ? emp.Department.departmentName : "Unassigned"}
                                    </div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <button onClick={() => onDelete && onDelete(emp.employeeNumber)} className="small muted" style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div className="text-sm muted" style={{ marginTop: 10 }}>
                                {emp.telephone && <div>📞 {emp.telephone}</div>}
                                {emp.address && <div>📍 {emp.address}</div>}
                                <div>🗓️ {emp.hiredDate ? new Date(emp.hiredDate).toLocaleDateString() : "N/A"}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default EmployeeList;
