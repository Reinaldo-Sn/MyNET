import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 56px;
  background: #0a0a0a;
  border-bottom: 1px solid #1a1a1a;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Logo = styled(Link)`
  color: #e94560;
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
  color: #888;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.15s;
  &:hover { color: #e8e8e8; }
`;

export const Button = styled.button`
  background: transparent;
  color: #e94560;
  border: 1px solid #e94560;
  padding: 0.35rem 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  font-family: inherit;
  transition: background 0.15s, color 0.15s;
  &:hover {
    background: #e94560;
    color: #fff;
  }
`;
