import styled from "styled-components";

export const Container = styled.div`
  max-width: 580px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.2px;
`;

export const SearchForm = styled.form`
  display: flex;
  gap: 0.6rem;
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.65rem 0.9rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderAlt};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  font-family: inherit;
  &::placeholder { color: ${({ theme }) => theme.textDimmer}; }
  &:focus { outline: none; border-color: ${({ theme }) => theme.accent}; }
`;

export const Button = styled.button`
  padding: 0.65rem 1.1rem;
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

export const UserCard = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0.75rem 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  transition: border-color 0.15s;
  &:hover { border-color: ${({ theme }) => theme.borderAlt}; }
`;

export const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
  overflow: hidden;
`;

export const UserName = styled.strong`
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Followers = styled.p`
  color: ${({ theme }) => theme.textFaint};
  font-size: 0.8rem;
  margin: 0;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding-top: 0.25rem;
`;

export const PageBtn = styled.button`
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  background: transparent;
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.85rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  &:hover:not(:disabled) { background: ${({ theme }) => theme.surfaceAlt}; color: ${({ theme }) => theme.text}; }
  &:disabled { opacity: 0.35; cursor: not-allowed; }
`;

export const PageInfo = styled.span`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.textFaint};
`;

export const FollowButton = styled.button<{ $following?: boolean }>`
  margin-left: auto;
  flex-shrink: 0;
  padding: 0.35rem 0.9rem;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  background: ${({ $following, theme }) => ($following ? "transparent" : theme.accent)};
  color: ${({ $following, theme }) => ($following ? theme.textMuted : theme.accentFg)};
  border: 1px solid ${({ $following, theme }) => ($following ? theme.border : theme.accent)};
  &:hover {
    background: ${({ $following, theme }) => ($following ? theme.surfaceAlt : theme.accentHover)};
    border-color: ${({ $following, theme }) => ($following ? theme.borderAlt : theme.accentHover)};
  }
`;
