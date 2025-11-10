import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";

// Import routes
import employeeRoutes from "./routes/employees.js";
import departmentRoutes from "./routes/departments.js";
import salaryRoutes from "./routes/salaries.js";
import reportRoutes from "./routes/reports.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API endpoints
app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/salaries", salaryRoutes);
app.use("/api/reports", reportRoutes);

sequelize.sync().then(() => {
    console.log("✅ Database connected & models synced.");
    app.listen(process.env.PORT || 5000, () =>
        console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
});
