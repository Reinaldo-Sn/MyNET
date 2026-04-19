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

export const SearchWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 458px;
  max-width: calc(100% - 420px);
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.4rem 0.9rem;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  font-size: 0.88rem;
  outline: none;
  box-sizing: border-box;
  background: #1a1a1a;
  color: #e8e8e8;
  font-family: inherit;
  &::placeholder { color: #555; }
  &:focus { border-color: #e94560; }
`;

export const SearchResults = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: #111;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  z-index: 200;
  overflow: hidden;
`;

export const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.9rem;
  cursor: pointer;
  &:hover { background: #1a1a1a; }
`;

export const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserName = styled.span`
  color: #e8e8e8;
  font-size: 0.88rem;
  font-weight: 500;
`;
