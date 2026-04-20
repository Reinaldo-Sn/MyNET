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

  @media (max-width: 768px) {
    flex-wrap: wrap;
    height: auto;
    min-height: 56px;
    padding: 0 1rem;
    align-items: flex-start;
  }
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

export const HamburgerButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textMuted};
  cursor: pointer;
  padding: 0.25rem;
  align-items: center;
  transition: color 0.15s;
  &:hover { color: ${({ theme }) => theme.text}; }

  @media (max-width: 768px) {
    display: flex;
    align-self: center;
  }
`;

export const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    flex-direction: column;
    width: 100%;
    padding: 0.5rem 0 0.75rem;
    border-top: 1px solid ${({ theme }) => theme.border};
    gap: 0.1rem;
  }
`;

export const MobileNavLink = styled(Link)`
  color: ${({ theme }) => theme.textMuted};
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.65rem 0.5rem;
  border-radius: 8px;
  transition: color 0.15s, background 0.15s;
  &:hover {
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.surfaceAlt};
  }
`;

export const MobileActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.4rem 0.5rem 0;
`;

export const NavRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 56px;

  @media (min-width: 769px) {
    display: contents;
  }
`;
