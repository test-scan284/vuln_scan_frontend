/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState } from '../types/auth';
import {jwtDecode} from 'jwt-decode'; // صححت الاستيراد هنا

interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    const user = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return {
      user: user ? JSON.parse(user) : null,
      isAuthenticated,
    };
  });
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      if (accessToken && refreshToken) {
        try {
          const response = await fetch('http://127.0.0.1:3000/user/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to refresh token');
          }

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await response.json();
          const decoded: JwtPayload = jwtDecode(newAccessToken);

          setState({
            user: { id: decoded.userId },
            isAuthenticated: true,
          });
          setAccessToken(newAccessToken);
          setRefreshToken(newRefreshToken);

          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          localStorage.setItem('user', JSON.stringify({ id: decoded.userId }));
          localStorage.setItem('isAuthenticated', 'true');
          setLoading(false);
        } catch (err: any) {
          console.error('Fetch user error:', err);
          setState({ user: null, isAuthenticated: false });
          setAccessToken(null);
          setRefreshToken(null);

          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          localStorage.removeItem('isAuthenticated');

          setError(err.message || 'Authentication failed');
          setLoading(false);
        }
      } else {
        // لا توكنز -> مستخدم غير مصدق
        setState({ user: null, isAuthenticated: false });
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://127.0.0.1:3000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid email or password');
      }

      const { accessToken, refreshToken } = await response.json();
      const decoded: JwtPayload = jwtDecode(accessToken);

      setState({
        user: { id: decoded.userId },
        isAuthenticated: true,
      });
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify({ id: decoded.userId }));
      localStorage.setItem('isAuthenticated', 'true');

      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Invalid credentials');
      throw err;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://127.0.0.1:3000/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const { accessToken, refreshToken } = await response.json();
      const decoded: JwtPayload = jwtDecode(accessToken);

      setState({
        user: { id: decoded.userId },
        isAuthenticated: true,
      });
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify({ id: decoded.userId }));
      localStorage.setItem('isAuthenticated', 'true');

      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Signup failed');
      throw err;
    }
  };

  const logout = () => {
    setState({ user: null, isAuthenticated: false });
    setAccessToken(null);
    setRefreshToken(null);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout, loading, error }}>
      {loading ? (
        <div style={{ color: 'white', padding: 20, textAlign: 'center' }}>Loading...</div>
      ) : error ? (
        <div style={{ color: 'red', padding: 20, textAlign: 'center' }}>Error: {error}</div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
