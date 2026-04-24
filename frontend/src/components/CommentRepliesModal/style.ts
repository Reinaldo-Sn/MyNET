import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 400;
  padding: 1rem;
`;

export const Modal = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  flex-shrink: 0;
`;

export const Title = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.text};
`;

export const CloseBtn = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textMuted};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 2px;
  border-radius: 4px;
  transition: color 0.15s;
  &:hover { color: ${({ theme }) => theme.text}; }
`;

export const ParentComment = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surfaceAlt};
  flex-shrink: 0;
`;

export const ReplyList = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
`;

export const ReplyItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  min-width: 0;
  &:last-of-type { border-bottom: none; }
`;

export const ReplyMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 3px;
  min-width: 0;
  overflow: hidden;
`;

export const ReplyAvatar = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const ReplyAuthor = styled.span`
  font-weight: 600;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.accent};
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  &:hover { opacity: 0.8; }
`;

export const ReplyDate = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textDimmer};
  flex-shrink: 0;
  white-space: nowrap;
`;

export const ReplyBody = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textMuted};
  line-height: 1.5;
  word-break: break-word;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
`;

export const ReplyGif = styled.img`
  max-width: 200px;
  max-height: 160px;
  border-radius: 6px;
  display: block;
  margin-top: 4px;
  object-fit: contain;
`;

export const DeleteBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textGhost};
  padding: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  transition: color 0.15s;
  &:hover { color: ${({ theme }) => theme.accent}; }
`;

export const Form = styled.form`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  flex-shrink: 0;
`;

export const Input = styled.input`
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
  &:focus { border-color: ${({ theme }) => theme.textMuted}; }
`;

export const SubmitBtn = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.accentFg};
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  transition: opacity 0.15s;
  &:hover { opacity: 0.85; }
`;

export const Empty = styled.div`
  padding: 24px 16px;
  text-align: center;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textMuted};
`;
