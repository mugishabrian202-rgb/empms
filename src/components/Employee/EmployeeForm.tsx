import React, { useState } from "react";
import type { Employee } from "../../types";
import "./EmployeeForm.css";

interface Props {
  onAdd: (employee: Employee) => void;
}

const validateName = (value: string) => value.trim().length >= 3;
const validateNumber = (n?: number) => typeof n === "number" && !isNaN(n) && n >= 0;

const EmployeeForm: React.FC<Props> = ({ onAdd }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [hourlyRate, setHourlyRate] = useState<number | "">("");
  const [hoursWorked, setHoursWorked] = useState<number | "">("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reset = () => {
    setFirstName("");
    setLastName("");
    setRole("");
    setHourlyRate("");
    setHoursWorked("");
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!validateName(firstName)) newErrors.firstName = "First name must be at least 3 characters.";
    if (!validateName(lastName)) newErrors.lastName = "Last name must be at least 3 characters.";
    if (!role.trim()) newErrors.role = "Role is required.";
    if (!validateNumber(typeof hourlyRate === "number" ? hourlyRate : undefined))
      newErrors.hourlyRate = "Hourly rate must be 0 or greater.";
    if (!validateNumber(typeof hoursWorked === "number" ? hoursWorked : undefined))
      newErrors.hoursWorked = "Hours worked must be 0 or greater.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const id = (crypto as any)?.randomUUID ? (crypto as any).randomUUID() : String(Date.now());

      const employee: Employee = {
        id,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        role: role.trim(),
        hourlyRate: Number(hourlyRate),
        hoursWorked: Number(hoursWorked),
        name: `${firstName.trim()} ${lastName.trim()}`,
      };

      await new Promise((resolve) => setTimeout(resolve, 300)); // simulate submit delay
      onAdd(employee);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form" aria-labelledby="add-employee-title">
      <div className="form-header">
        <h2 id="add-employee-title" className="card-title">
          ➕ Add Employee
        </h2>
        <p className="form-subtitle">Create a new employee record</p>
      </div>

      <div className="form-content">
        <div className="form-section">
          <label htmlFor="firstName" className="label-text">
            First name <span className="required">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            className="input-dark"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="e.g. Jane"
            disabled={isSubmitting}
          />
          {errors.firstName && (
            <div id="firstName-error" className="field-error">
              {errors.firstName}
            </div>
          )}
        </div>

        <div className="form-section">
          <label htmlFor="lastName" className="label-text">
            Last name <span className="required">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            className="input-dark"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="e.g. Doe"
            disabled={isSubmitting}
          />
          {errors.lastName && (
            <div id="lastName-error" className="field-error">
              {errors.lastName}
            </div>
          )}
        </div>

        <div className="form-section">
          <label htmlFor="role" className="label-text">
            Role / Position <span className="required">*</span>
          </label>
          <input
            id="role"
            type="text"
            aria-invalid={!!errors.role}
            aria-describedby={errors.role ? "role-error" : undefined}
            className="input-dark"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Frontend Engineer"
            disabled={isSubmitting}
          />
          {errors.role && (
            <div id="role-error" className="field-error">
              {errors.role}
            </div>
          )}
        </div>

        <div className="form-row-grid">
          <div className="form-section">
            <label htmlFor="hourlyRate" className="label-text">
              Hourly rate ($) <span className="required">*</span>
            </label>
            <input
              id="hourlyRate"
              type="number"
              min={0}
              step="0.01"
              aria-invalid={!!errors.hourlyRate}
              aria-describedby={errors.hourlyRate ? "hourlyRate-error" : undefined}
              className="input-dark"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value ? Number(e.target.value) : "")}
              placeholder="e.g. 25.00"
              disabled={isSubmitting}
            />
            {errors.hourlyRate && (
              <div id="hourlyRate-error" className="field-error">
                {errors.hourlyRate}
              </div>
            )}
          </div>

          <div className="form-section">
            <label htmlFor="hoursWorked" className="label-text">
              Hours worked <span className="required">*</span>
            </label>
            <input
              id="hoursWorked"
              type="number"
              min={0}
              step="0.1"
              aria-invalid={!!errors.hoursWorked}
              aria-describedby={errors.hoursWorked ? "hoursWorked-error" : undefined}
              className="input-dark"
              value={hoursWorked}
              onChange={(e) => setHoursWorked(e.target.value ? Number(e.target.value) : "")}
              placeholder="e.g. 40"
              disabled={isSubmitting}
            />
            {errors.hoursWorked && (
              <div id="hoursWorked-error" className="field-error">
                {errors.hoursWorked}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button
          type="submit"
          className="btn-accent"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Employee"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
