import React, { createContext, useContext, useState } from 'react';

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
  const demoUsers: Record<string, { password: string; user: User }> = {
    'ava@eco.com': { password: 'password123', user: { id: 'u1', name: 'Ava', email: 'ava@eco.com', role: 'volunteer' } },
    'bob@eco.com': { password: 'password123', user: { id: 'u2', name: 'Bob', email: 'bob@eco.com', role: 'coordinator' } },
    'jim@eco.com': { password: 'password123', user: { id: 'u3', name: 'Jim', email: 'jim@eco.com', role: 'admin' } },
  };

  const [user, setUser] = useState<User | null>(null);
  const [token] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const entry = demoUsers[email.toLowerCase()];
    if (!entry || entry.password !== password) {
      setLoading(false);
      throw new Error('Invalid credentials. Demo users: ava@eco.com, bob@eco.com, jim@eco.com (password123).');
    }
    setUser(entry.user);
    setLoading(false);
  };
  const register = async () => {
    throw new Error('Registration disabled in demo');
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('demoUser');
  };

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
