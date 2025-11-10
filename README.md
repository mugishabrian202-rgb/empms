# Employee Payroll Management System (EPMS)

A **web-based payroll management system** built with
**React (frontend)** + **Node.js/Express (backend)** + **MySQL (database)**
using the **MVC architecture** pattern.

---

## Quick Start

### Requirements

* Node.js (v18+)
* MySQL Server
* npm or yarn

---

### 1. Setup Database

Create a new MySQL database:

```sql
CREATE DATABASE EPMS;
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```
DB_NAME=EPMS
DB_USER=root
DB_PASS=yourpassword
DB_HOST=localhost
PORT=5000
```

Run the backend:

```bash
node server.js
```

 The backend will start on:
**[http://localhost:5000](http://localhost:5000)**

---

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

 The frontend will start on:
**[http://localhost:5173](http://localhost:5173)** (Vite) or **[http://localhost:3000](http://localhost:3000)** (CRA)

---

## MVC Structure

| Layer          | Folder                | Purpose                                    |
| -------------- | --------------------- | ------------------------------------------ |
| **Model**      | `/server/models`      | Defines database schema using Sequelize    |
| **View**       | `/client/src`         | React + Tailwind frontend                  |
| **Controller** | `/server/controllers` | Handles API logic for CRUD and reports     |
| **Routes**     | `/server/routes`      | Defines API endpoints                      |
| **Database**   | MySQL                 | Stores Employee, Department, Salary tables |

---

## Project Structure

```
EPMS/
├── client/                  # React frontend
│   └── src/
│       ├── components/
│       │   └── EmployeeList.tsx
│       ├── App.tsx
│       └── ...
├── server/                  # Express backend
│   ├── config/db.js
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   └── server.js
└── README.md
```

---

## API Documentation

### Employees

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| GET    | `/api/employees`     | Fetch all employees |
| POST   | `/api/employees`     | Add new employee    |
| DELETE | `/api/employees/:id` | Delete employee     |

**Example Request (POST)**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "position": "Accountant",
  "departmentCode": "FIN01"
}
```

---

### Departments

| Method | Endpoint                 | Description           |
| ------ | ------------------------ | --------------------- |
| GET    | `/api/departments`       | Fetch all departments |
| POST   | `/api/departments`       | Add new department    |
| PUT    | `/api/departments/:code` | Update department     |
| DELETE | `/api/departments/:code` | Delete department     |

**Example Request (POST)**

```json
{
  "departmentCode": "FIN01",
  "departmentName": "Finance",
  "grossSalary": 5000
}
```

---

### Salaries

| Method | Endpoint            | Description              |
| ------ | ------------------- | ------------------------ |
| GET    | `/api/salaries`     | Fetch all salary records |
| POST   | `/api/salaries`     | Add new salary record    |
| DELETE | `/api/salaries/:id` | Delete salary record     |

**Example Request (POST)**

```json
{
  "employeeNumber": 1,
  "grossSalary": 5000,
  "totalDeduction": 500,
  "month": "November"
}
```

---

### Reports

| Method | Endpoint                      | Description                             |
| ------ | ----------------------------- | --------------------------------------- |
| GET    | `/api/reports?month=November` | Get payroll report for a specific month |

**Example Response**

```json
[
  {
    "employeeNumber": 1,
    "name": "John Doe",
    "department": "Finance",
    "grossSalary": 5000,
    "totalDeduction": 500,
    "netSalary": 4500,
    "month": "November"
  }
]
```

---

## Salary Formula

```
Net Salary = Gross Salary - Total Deduction
```

---

## Features Summary

* Add / Delete Employees
* Manage Departments
* Calculate Salaries (auto net salary)
* Generate Monthly Reports
* Simple, Local MySQL Database
* React + Tailwind UI
* Node.js + Express API (MVC Pattern)

---

## Kevin was Here 🤫
