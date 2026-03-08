import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';

type User = { id: string; name: string; email: string; role: 'volunteer' | 'coordinator' | 'admin' };

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // No auth: always an anonymous volunteer
  const defaultUser: User = { id: 'anon', name: 'Guest Volunteer', email: 'guest@eco.com', role: 'volunteer' };
  const [user] = useState<User | null>(defaultUser);
  const [token] = useState<string | null>(null);
  const [loading] = useState(false);

  const login = async () => {};
  const register = async () => {};
  const logout = () => {};

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
