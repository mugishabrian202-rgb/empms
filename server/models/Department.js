import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Department = sequelize.define("Department", {
    departmentCode: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    departmentName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    grossSalary: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

export default Department;
