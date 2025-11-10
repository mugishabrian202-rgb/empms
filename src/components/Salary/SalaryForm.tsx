import React, { useState } from "react";
import type { Employee } from "../../types";
import API from "../../utils/api";

interface Props {
    employees: Employee[];
    onAdded?: () => void;
}

const SalaryForm: React.FC<Props> = ({ employees, onAdded }) => {
    const [employeeNumber, setEmployeeNumber] = useState<number | "">("");
    const [grossSalary, setGrossSalary] = useState<number | "">("");
    const [totalDeduction, setTotalDeduction] = useState<number | "">("");
    const [month, setMonth] = useState<string>("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!employeeNumber || !grossSalary || !month) {
                alert("Fill required fields");
                return;
            }
            await API.post("/api/salaries", {
                employeeNumber: Number(employeeNumber),
                grossSalary: Number(grossSalary),
                totalDeduction: Number(totalDeduction || 0),
                month
            });
            setEmployeeNumber(""); setGrossSalary(""); setTotalDeduction(""); setMonth("");
            onAdded?.();
        } catch (err) {
            console.error(err); alert("Error adding salary");
        }
    };

    return (
        <form onSubmit={submit} className="space-y-3">
            <h3 className="text-lg font-semibold">Add Salary</h3>
            <select className="w-full border rounded-lg p-2" value={employeeNumber} onChange={(e) => setEmployeeNumber(Number(e.target.value) || "")}>
                <option value="">Select employee</option>
                {employees.map(emp => <option key={emp.employeeNumber} value={emp.employeeNumber}>{emp.firstName} {emp.lastName}</option>)}
            </select>
            <input type="number" placeholder="Gross salary" value={grossSalary} onChange={e => setGrossSalary(e.target.value ? Number(e.target.value) : "")} className="w-full border rounded-lg p-2" required />
            <input type="number" placeholder="Total deduction" value={totalDeduction} onChange={e => setTotalDeduction(e.target.value ? Number(e.target.value) : "")} className="w-full border rounded-lg p-2" />
            <input placeholder="Month (e.g. November)" value={month} onChange={e => setMonth(e.target.value)} className="w-full border rounded-lg p-2" required />
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">Add Salary</button>
        </form>
    );
};

export default SalaryForm;
