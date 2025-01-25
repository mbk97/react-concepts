//! PBAC grants access based on specific permissions rather than roles.
import React from "react";
import { Navigate } from "react-router-dom";

const permissions = {
  admin: ["view_dashboard", "edit_user", "delete_post"],
  editor: ["view_dashboard", "edit_user"],
  viewer: ["view_dashboard"],
};

export const canAccess = (role: string, action: string) => {
  return permissions[role]?.includes(action) ?? false;
};

const Dashboard = () => {
  const user = {
    name: "mubarak",
    role: "admin",
  };

  if (!user || !canAccess(user.role, "view_dashboard")) {
    return <Navigate to="/unauthorized" />;
  }

  return <h1>Welcome to the Dashboard</h1>;
};
