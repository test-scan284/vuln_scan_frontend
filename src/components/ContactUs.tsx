import React, { useState } from 'react';
import { Input } from '../components/ui/Input';
import { sendContactForm } from '../services/api';
import toast from 'react-hot-toast';
import { Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import styled from 'styled-components';

const ContactUs = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      try {
        await sendContactForm(formData);
        toast.success('Message sent successfully! Check your email for confirmation.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (error) {
        toast.error('Failed to send message. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  return (
    <StyledWrapper>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <Input
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
          </div>
          <div className="form-group">
            <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
          </div>
          <div className="form-group">
            <Input
                            label="Subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                          />
          </div>
          <div className="form-group">
            <label htmlFor="textarea">How Can We Help You?</label>
            <textarea
                name="message"
                id="message"
                rows={10}
                cols={50}
                required
                value={formData.message}
                onChange={handleChange}
                />
          </div>
          <Button
                type="submit"
                className="form-submit-btn"
                isLoading={isSubmitting}
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
        </form>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form-container {
    width: 100%;
    max-width: 500px;
    background: #111;
    border: 2px solid transparent;
    padding: 32px 24px;
    color: white;
    font-family: inherit;
    border-radius: 16px;
    box-sizing: border-box;
    position: relative;
    z-index: 1;

    background-image: linear-gradient(#111, #111), 
      linear-gradient(135deg, #e81cff 0%, #40c9ff 100%);
    background-origin: border-box;
    background-clip: padding-box, border-box;

    box-shadow: 0 0 30px rgba(232, 28, 255, 0.4),
                0 0 60px rgba(64, 201, 255, 0.2);
    transition: all 0.3s ease-in-out;
  }

  .form-container:hover {
    box-shadow: 0 0 50px rgba(232, 28, 255, 0.6),
                0 0 80px rgba(64, 201, 255, 0.4);
    transform: scale(1.01);
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-group label {
    color: #a0a0a0;
    font-size: 13px;
    font-weight: 600;
  }

  .form-group input,
  .form-group textarea {
    background-color: #1e1e1e;
    border: 1px solid #414141;
    padding: 12px 16px;
    border-radius: 8px;
    color: #fff;
    font-family: inherit;
    font-size: 14px;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #e81cff;
    box-shadow: 0 0 8px #e81cff;
  }

  .form-submit-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: transparent;
    color: #fff;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 600;
    border: 1px solid #e81cff;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px #e81cff;
  }

  .form-submit-btn:hover {
    background: #e81cff;
    color: #000;
    transform: translateY(-2px);
    box-shadow: 0 0 15px #e81cff, 0 0 30px #40c9ff;
  }
`;

export default ContactUs;
