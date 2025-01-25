import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Permissions";

const LoginPage = () => {
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: "admin" | "editor" | "viewer") => {
    login({ username: "TestUser", role });
    navigate("/admin"); // Redirect after login
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => handleLogin("admin")}>Login as Admin</button>
      <button onClick={() => handleLogin("editor")}>Login as Editor</button>
      <button onClick={() => handleLogin("viewer")}>Login as Viewer</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default LoginPage;
