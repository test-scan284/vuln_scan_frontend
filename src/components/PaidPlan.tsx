import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PaidPlan = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return;
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .substring(0, 5);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    if (name === 'cvv') {
      if (value.length > 3) return;
      setFormData(prev => ({ ...prev, [name]: value.replace(/\D/g, '') }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!selectedPayment) {
      alert("Please select a payment method");
      return false;
    }

    if (!formData.name.trim()) {
      alert("Please enter cardholder name");
      return false;
    }

    const cleanCardNumber = formData.cardNumber.replace(/\s/g, '');
    if (!cleanCardNumber || cleanCardNumber.length !== 16 || !/^\d+$/.test(cleanCardNumber)) {
      alert("Please enter a valid 16-digit card number");
      return false;
    }

    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      alert("Please enter expiry date in MM/YY format");
      return false;
    }

    const [month, year] = formData.expiryDate.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    if (parseInt(year) < currentYear || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      alert("This card appears to be expired");
      return false;
    }

    if (!formData.cvv || formData.cvv.length !== 3 || !/^\d+$/.test(formData.cvv)) {
      alert("Please enter a valid 3-digit CVV");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);
    
    try {
      // Simulate payment processing (replace with actual payment API call)
      await processPayment();
      navigate('/Paid_Page');
    } catch (error) {
      alert(`Payment failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const processPayment = () => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve();
        } else {
          reject(new Error("Payment processor declined transaction"));
        }
      }, 1500);
    });
  };

  return (
    <StyledWrapper>
      <div className="modal m-auto" style={{width:"fit-content"}}>
        <form className="form" onSubmit={handleSubmit}>
          <div className="payment--options">
            <button 
              name="paypal" 
              type="button"
              className={selectedPayment === 'paypal' ? 'selected' : ''}
              onClick={() => setSelectedPayment('paypal')}
            >
              <img 
                src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
                alt="PayPal" 
                width="80"
                height="24"
              />
            </button>
            <button 
              name="apple-pay" 
              type="button"
              className={selectedPayment === 'apple-pay' ? 'selected' : ''}
              onClick={() => setSelectedPayment('apple-pay')}
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/1200px-Apple_Pay_logo.svg.png" 
                alt="Apple Pay" 
                width="60"
                height="24"
              />
            </button>
            <button 
              name="google-pay" 
              type="button"
              className={selectedPayment === 'google-pay' ? 'selected' : ''}
              onClick={() => setSelectedPayment('google-pay')}
            >
              <img 
                src="https://www.gstatic.com/instantbuy/svg/dark_gpay.svg" 
                alt="Google Pay" 
                width="80"
                height="24"
              />
            </button>
          </div>
          
          <div className="separator">
            <hr className="line" />
            <p>or pay with credit card</p>
            <hr className="line" />
          </div>
          
          <div className="credit-card-info--form">
            <div className="input_container">
              <label htmlFor="name_field" className="input_label">Cardholder Name</label>
              <input 
                id="name_field" 
                className="input_field" 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name" 
                required
              />
            </div>
            
            <div className="input_container">
              <label htmlFor="card_number_field" className="input_label">Card Number</label>
              <input 
                id="card_number_field" 
                className="input_field" 
                type="text" 
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456" 
                required
              />
            </div>
            
            <div className="input_container">
              <label htmlFor="expiry_date_field" className="input_label">Expiry Date / CVV</label>
              <div className="split">
                <input 
                  id="expiry_date_field" 
                  className="input_field" 
                  type="text" 
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY" 
                  required
                />
                <input 
                  id="cvv_field" 
                  className="input_field" 
                  type="text" 
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="CVV" 
                  required
                />
              </div>
            </div>
          </div>
          
          <button className="purchase--btn" type="submit" disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Complete Payment'}
          </button>
        </form>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  background-color: #121212;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal {
    width: fit-content;
    height: fit-content;
    background: #1E1E1E;
    box-shadow: 0px 187px 75px rgba(0, 0, 0, 0.1), 
                0px 105px 63px rgba(0, 0, 0, 0.15), 
                0px 47px 47px rgba(0, 0, 0, 0.25), 
                0px 12px 26px rgba(0, 0, 0, 0.3), 
                0px 0px 0px rgba(0, 0, 0, 0.3);
    border-radius: 16px;
    max-width: 450px;
    padding: 25px;
    border: 1px solid #333;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .payment--options {
    width: calc(100% - 40px);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    padding: 10px;
    margin: 0 auto;
  }

  .payment--options button {
    height: 55px;
    background: #2D2D2D;
    border-radius: 11px;
    padding: 0;
    border: 0;
    outline: none;
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #444;
  }

  .payment--options button.selected {
    background: #3A3A3A;
    box-shadow: 0 0 0 2px #646cff;
    border-color: #646cff;
  }

  .payment--options button:hover {
    background: #3A3A3A;
  }

  .payment--options button img {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
    filter: brightness(0.9);
  }

  .separator {
    width: calc(100% - 20px);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 10px;
    color: #A0A0A0;
    margin: 0 auto;
    align-items: center;
  }

  .separator > p {
    word-break: keep-all;
    display: block;
    text-align: center;
    font-weight: 600;
    font-size: 11px;
    margin: 0;
    padding: 0 10px;
  }

  .separator .line {
    display: inline-block;
    width: 100%;
    height: 1px;
    border: 0;
    background-color: #444;
  }

  .credit-card-info--form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .input_container {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .split {
    display: grid;
    grid-template-columns: 4fr 2fr;
    gap: 15px;
  }

  .input_label {
    font-size: 12px;
    color: #CCCCCC;
    font-weight: 600;
  }

  .input_field {
    width: 100%;
    height: 40px;
    padding: 0 16px;
    border-radius: 9px;
    outline: none;
    background-color: #2D2D2D;
    border: 1px solid #444;
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
    font-family: inherit;
    color: #FFFFFF;
  }

  .input_field::placeholder {
    color: #777;
  }

  .input_field:focus {
    border: 1px solid #646cff;
    box-shadow: 0px 0px 0px 2px rgba(100, 108, 255, 0.3);
    background-color: #333;
  }

  .purchase--btn {
    height: 55px;
    border-radius: 11px;
    border: 0;
    outline: none;
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    background: linear-gradient(180deg, #646cff 0%, #535bf2 100%);
    box-shadow: 0px 0px 0px 0px #FFFFFF, 0px 0px 0px 0px #000000;
    transition: all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1);
    width: 100%;
    cursor: pointer;
    margin-top: 10px;
  }

  .purchase--btn:hover {
    background: linear-gradient(180deg, #535bf2 0%, #4348b8 100%);
    box-shadow: 0px 0px 0px 2px rgba(255, 255, 255, 0.1);
  }

  .purchase--btn:disabled {
    background: #555;
    cursor: not-allowed;
    opacity: 0.7;
  }

  /* Reset input number styles */
  .input_field::-webkit-outer-spin-button,
  .input_field::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .input_field[type=number] {
    -moz-appearance: textfield;
  }
`;

export default PaidPlan;