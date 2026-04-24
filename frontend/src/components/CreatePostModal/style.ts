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
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
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
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textMuted};
  font-size: 1.3rem;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  &:hover { color: ${({ theme }) => theme.text}; }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.7rem 0.9rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderAlt};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  font-family: inherit;
  resize: none;
  box-sizing: border-box;
  &::placeholder { color: ${({ theme }) => theme.textDimmer}; }
  &:focus { outline: none; border-color: ${({ theme }) => theme.accent}; }
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
  color: ${({ $over, theme }) => ($over ? theme.accent : theme.textFaint)};
`;

export const CameraButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textFaint};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.15s;
  &:hover { color: ${({ theme }) => theme.text}; }
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
  background: rgba(0, 0, 0, 0.6);
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
  &:hover { background: ${({ theme }) => theme.accent}; }
`;

export const GifButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textFaint};
  cursor: pointer;
  padding: 0;
  font-size: 0.78rem;
  font-weight: 700;
  font-family: inherit;
  letter-spacing: 0.5px;
  transition: color 0.15s;
  &:hover { color: ${({ theme }) => theme.text}; }
`;

export const GifInputRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const GifInput = styled.input`
  flex: 1;
  padding: 0.45rem 0.75rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderAlt};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 0.85rem;
  font-family: inherit;
  &::placeholder { color: ${({ theme }) => theme.textDimmer}; }
  &:focus { outline: none; border-color: ${({ theme }) => theme.accent}; }
`;

export const ErrorMsg = styled.p`
  color: ${({ theme }) => theme.accent};
  font-size: 0.82rem;
  margin: 0;
`;

export const SubmitButton = styled.button`
  padding: 0.55rem 1.3rem;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.accentFg};
  border: none;
  border-radius: 6px;
  font-size: 0.88rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: ${({ theme }) => theme.accentHover}; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;
