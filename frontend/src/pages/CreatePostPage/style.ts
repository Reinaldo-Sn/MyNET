import styled from "styled-components";

export const Container = styled.div`
  max-width: 580px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.2px;
`;

export const Form = styled.form`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.7rem 0.9rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderAlt};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;
  &::placeholder { color: ${({ theme }) => theme.textDimmer}; }
  &:focus { outline: none; border-color: ${({ theme }) => theme.accent}; }
`;

export const FileInput = styled.input`
  color: ${({ theme }) => theme.textFaint};
  font-size: 0.82rem;
  font-family: inherit;
`;

export const Button = styled.button`
  align-self: flex-end;
  padding: 0.55rem 1.3rem;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.accentFg};
  border: none;
  border-radius: 6px;
  font-size: 0.88rem;
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
`;
