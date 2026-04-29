import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  background: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const NavRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 56px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const Logo = styled(Link)`
  color: ${({ theme }) => theme.accent};
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: -0.3px;
  display: flex;
  align-items: center;
`;

export const OwlImg = styled.img`
  height: 24px;
  margin-left: 6px;
  filter: ${({ theme }) => theme.bg === "#0d1117" ? "brightness(0) invert(1)" : "none"};
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.textMuted};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: color 0.15s;
  &:hover { color: ${({ theme }) => theme.text}; }
`;

export const BellWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const BellButton = styled.button`
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

export const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -6px;
  background: #e05555;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 600;
  border-radius: 99px;
  padding: 1px 5px;
  pointer-events: none;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 260px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  z-index: 200;
  overflow: hidden;
`;

export const DropdownItem = styled.div`
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.text};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  transition: background 0.15s;
  word-break: break-word;
  overflow-wrap: anywhere;
  &:last-child { border-bottom: none; }
  &:hover { background: ${({ theme }) => theme.surfaceAlt}; }
  span { color: ${({ theme }) => theme.textMuted}; }
`;

export const DropdownEmpty = styled.div`
  padding: 1rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textMuted};
  text-align: center;
`;

export const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const MarkAllBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.78rem;
  font-family: inherit;
  color: ${({ theme }) => theme.accent};
  padding: 0;
  transition: opacity 0.15s;
  &:hover { opacity: 0.7; }
`;

export const MobileThemeBtn = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.textMuted};
    cursor: pointer;
    padding: 0.25rem;
    transition: color 0.15s;
    &:hover { color: ${({ theme }) => theme.text}; }
  }
`;

export const MobilePokeBtn = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.textMuted};
    cursor: pointer;
    padding: 0.25rem;
    position: relative;
    transition: color 0.15s;
    &:hover { color: ${({ theme }) => theme.text}; }
  }
`;
