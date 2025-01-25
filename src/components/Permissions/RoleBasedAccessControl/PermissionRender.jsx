import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import Editor from "./Editor";
import { AuthProvider, ProtectedRoute } from "./Permissions";
import LoginPage from "./Login";

const PermissionRender = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor"
          element={
            <ProtectedRoute allowedRoles={["admin", "editor"]}>
              <Editor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default PermissionRender;
