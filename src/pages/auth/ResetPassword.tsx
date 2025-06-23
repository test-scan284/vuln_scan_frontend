import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const ResetPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null); // Error state to display errors
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Reset error state

    try {
      // Send the email to the backend API for password reset
      const res = await axios.post('http://127.0.0.1:3000/user/forget-password', { email });
      
      // Handle success (navigate to confirmation page)
      if (res.data.success) {
        navigate('/reset-password/confirmation');
      } else {
        setError(res.data.message || 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email address and we'll send you a link to reset your password"
    >
      {/* Display error if there's any */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          label="Email address"
          type="email"
          required
          autoComplete="email"
          value={email} // Bind the email value
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />

        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
        >
          Send reset link
        </Button>

        <p className="text-center text-sm text-gray-600">
          Remember your password?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
