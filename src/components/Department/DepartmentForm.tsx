import React, { useState } from "react";
import API from "../../utils/api";

interface Props { onAdded?: () => void }

const DepartmentForm: React.FC<Props> = ({ onAdded }) => {
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [gross, setGross] = useState<number | "">("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await API.post("/api/departments", { departmentCode: code, departmentName: name, grossSalary: Number(gross || 0) });
            setCode(""); setName(""); setGross("");
            onAdded?.();
        } catch (err) { alert("Error"); console.error(err); }
    };

    return (
        <form onSubmit={submit} className="space-y-3">
            <h3 className="text-lg font-semibold">Add Department</h3>
            <input value={code} onChange={(e) => setCode(e.target.value)} className="w-full border rounded-lg p-2" placeholder="Code (e.g. HR01)" required />
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg p-2" placeholder="Department name" required />
            <input type="number" value={gross} onChange={(e) => setGross(e.target.value ? Number(e.target.value) : "")} className="w-full border rounded-lg p-2" placeholder="Gross salary (optional)" />
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">Create</button>
        </form>
    );
};

export default DepartmentForm;
