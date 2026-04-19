import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`;

export const Modal = styled.div`
  background: #111;
  border: 1px solid #1e1e1e;
  border-radius: 8px;
  width: 100%;
  max-width: 360px;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #1a1a1a;
`;

export const ModalTitle = styled.h2`
  color: #e8e8e8;
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #555;
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  transition: color 0.15s;
  &:hover { color: #e8e8e8; }
`;

export const UserList = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: #171717; }
`;

export const UserAvatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserName = styled.span`
  color: #d8d8d8;
  font-size: 0.9rem;
  font-weight: 500;
`;

export const Empty = styled.p`
  color: #555;
  text-align: center;
  padding: 2rem;
  font-size: 0.88rem;
`;
