import React, { createContext, useContext, useState } from "react";

//  Robust Access Control Flow

// !Role-Based Access Control (RBAC) assigns roles to users and restricts access based on those roles.

type User = {
  username: string;
  role: "admin" | "editor" | "viewer";
};

const AuthContext = createContext<{
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
} | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const data = useContext(AuthContext);
  console.log(data);

  console.log(data?.user);
};

//✅ Pros

// ❌ Cons
