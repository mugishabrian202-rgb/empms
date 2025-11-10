import React from "react";
import DepartmentList from "../components/Department/DepartmentList";

const DepartmentPage: React.FC = () => {
  return (
    <div className="dashboard-container">
      <DepartmentList />
    </div>
  );
};

export default DepartmentPage;