import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role_id: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for token and load user profile (placeholder)
    const token = localStorage.getItem('access_token');
    if (token) {
      // Simulate loading user profile
      setUser({
        id: '123',
        email: 'admin@metricmind.com',
        first_name: 'Admin',
        last_name: 'User',
        role_id: 'admin'
      });
    }
    setIsLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('access_token', token);
    setUser({
      id: '123',
      email: 'admin@metricmind.com',
      first_name: 'Admin',
      last_name: 'User',
      role_id: 'admin'
    });
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
