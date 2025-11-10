import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Employee from "./Employee.js";

const Salary = sequelize.define("Salary", {
    salaryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    grossSalary: { type: DataTypes.FLOAT, allowNull: false },
    totalDeduction: { type: DataTypes.FLOAT, allowNull: false },
    netSalary: { type: DataTypes.FLOAT, allowNull: false },
    month: { type: DataTypes.STRING, allowNull: false },
});

Employee.hasMany(Salary, { foreignKey: "employeeNumber" });
Salary.belongsTo(Employee, { foreignKey: "employeeNumber" });

export default Salary;
