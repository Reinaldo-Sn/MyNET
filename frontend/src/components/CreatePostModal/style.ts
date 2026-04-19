import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
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
  max-width: 520px;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  color: #888;
  font-size: 1.3rem;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  &:hover { color: #e8e8e8; }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.7rem 0.9rem;
  border-radius: 6px;
  border: 1px solid #2a2a2a;
  background: #0a0a0a;
  color: #e8e8e8;
  font-size: 0.9rem;
  font-family: inherit;
  resize: none;
  box-sizing: border-box;
  &::placeholder { color: #444; }
  &:focus { outline: none; border-color: #e94560; }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const CharCount = styled.span<{ $over: boolean }>`
  font-size: 0.78rem;
  color: ${({ $over }) => ($over ? "#e94560" : "#555")};
`;

export const CameraButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ color }) => color || "#555"};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.15s;
  &:hover { color: #e8e8e8; }
`;

export const ImagePreview = styled.div`
  position: relative;
  display: inline-block;
`;

export const PreviewImg = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

export const RemoveImage = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(0,0,0,0.6);
  border: none;
  border-radius: 50%;
  color: #fff;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.75rem;
  &:hover { background: #e94560; }
`;

export const ErrorMsg = styled.p`
  color: #e94560;
  font-size: 0.82rem;
  margin: 0;
`;

export const SubmitButton = styled.button`
  padding: 0.55rem 1.3rem;
  background: #e94560;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.88rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: #c73652; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;
