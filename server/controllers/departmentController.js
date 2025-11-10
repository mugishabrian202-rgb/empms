import Department from "../models/Department.js";

// Get all departments
export const getDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll();
        res.json(departments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new department
export const addDepartment = async (req, res) => {
    try {
        const department = await Department.create(req.body);
        res.status(201).json(department);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update department info
export const updateDepartment = async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.code);
        if (!department) return res.status(404).json({ message: "Department not found" });

        await department.update(req.body);
        res.json({ message: "Department updated", department });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a department
export const deleteDepartment = async (req, res) => {
    try {
        await Department.destroy({ where: { departmentCode: req.params.code } });
        res.json({ message: "Department deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
