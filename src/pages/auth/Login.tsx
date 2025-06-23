/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

export const Login: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // تنظيف البيانات
    const cleanedEmail = email.trim();
    const cleanedPassword = password.trim();

    // فحص إن القيم مش فاضية
    if (!cleanedEmail || !cleanedPassword) {
      setError('Email and password are required');
      setIsLoading(false);
      return;
    }

    console.log('Login attempt with:', { email: cleanedEmail, password: cleanedPassword });

    try {
      // استخدام login من AuthContext
      await login(cleanedEmail, cleanedPassword);
      navigate('/home');
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Gradient side lines */}
      <div className="pointer-events-none">
        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-green-400 via-blue-500 to-pink-500 animate-pulse z-10"></div>
        <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b to-green-400 via-blue-500 from-pink-500 animate-pulse z-10"></div>
      </div>

      {/* Background circles for aesthetic */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      {/* Login Card */}
      <motion.div 
        className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md z-20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <Shield className="h-10 w-10 text-blue-500" />
          <h1 className="ml-2 text-3xl font-bold text-white">VulnScan</h1>
        </div>

        {/* Welcome text */}
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Welcome back!
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Secure your applications with confidence.
        </p>

        {/* Error message */}
        {error && (
          <div className="text-red-500 text-center mb-4" role="alert">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <Input
            label="Email address"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Remember me / Forgot password */}
          <div className="flex items-center justify-between text-gray-300">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm">
                Remember me
              </label>
            </div>
            <Link to="/reset-password" className="text-sm hover:text-blue-400">
              Forgot password?
            </Link>
          </div>

          {/* Submit button */}
          <Button type="submit" className="w-full" isLoading={isLoading} disabled={isLoading}>
            Sign in
          </Button>
        </form>

        {/* Signup link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          New here?{' '}
          <Link to="/signup" className="text-blue-500 hover:text-blue-400">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};