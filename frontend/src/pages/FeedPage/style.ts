import styled from "styled-components";

export const Container = styled.div`
  max-width: 580px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Empty = styled.p`
  color: ${({ theme }) => theme.textDimmer};
  text-align: center;
  margin-top: 3rem;
  font-size: 0.9rem;
`;


export const QuickPost = styled.form`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const QuickTextarea = styled.textarea`
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderAlt};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  font-family: inherit;
  resize: none;
  box-sizing: border-box;
  &::placeholder { color: ${({ theme }) => theme.textDimmer}; }
  &:focus { outline: none; border-color: ${({ theme }) => theme.accent}; }
`;

export const QuickFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CharCount = styled.span<{ $over: boolean }>`
  font-size: 0.78rem;
  color: ${({ $over, theme }) => ($over ? theme.accent : theme.textFaint)};
`;

export const QuickButton = styled.button`
  align-self: flex-end;
  padding: 0.45rem 1.2rem;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.accentFg};
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: ${({ theme }) => theme.accentHover}; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

