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

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.65rem 1rem;
  border: 1px solid ${({ theme }) => theme.borderAlt};
  border-radius: 999px;
  font-size: 0.95rem;
  outline: none;
  box-sizing: border-box;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  font-family: inherit;
  &::placeholder { color: ${({ theme }) => theme.textDimmer}; }
  &:focus { border-color: ${({ theme }) => theme.accent}; }
`;

export const SearchResults = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.borderAlt};
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  z-index: 100;
  overflow: hidden;
`;

export const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  &:hover { background: ${({ theme }) => theme.surfaceAlt}; }
`;

export const UserAvatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
`;

export const Followers = styled.span`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.textSubtle};
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

export const SearchMessage = styled.p`
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textSubtle};
  margin: 0;
`;
