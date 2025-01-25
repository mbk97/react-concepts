import React, { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
//  Robust Access Control Flow

// ! Role-Based Access Control (RBAC) assigns roles to users and restricts access based on those roles.

type User = {
  username: string;
  role: "admin" | "editor" | "viewer";
};

const AuthContext = createContext<{
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
} | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const auth = useContext(AuthContext);

  if (!auth?.user) {
    <Navigate to={"/login"} replace />;
  }

  if (auth?.user && allowedRoles.includes(auth?.user!.role)) {
    <Navigate to="unathorized" replace />;
  }

  return <>{children}</>;
};

//✅ Pros

// ❌ Cons
