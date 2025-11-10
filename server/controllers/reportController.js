import Employee from "../models/Employee.js";
import Department from "../models/Department.js";
import Salary from "../models/Salary.js";

// Generate monthly payroll report
export const getMonthlyReport = async (req, res) => {
    try {
        const { month } = req.query; // example: ?month=January

        const reports = await Salary.findAll({
            where: { month },
            include: [
                {
                    model: Employee,
                    include: [Department],
                },
            ],
        });

        const formatted = reports.map((record) => ({
            employeeNumber: record.Employee.employeeNumber,
            name: `${record.Employee.firstName} ${record.Employee.lastName}`,
            department: record.Employee.Department.departmentName,
            grossSalary: record.grossSalary,
            totalDeduction: record.totalDeduction,
            netSalary: record.netSalary,
            month: record.month,
        }));

        res.json(formatted);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
