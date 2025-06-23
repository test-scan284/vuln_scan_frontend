import React from 'react';
import styled from 'styled-components';
import { Shield, Code, Lock } from 'lucide-react';

const MissionCard = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <div data-text="Protection" style={{ '--r': '-15' }} className="glass animate card-blue">
          <Shield className="icon" />
          <p className="desc">Safeguarding apps against evolving threats</p>
        </div>
        <div data-text="Innovation" style={{ '--r': '5' }} className="glass animate card-purple">
            <Code className="icon"/>
            <p className="desc">Advancing security testing through cutting-edge technology</p>
        </div>
        <div data-text="Trust" style={{ '--r': '-25' }} className="glass animate card-green">
            <Lock className="icon"/>
            <p className="desc">Building confidence in application security</p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 2rem;
  }

  .glass {
    width: 220px;
    min-height: 250px;
    background: linear-gradient(#ffffff0a, #ffffff06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 25px rgba(0, 0, 0, 0.25);
    border-radius: 14px;
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    transform: rotate(calc(var(--r) * 1deg));
    transition: all 0.4s ease;
  }

  .container:hover .glass {
    transform: rotate(0deg);
    margin: 0 10px;
  }

  .glass::before {
    content: attr(data-text);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: rgba(255, 255, 255, 0.04);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.85rem;
    color: #ccc;
    font-weight: 500;
    border-top: 1px solid rgba(255,255,255,0.05);
  }

  .icon {
    height: 2.8rem;
    width: 2.8rem;
    transition: transform 0.3s ease, filter 0.3s ease;
    margin-bottom: 0.75rem;
  }

  .desc {
    font-size: 0.875rem;
    color: #ccc;
    line-height: 1.4;
    max-width: 180px;
  }

  /* Cyberpunk hover tint */
  .card-blue:hover .icon {
    color: #00bfff;
    filter: drop-shadow(0 0 8px #00bfff);
    transform: scale(1.1);
  }

  .card-purple:hover .icon {
    color: #a855f7;
    filter: drop-shadow(0 0 8px #a855f7);
    transform: scale(1.1);
  }

  .card-green:hover .icon {
    color: #22c55e;
    filter: drop-shadow(0 0 8px #22c55e);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    .glass {
      width: 100%;
      min-height: 220px;
    }
    .desc {
      font-size: 0.8rem;
    }
    .icon {
      height: 2.4rem;
      width: 2.4rem;
    }
  }
`;

export default MissionCard;
