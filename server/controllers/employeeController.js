import Employee from "../models/Employee.js";
import Department from "../models/Department.js";

export const getEmployees = async (req, res) => {
    const employees = await Employee.findAll({ include: Department });
    res.json(employees);
};

export const addEmployee = async (req, res) => {
    try {
        const emp = await Employee.create(req.body);
        res.status(201).json(emp);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteEmployee = async (req, res) => {
    await Employee.destroy({ where: { employeeNumber: req.params.id } });
    res.json({ message: "Employee deleted" });
};
