import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Department from "./Department.js";

const Employee = sequelize.define("Employee", {
    employeeNumber: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    position: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING },
    telephone: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING },
    hiredDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Department.hasMany(Employee, { foreignKey: "departmentCode" });
Employee.belongsTo(Department, { foreignKey: "departmentCode" });

export default Employee;
