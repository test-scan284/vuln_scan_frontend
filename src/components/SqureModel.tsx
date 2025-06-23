import React from 'react';
import styled from 'styled-components';

const SqureModel = () => {
  return (
    <StyledWrapper>
      <div className="content-container">
        <h1>Welcome to VulnScan</h1>
        <p>Explore powerful security analysis tools for your applications</p>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  min-height: 60vh; /* تحديد الحد الأدنى للارتفاع ليأخذ مساحة أقل */
  display: flex;
  justify-content: center;
  align-items: center;
  background: #101010;
  overflow: hidden;
  position: relative;

  .content-container {
    text-align: center;
    color: white;
    z-index: 2;
    position: relative;
    padding: 15px 30px;
    background: rgba(0, 0, 0, 0.6); /* جعل الخلفية أغمق */
    border-radius: 10px;
    transition: all 0.4s ease;
    animation: fadeIn 2s ease-out;
    max-width: 500px; /* جعل العرض أكثر تناسبًا */
  }

  .content-container:hover {
    transform: scale(1.05);
    background: rgba(0, 0, 0, 0.8);
  }

  h1 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 12px;
    animation: textAnimation 2s ease-out;
    color: #ffffff; /* النص باللون الأبيض */
  }

  p {
    font-size: 18px;
    opacity: 0.9;
    animation: textFadeIn 2.5s ease-out;
    color: #b0b0b0; /* النص الثانوي بلون رمادي فاتح */
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes textAnimation {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes textFadeIn {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* خلفية متحركة بألوان أكثر تناسقًا */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #2c3e50, #4ca1af);
    background-size: 300% 300%;
    animation: gradientAnimation 8s ease infinite;
    z-index: -1;
  }

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export default SqureModel;
