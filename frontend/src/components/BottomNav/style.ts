import styled from "styled-components";

export const Wrap = styled.nav`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 56px;
    background: ${({ theme }) => theme.surface};
    border-top: 1px solid ${({ theme }) => theme.border};
    align-items: center;
    z-index: 200;
    padding: 0 4px;
  }
`;

export const NavBtn = styled.button<{ $active?: boolean }>`
  background: transparent;
  border: none;
  color: ${({ $active, theme }) => ($active ? theme.accent : theme.textMuted)};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 10px;
  transition: color 0.15s;
  position: relative;
  flex: 1;
  &:hover { color: ${({ theme }) => theme.text}; }
`;

export const CenterSlot = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CenterBtn = styled.button`
  background: ${({ theme }) => theme.accent};
  border: none;
  color: ${({ theme }) => theme.accentFg};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  transition: opacity 0.15s;
  &:hover { opacity: 0.85; }
`;

export const NavBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 8px;
  background: #e05555;
  color: #fff;
  font-size: 0.6rem;
  font-weight: 700;
  border-radius: 99px;
  padding: 1px 4px;
  pointer-events: none;
  min-width: 14px;
  text-align: center;
`;
