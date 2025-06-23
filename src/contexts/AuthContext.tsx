/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState } from '../types/auth';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    // Initialize state from localStorage
    const user = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return {
      user: user ? JSON.parse(user) : null,
      isAuthenticated,
    };
  });
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));

  useEffect(() => {
    const fetchUser = async () => {
      console.log('Checking tokens:', { accessToken, refreshToken });
      if (accessToken && refreshToken) {
        try {
          console.log('Sending refresh request with refreshToken:', refreshToken);
          const response = await fetch('http://127.0.0.1:3000/user/refresh', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
          });
          console.log('Refresh response status:', response.status);
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Refresh error:', errorData);
            throw new Error(errorData.message || errorData.errors?.join(', ') || 'Failed to refresh token');
          }
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await response.json();
          const decoded: JwtPayload = jwtDecode(newAccessToken);
          console.log('Refresh successful, userId:', decoded.userId);
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
        } catch (error) {
          console.error('Fetch user error:', error);
          setState({ user: null, isAuthenticated: false });
          setAccessToken(null);
          setRefreshToken(null);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          localStorage.removeItem('isAuthenticated');
        }
      } else {
        console.log('No tokens found, user not authenticated');
      }
    };
    fetchUser();
  }, []); // Remove dependencies to run only once on mount

  const login = async (email: string, password: string) => {
    try {
      console.log('Sending login request with:', { email, password });
      const response = await fetch('http://127.0.0.1:3000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.errors?.join(', ') || 'Invalid email or password');
      }
      const { accessToken, refreshToken } = await response.json();
      const decoded: JwtPayload = jwtDecode(accessToken);
      console.log('Login successful, userId:', decoded.userId);
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
    } catch (err) {
      throw new Error((err as Error).message || 'Invalid credentials');
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      console.log('Sending signup request with:', { email, password });
      const response = await fetch('http://127.0.0.1:3000/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.errors?.join(', ') || 'Signup failed');
      }
      const { accessToken, refreshToken } = await response.json();
      const decoded: JwtPayload = jwtDecode(accessToken);
      console.log('Signup successful, userId:', decoded.userId);
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
    } catch (err) {
      throw new Error((err as Error).message || 'Signup failed');
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
    <AuthContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
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