import React from 'react';
import styled from 'styled-components';

const Card = ({ children }) => {
    return (
      <StyledWrapper>
        <div className="card">
          <div className="card-info">{children}</div>
        </div>
      </StyledWrapper>
    );
  };
  

const StyledWrapper = styled.div`
  .card {
    --background: linear-gradient(to right, #13b37f 0%, #11a3c8 100%);
    width:600px;
    height: 100px;
    padding: 0.9px;
    border-radius: 0.7rem;
    overflow: visible;
    background: #f7ba2b;
    background: var(--background);
    position: relative;
    z-index: 1;
  }

  .card::after {
    position: absolute;
    content: "";
    top: -3px;
    left: 0;
    right: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    transform: scale(0.76);
    filter: blur(34.5px);
    background: var(--background);
    transition: opacity 0.5s;
  }

  .card-info {
    --color: #1f1a1d;
    background: var(--color);
    color: var(--color);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: visible;
    border-radius: 0.7rem;
  }

  .card .title {
    font-weight: light;
    letter-spacing: 0.2em;
    color: #1f1a1d; /* تحديد اللون بشكل صحيح */
  }

  /* Hover Effect */
  .card:hover::after {
    opacity: 0.6;
    padding: 0.7rem 0;
    top: 18px;
    transition: 0.6s;
  }

  .card:hover .card-info {
    color: #fff9f9;
    transition: color 1s;
  }
`;

export default Card;
