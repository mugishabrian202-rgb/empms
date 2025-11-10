import React, { useState } from "react";

interface Props {
  onLogin: (username: string, password: string) => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!username.trim()) newErrors.username = "Username is required.";
    if (!password.trim()) newErrors.password = "Password is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onLogin(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(180deg, var(--bg-1) 0%, var(--bg-2) 100%)",
        padding: "1rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="card-glass p-6"
        style={{ maxWidth: 380, width: "100%" }}
        aria-labelledby="login-title"
      >
        <h1 id="login-title" style={{ marginTop: 0, marginBottom: 24, textAlign: "center" }}>
          Login
        </h1>

        <div className="form-row">
          <label>
            <span className="label-text">Username</span>
            <input
              type="text"
              className="input-dark"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "username-error" : undefined}
            />
          </label>
          {errors.username && (
            <div id="username-error" className="field-error">
              {errors.username}
            </div>
          )}
        </div>

        <div className="form-row" style={{ marginTop: 16 }}>
          <label>
            <span className="label-text">Password</span>
            <input
              type="password"
              className="input-dark"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
          </label>
          {errors.password && (
            <div id="password-error" className="field-error">
              {errors.password}
            </div>
          )}
        </div>

        <button type="submit" className="btn-accent" style={{ width: "100%", marginTop: 24 }}>
          Sign In
        </button>

        <div className="muted small" style={{ textAlign: "center", marginTop: 12 }}>
          Demo: any username + password works.
        </div>
      </form>
    </div>
  );
};

export default LoginPage;