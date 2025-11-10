import React, { useState } from "react";
import type { Employee } from "../App";

interface Props {
    onAdd: (employee: Employee) => void;
}

const EmployeeForm: React.FC<Props> = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [hourlyRate, setHourlyRate] = useState<number | "">("");
    const [hoursWorked, setHoursWorked] = useState<number | "">("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !role || !hourlyRate || !hoursWorked) return alert("Please fill all fields");

        const newEmployee: Employee = {
            id: Date.now(),
            name,
            role,
            hourlyRate: Number(hourlyRate),
            hoursWorked: Number(hoursWorked),
        };

        onAdd(newEmployee);
        setName("");
        setRole("");
        setHourlyRate("");
        setHoursWorked("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="card-title">Add Employee</h2>
            <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-dark"
            />
            <input
                type="text"
                placeholder="Role / Position"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-dark"
            />
            <div className="grid grid-cols-2 gap-3">
                <input
                    type="number"
                    placeholder="Hourly Rate ($)"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value ? Number(e.target.value) : "")}
                    className="input-dark"
                />
                <input
                    type="number"
                    placeholder="Hours Worked"
                    value={hoursWorked}
                    onChange={(e) => setHoursWorked(e.target.value ? Number(e.target.value) : "")}
                    className="input-dark"
                />
            </div>
            <div className="flex justify-end">
                <button type="submit" className="btn-accent">Add Employee</button>
            </div>
        </form>
    );
};

export default EmployeeForm;
