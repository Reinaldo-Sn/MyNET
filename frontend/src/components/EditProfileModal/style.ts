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
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
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
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textSubtle};
  font-size: 1.2rem;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  &:hover { color: ${({ theme }) => theme.text}; }
`;

export const BannerWrapper = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
`;

export const BannerArea = styled.div<{ $src: string | null }>`
  height: 100px;
  width: 100%;
  background: ${({ $src, theme }) => $src ? `url(${$src}) center/cover no-repeat` : theme.surfaceAlt};
`;

export const BannerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  ${BannerWrapper}:hover & { opacity: 1; }
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

export const FieldInput = styled.input`
  width: 100%;
  padding: 0.65rem 0.9rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderAlt};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 0.88rem;
  font-family: inherit;
  box-sizing: border-box;
  &::placeholder { color: ${({ theme }) => theme.textDimmer}; }
  &:focus { outline: none; border-color: ${({ theme }) => theme.accent}; }
`;

export const ErrorText = styled.p`
  color: #e05555;
  font-size: 0.8rem;
  margin: 0;
`;

export const PasswordToggle = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.borderAlt};
  border-radius: 6px;
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.85rem;
  font-family: inherit;
  padding: 0.5rem 0.9rem;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s, color 0.15s;
  &:hover { border-color: ${({ theme }) => theme.textFaint}; color: ${({ theme }) => theme.text}; }
`;

export const PasswordSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const BioTextarea = styled.textarea`
  width: 100%;
  padding: 0.65rem 0.9rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderAlt};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 0.88rem;
  font-family: inherit;
  resize: none;
  box-sizing: border-box;
  &::placeholder { color: ${({ theme }) => theme.textDimmer}; }
  &:focus { outline: none; border-color: ${({ theme }) => theme.accent}; }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const SaveButton = styled.button`
  padding: 0.5rem 1.2rem;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.accentFg};
  border: none;
  border-radius: 6px;
  font-size: 0.88rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  &:hover { background: ${({ theme }) => theme.accentHover}; }
`;

export const CancelButton = styled.button`
  padding: 0.5rem 1.1rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.borderAlt};
  border-radius: 6px;
  color: ${({ theme }) => theme.textSubtle};
  font-size: 0.88rem;
  font-family: inherit;
  cursor: pointer;
  &:hover { border-color: ${({ theme }) => theme.textFaint}; color: ${({ theme }) => theme.textMuted}; }
`;
