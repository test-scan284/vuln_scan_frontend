import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export const Signup: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        'http://127.0.0.1:3000/user/signup',
        { name, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (res.data.success) {
        navigate('/login');
      } else {
        setError(res.data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'An error occurred. Please try again later.');
      } else {
        setError('An error occurred. Please try again later.');
      }
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

      {/* Background glow elements */}
      <div className="absolute -top-32 -left-20 w-80 h-80 bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>

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

        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Create a new opportunity
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Scan, Secure, Succeed: Protecting the Future!
        </p>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            label="Confirm password"
            type="password"
            required
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Create account
          </Button>

          <p className="text-center text-sm text-gray-400">
            Already with us?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-400">
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};
