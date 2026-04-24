import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Modal = styled.div`
  position: fixed;
  top: 66px;
  left: 1.25rem;
  z-index: 300;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.18);
  padding: 14px 16px;
  width: 220px;
  animation: ${fadeIn} 0.2s ease;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 10px;
`;

export const BannerTitle = styled.span`
  font-weight: 700;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.accent};
`;

export const Version = styled.span`
  font-size: 0.70rem;
  color: ${({ theme }) => theme.textDimmer};
  background: ${({ theme }) => theme.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 99px;
  padding: 1px 7px;
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Item = styled.li`
  font-size: 0.81rem;
  color: ${({ theme }) => theme.textMuted};
  display: flex;
  align-items: flex-start;
  gap: 6px;
  line-height: 1.4;

  &::before {
    content: "•";
    color: ${({ theme }) => theme.accent};
    font-size: 1rem;
    line-height: 1.2;
    flex-shrink: 0;
  }
`;

export const CloseBtn = styled.button`
  margin-top: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textDimmer};
  font-size: 0.78rem;
  font-family: inherit;
  padding: 0;
  width: 100%;
  text-align: center;
  transition: color 0.15s;
  &:hover { color: ${({ theme }) => theme.text}; }
`;
