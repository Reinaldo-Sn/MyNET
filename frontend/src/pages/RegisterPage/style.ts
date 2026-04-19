import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
`;

export const Card = styled.div`
  background: #111;
  border: 1px solid #1e1e1e;
  border-radius: 8px;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

export const Title = styled.h1`
  color: #e8e8e8;
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
  letter-spacing: -0.3px;
  span { color: #e94560; }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.65rem 0.9rem;
  border-radius: 6px;
  border: 1px solid #2a2a2a;
  background: #0a0a0a;
  color: #e8e8e8;
  font-size: 0.9rem;
  font-family: inherit;
  box-sizing: border-box;
  &::placeholder { color: #444; }
  &:focus { outline: none; border-color: #e94560; }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.7rem;
  background: #e94560;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: #c73652; }
`;

export const ErrorMsg = styled.p`
  color: #e94560;
  font-size: 0.82rem;
  margin: 0;
  text-align: center;
`;

export const LinkText = styled.p`
  color: #555;
  font-size: 0.82rem;
  text-align: center;
  margin: 0;
  a {
    color: #888;
    text-decoration: none;
    &:hover { color: #e8e8e8; }
  }
`;
