import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";

// Get all salary records
export const getSalaries = async (req, res) => {
    try {
        const salaries = await Salary.findAll({ include: Employee });
        res.json(salaries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new salary record
export const addSalary = async (req, res) => {
    try {
        const { employeeNumber, grossSalary, totalDeduction, month } = req.body;
        const netSalary = grossSalary - totalDeduction;

        const salary = await Salary.create({
            employeeNumber,
            grossSalary,
            totalDeduction,
            netSalary,
            month,
        });

        res.status(201).json(salary);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a salary record
export const deleteSalary = async (req, res) => {
    try {
        await Salary.destroy({ where: { salaryID: req.params.id } });
        res.json({ message: "Salary record deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
