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
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
  max-width: 400px;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h2`
  color: #e8e8e8;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #666;
  font-size: 1.2rem;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  &:hover { color: #e8e8e8; }
`;

export const AvatarWrapper = styled.div`
  position: relative;
  width: 80px;
  align-self: center;
  cursor: pointer;
`;

export const AvatarImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
`;

export const CameraOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;

  ${AvatarWrapper}:hover & {
    opacity: 1;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const BioTextarea = styled.textarea`
  width: 100%;
  padding: 0.65rem 0.9rem;
  border-radius: 6px;
  border: 1px solid #2a2a2a;
  background: #0a0a0a;
  color: #e8e8e8;
  font-size: 0.88rem;
  font-family: inherit;
  resize: none;
  box-sizing: border-box;
  &::placeholder { color: #444; }
  &:focus { outline: none; border-color: #e94560; }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const SaveButton = styled.button`
  padding: 0.5rem 1.2rem;
  background: #e94560;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.88rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  &:hover { background: #c73652; }
`;

export const CancelButton = styled.button`
  padding: 0.5rem 1.1rem;
  background: transparent;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  color: #666;
  font-size: 0.88rem;
  font-family: inherit;
  cursor: pointer;
  &:hover { border-color: #444; color: #888; }
`;
