import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 56px;
  background: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Logo = styled(Link)`
  color: ${({ theme }) => theme.accent};
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: -0.3px;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.textMuted};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.15s;
  &:hover { color: ${({ theme }) => theme.text}; }
`;

export const Button = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.accent};
  border: 1px solid ${({ theme }) => theme.accent};
  padding: 0.35rem 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  font-family: inherit;
  transition: background 0.15s, color 0.15s;
  &:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.accentFg};
  }
`;

export const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textMuted};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.15s;
  &:hover { color: ${({ theme }) => theme.text}; }
`;

export const SearchWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 548px;
  max-width: calc(100% - 420px);
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.4rem 0.9rem;
  border: 1px solid ${({ theme }) => theme.borderAlt};
  border-radius: 999px;
  font-size: 0.88rem;
  outline: none;
  box-sizing: border-box;
  background: ${({ theme }) => theme.surfaceAlt};
  color: ${({ theme }) => theme.text};
  font-family: inherit;
  &::placeholder { color: ${({ theme }) => theme.textFaint}; }
  &:focus { border-color: ${({ theme }) => theme.accent}; }
`;

export const SearchResults = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.borderAlt};
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  z-index: 200;
  overflow: hidden;
`;

export const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.9rem;
  cursor: pointer;
  &:hover { background: ${({ theme }) => theme.surfaceAlt}; }
`;

export const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserName = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 0.88rem;
  font-weight: 500;
`;
