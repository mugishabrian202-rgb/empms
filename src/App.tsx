import React, { useEffect, useState, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import DepartmentPage from "./pages/DepartmentPage";
import SalaryPage from "./pages/SalaryPage";
import ReportsPage from "./pages/ReportsPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import "./App.css";
import "./index.css";
import type { Employee } from "./types";
import { api } from "./utils/api";

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dark, setDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem("theme") !== "light";
    } catch {
      return true;
    }
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem("userToken");
    } catch {
      return false;
    }
  });

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  // Fetch employees on mount or when logged in
  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    api
      .get<Employee[]>("/api/employees")
      .then((res) => {
        if (cancelled) return;
        const list = (res.data || []).map((e) => ({
          ...e,
          id: String((e as any).id ?? (e as any).employeeNumber ?? Date.now()),
        }));
        setEmployees(list);
      })
      .catch((err) => {
        console.error("Failed fetching employees", err);
        if (!cancelled) setError("Failed to load employees. Check API connection.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn]);

  const handleLogin = (username: string, password: string) => {
    if (username && password) {
      try {
        localStorage.setItem("userToken", JSON.stringify({ username, timestamp: Date.now() }));
        setIsLoggedIn(true);
      } catch {}
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("userToken");
    } catch {}
    setIsLoggedIn(false);
    setEmployees([]);
  };

  const addEmployee = useCallback(async (emp: Employee) => {
    setEmployees((prev) => [emp, ...prev]);
    try {
      await api.post("/api/employees", emp);
    } catch (err) {
      console.error("Failed to save employee", err);
      setEmployees((prev) => prev.filter((e) => e.id !== emp.id));
      setError("Failed to save employee");
    }
  }, []);

  const deleteEmployee = useCallback(
    async (id: string | number) => {
      const sid = String(id);
      const prev = employees;
      setEmployees((p) => p.filter((e) => e.id !== sid));
      try {
        await api.delete(`/api/employees/${sid}`);
      } catch (err) {
        console.error("Failed to delete employee", err);
        setEmployees(prev);
        setError("Failed to delete employee");
      }
    },
    [employees]
  );

  // If not logged in, show login page
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Main routed app
  return (
    <div className="app-layout">
      <NavBar onLogout={handleLogout} dark={dark} onThemeToggle={() => setDark((d) => !d)} />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/employees" replace />}
          />
          <Route
            path="/employees"
            element={
              <EmployeeDashboard
                employees={employees}
                loading={loading}
                error={error}
                onAdd={addEmployee}
                onDelete={deleteEmployee}
                onErrorDismiss={() => setError(null)}
              />
            }
          />
          <Route path="/departments" element={<DepartmentPage />} />
          <Route path="/salaries" element={<SalaryPage employees={employees} />} />
          <Route path="/reports" element={<ReportsPage employees={employees} />} />
          <Route path="*" element={<Navigate to="/employees" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
