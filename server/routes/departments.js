import express from "express";
import {
    getDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
} from "../controllers/departmentController.js";

const router = express.Router();

router.get("/", getDepartments);
router.post("/", addDepartment);
router.put("/:code", updateDepartment);
router.delete("/:code", deleteDepartment);

export default router;
