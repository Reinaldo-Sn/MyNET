import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

export const Modal = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 2rem 1.75rem;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h2`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

export const Description = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textMuted};
  margin: 0;
  line-height: 1.6;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.65rem 0.9rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.borderAlt};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 0.92rem;
  font-family: inherit;
  box-sizing: border-box;
  &:focus { outline: none; border-color: ${({ theme }) => theme.accent}; }
`;

export const Button = styled.button`
  padding: 0.65rem 1rem;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.accentFg};
  border: none;
  border-radius: 8px;
  font-size: 0.92rem;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  &:hover { background: ${({ theme }) => theme.accentHover}; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

export const SkipButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.85rem;
  font-family: inherit;
  cursor: pointer;
  align-self: center;
  &:hover { color: ${({ theme }) => theme.text}; }
`;

export const ErrorMsg = styled.p`
  color: #e57373;
  font-size: 0.85rem;
  margin: 0;
`;
