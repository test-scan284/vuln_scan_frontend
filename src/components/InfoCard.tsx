import React from 'react';
import styled from 'styled-components';

const InfoCard = () => {
  return (
    <StyledWrapper>
      <section className="card">
        <header>
          <h2 className="title">Beginner</h2>
          <h1 className="price">Free</h1>
        </header>
        <p className="desc">Etiam ac convallis enim, eget euismod dolor.</p>
        <ul className="lists">
          <li className="list">
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd" />
            </svg>
            <p>Aenean quis</p>
          </li>
          <li className="list">
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd" />
            </svg>
            <p>Morbi semper</p>
          </li>
          <li className="list">
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd" />
            </svg>
            <p>Tristique enim nec</p>
          </li>
        </ul>
      </section>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  :root {
    --primary-color: #0ea5e9;
    --secondary-color: #f8fafc;
    --accent-color: #020617;
  }

  .card {
    margin-left: -1rem;
    margin-right: -1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    margin-bottom: 2rem;
    width: 380px;
    flex-direction: column;
    border-radius: 1rem;
    // background-color: #020617;
    padding: 1.5rem;
  }

  header {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 1.2rem;
    line-height: 2rem;
    font-weight: 700;
    color: #f8fafc90;
  }

  .price {
    font-size: 3.75rem;
    line-height: 1;
    font-weight: 700;
    color: #f8fafc;
  }

  .desc {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    line-height: 1.625;
    text-wrap: pretty;
    color: #f8fafc90;
  }

  .lists {
    margin-bottom: 1.5rem;
    flex: 1 1 0%;
    color: #f8fafc90;
  }

  .lists .list {
    margin-bottom: 0.5rem;
    display: flex;
    margin-left: 0.5rem;
  }

  .lists .list svg {
    height: 1.5rem;
    width: 1.5rem;
    flex-shrink: 0;
    margin-right: 0.5rem;
    color: #0ea5e9;
  }

  .action {
    border: none;
    outline: none;
    display: inline-block;
    border-radius: 0.5rem;
    background-color: #0ea5e9;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    text-align: center;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: #f8fafc;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #0284c7;
    }
  }`;

export default InfoCard;
