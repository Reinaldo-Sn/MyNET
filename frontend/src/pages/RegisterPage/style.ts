import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bg};
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
  letter-spacing: -0.3px;
  span { color: ${({ theme }) => theme.accent}; }
`;

export const Input = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: 0.65rem 0.9rem;
  border-radius: 6px;
  border: 1px solid ${({ theme, $error }) => ($error ? "#e05555" : theme.borderAlt)};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  font-family: inherit;
  box-sizing: border-box;
  &::placeholder { color: ${({ theme }) => theme.textDimmer}; }
  &:focus { outline: none; border-color: ${({ theme, $error }) => ($error ? "#e05555" : theme.accent)}; }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.7rem;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.accentFg};
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: ${({ theme }) => theme.accentHover}; }
`;

export const ErrorMsg = styled.p`
  color: ${({ theme }) => theme.accent};
  font-size: 0.82rem;
  margin: 0;
  text-align: center;
`;

export const LinkText = styled.p`
  color: ${({ theme }) => theme.textFaint};
  font-size: 0.82rem;
  text-align: center;
  margin: 0;
  a {
    color: ${({ theme }) => theme.textMuted};
    text-decoration: none;
    &:hover { color: ${({ theme }) => theme.text}; }
  }
`;
