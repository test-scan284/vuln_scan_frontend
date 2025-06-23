import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Button } from '../../components/ui/Button';
import { CheckCircle } from 'lucide-react';
import axios from 'axios';

export const ResetPasswordConfirmation: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [error, setError] = useState<string | null>(null); // To handle error messages
  const [email] = useState(''); // Store the email (you can also get this from a prop or route params)

  // Function to resend the reset password email
  const handleResendEmail = async () => {
    setIsLoading(true);
    setError(null); // Reset error

    try {
      const response = await axios.post(
        'http://127.0.0.1:3000/user/reset-password', // Backend API endpoint
        { email }, // Send email to the backend
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.success) {
        alert('Password reset email has been resent.');
      } else {
        setError('Failed to resend the password reset email.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Check your email">
      <div className="flex flex-col items-center space-y-6">
        <CheckCircle className="h-12 w-12 text-green-500" />
        <div className="text-center space-y-2">
          <p className="text-gray-700">
            We have sent a password reset link to your email address.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <input
              type="checkbox"
              id="confirm-email"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="confirm-email">
              I've received the reset password email
            </label>
          </div>
        </div>

        {/* Displaying error message if any */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="space-y-4 w-full">
          <Button
            type="button"
            className="w-full"
            onClick={handleResendEmail}
            isLoading={isLoading}
          >
            Resend email
          </Button>

          <Link to="/login">
            <Button
              type="button"
              variant="outline"
              className="w-full"
            >
              Back to sign in
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-600 text-center">
          Didn't receive the email? Check your spam folder or{' '}
          <button
            className="text-blue-600 hover:text-blue-500"
            onClick={() => window.location.reload()}
          >
            try another email address
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};
