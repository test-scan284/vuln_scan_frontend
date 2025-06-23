const API_URL = 'http://localhost:3000/api';

export const sendContactForm = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const response = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
};