import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

type CardItem = {
  title: string;
  description: string;
  list: string[];
  theme: 'free' | 'paid';
  path: string;
};

const SelectM = ({ title, description, list, theme, path }: CardItem) => {
  const hoverSound = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  const playHoverSound = () => {
    if (hoverSound.current) {
      hoverSound.current.currentTime = 0;
      hoverSound.current.play();
    }
  };

const handleButtonClick = async () => {
  try {
    let endpoint = '';
    let model = '';

    if (theme === 'free') {
      endpoint = 'http://127.0.0.1:3000/sast/set-model';
      model = 'gemini';
    } else if (theme === 'paid') {
      endpoint = 'http://127.0.0.1:3000/sast-paid/set-model';
      model = 'bedrock'; // غير الموديل هنا حسب اللي انت عايزه للـ paid
    }

    if (endpoint) {
      const response = await axios.post(endpoint, { model });
      console.log('Set model response:', response.data);
    }

    navigate(path);
  } catch (error) {
    console.error('Error setting model:', error);
    alert('فشل تحديد الموديل. حاول مرة أخرى.');
  }
};

  return (
    <StyledWrapper theme={theme}>
      <audio ref={hoverSound} src="/sounds/hover-sound.mp3" preload="auto" />
      <div className="card" onMouseEnter={playHoverSound}>
        <div className="card__border" />
        <div className="card_title__container">
          <span className="card_title">{title}</span>
          <p className="card_paragraph">{description}</p>
        </div>
        <hr className="line" />
        <ul className="card__list">
          {list.map((item, index) => (
            <li className="card__list_item" key={index}>
              <span className="check">
                <svg className="check_svg" viewBox="0 0 16 16" fill="currentColor">
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                  />
                </svg>
              </span>
              <span className="list_text">{item}</span>
            </li>
          ))}
        </ul>
        <button className="button" onClick={handleButtonClick}>
          Get Your Success
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ theme: 'free' | 'paid' }>`
  .card {
    --white: hsl(0, 0%, 100%);
    --black: hsl(240, 15%, 9%);
    --paragraph: hsl(0, 0%, 83%);
    --line: hsl(240, 9%, 17%);
    --primary: hsl(189, 92%, 58%);

    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    width: 19rem;
    background-color: hsla(240, 15%, 9%, 1);
    background-image: radial-gradient(
        at 88% 40%,
        hsla(240, 15%, 9%, 1) 0px,
        transparent 85%
      ),
      radial-gradient(at 49% 30%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
      radial-gradient(at 14% 26%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
      radial-gradient(at 0% 64%, hsl(189, 99%, 26%) 0px, transparent 85%),
      radial-gradient(at 41% 94%, hsl(189, 97%, 36%) 0px, transparent 85%),
      radial-gradient(at 100% 99%, hsl(188, 94%, 13%) 0px, transparent 85%);
    border-radius: 1rem;
    ${({ theme }) =>
      theme === 'free'
        ? `box-shadow: 0 0 15px rgba(0, 255, 255, 0.7);`
        : `box-shadow: 0 0 15px rgba(255, 215, 0, 0.7);`};
  }

  .card .card__border {
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    z-index: -10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    background-image: linear-gradient(
      0deg,
      hsl(0, 0%, 100%) -50%,
      hsl(0, 0%, 40%) 100%
    );
    border-radius: 1rem;
  }

  .card .card__border::before {
    content: "";
    pointer-events: none;
    position: fixed;
    z-index: 200;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0deg);
    transform-origin: left;
    width: 200%;
    height: 10rem;
    background-image: linear-gradient(
      0deg,
      hsla(0, 0%, 100%, 0) 0%,
      ${({ theme }) => (theme === 'free' ? 'hsl(189, 100%, 50%)' : 'hsl(50, 100%, 50%)')} 40%,
      ${({ theme }) => (theme === 'free' ? 'hsl(189, 100%, 50%)' : 'hsl(50, 100%, 50%)')} 60%,
      hsla(0, 0%, 40%, 0) 100%
    );
    animation: rotate 8s linear infinite;
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }

  .card .card_title__container .card_title {
    font-size: 1rem;
    color: var(--white);
  }

  .card .card_title__container .card_paragraph {
    margin-top: 0.25rem;
    width: 65%;
    font-size: 0.5rem;
    color: var(--paragraph);
  }

  .card .line {
    width: 100%;
    height: 0.1rem;
    background-color: var(--line);
    border: none;
  }

  .card .card__list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .card .card__list .card__list_item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .card .card__list .card__list_item .check {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height: 1rem;
    background-color: var(--primary);
    border-radius: 50%;
  }

  .card .card__list .card__list_item .check .check_svg {
    width: 0.75rem;
    height: 0.75rem;
    fill: var(--black);
  }

  .card .card__list .card__list_item .list_text {
    font-size: 0.75rem;
    color: var(--white);
  }

  .card .button {
    cursor: pointer;
    padding: 0.5rem;
    width: 100%;
    background-image: linear-gradient(
      0deg,
      hsl(189, 92%, 58%),
      hsl(189, 99%, 26%) 100%
    );
    font-size: 0.75rem;
    color: var(--white);
    border: 0;
    border-radius: 9999px;
    box-shadow: inset 0 -2px 25px -4px var(--white);
  }
`;

export default SelectM;
