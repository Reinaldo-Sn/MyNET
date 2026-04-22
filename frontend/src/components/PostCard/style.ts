import styled from "styled-components";

export const Card = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1.1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

export const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  &:hover { opacity: 0.8; }
`;

export const AuthorAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const Author = styled.strong`
  color: ${({ theme }) => theme.accent};
  font-size: 0.88rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
`;

export const Content = styled.p`
  color: ${({ theme }) => theme.text};
  margin: 0;
  line-height: 1.6;
  font-size: 0.95rem;
  width: 100%;
  word-break: break-word;
  overflow-wrap: break-word;
`;

export const PostImage = styled.img`
  width: 100%;
  border-radius: 6px;
  max-height: 400px;
  object-fit: cover;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.1rem;
`;

export const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const LikeButton = styled.button<{ $liked: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $liked, theme }) => ($liked ? theme.accent : theme.textFaint)};
  font-size: 0.85rem;
  font-family: inherit;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.15s;
  &:hover { color: ${({ theme }) => theme.accent}; }
`;

export const CommentToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textFaint};
  font-size: 0.85rem;
  font-family: inherit;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.15s;
  &:hover { color: ${({ theme }) => theme.textMuted}; }
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textGhost};
  font-size: 0.82rem;
  font-family: inherit;
  padding: 0;
  transition: color 0.15s;
  &:hover { color: ${({ theme }) => theme.textMuted}; }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textGhost};
  font-size: 0.82rem;
  font-family: inherit;
  padding: 0;
  transition: color 0.15s;
  &:hover { color: ${({ theme }) => theme.accent}; }
`;

export const DateText = styled.small`
  color: ${({ theme }) => theme.textDimmer};
  font-size: 0.78rem;
`;

export const EditArea = styled.textarea`
  width: 100%;
  padding: 0.65rem 0.9rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderAlt};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  font-family: inherit;
  resize: none;
  box-sizing: border-box;
  &:focus { outline: none; border-color: ${({ theme }) => theme.accent}; }
`;

export const EditActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

export const SaveButton = styled.button`
  padding: 0.35rem 0.9rem;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.accentFg};
  border: none;
  border-radius: 6px;
  font-size: 0.82rem;
  font-family: inherit;
  cursor: pointer;
  &:hover { background: ${({ theme }) => theme.accentHover}; }
`;

export const CancelButton = styled.button`
  padding: 0.35rem 0.9rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.borderAlt};
  border-radius: 6px;
  color: ${({ theme }) => theme.textSubtle};
  font-size: 0.82rem;
  font-family: inherit;
  cursor: pointer;
  &:hover { border-color: ${({ theme }) => theme.textFaint}; color: ${({ theme }) => theme.textMuted}; }
`;

export const CommentsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  padding-top: 0.75rem;
`;

export const CommentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  &:last-of-type { border-bottom: none; }
`;

export const CommentText = styled.div`
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.85rem;
  margin: 0;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  span {
    color: ${({ theme }) => theme.accent};
    font-weight: 600;
    font-size: 0.82rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  };
`;

export const CommentDate = styled.small`
  color: ${({ theme }) => theme.textDimmer};
  font-size: 0.75rem;
  flex-shrink: 0;
`;

export const CommentDelete = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textGhost};
  font-size: 0.78rem;
  font-family: inherit;
  padding: 0;
  flex-shrink: 0;
  transition: color 0.15s;
  &:hover { color: ${({ theme }) => theme.accent}; }
`;

export const CommentForm = styled.form`
  display: flex;
  gap: 0.5rem;
`;

export const CommentInput = styled.input`
  flex: 1;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderAlt};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 0.85rem;
  font-family: inherit;
  &:focus { outline: none; border-color: ${({ theme }) => theme.accent}; }
`;

export const CommentSubmit = styled.button`
  padding: 0.5rem 0.9rem;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.accentFg};
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-family: inherit;
  cursor: pointer;
  &:hover { background: ${({ theme }) => theme.accentHover}; }
`;

export const CommentBody = styled.p`
  margin: 0;
  width: 100%;
  word-break: break-word;
  overflow-wrap: break-word;
`

export const SeeMoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.accent};
  font-size: 0.82rem;
  font-family: inherit;
  padding: 0;
  align-self: flex-start;
  &:hover { opacity: 0.75; }
`

export const CommentGif = styled.img`
  max-width: 40%;
  max-height: 80px;
  border-radius: 6px;
  display: block;
  margin-top: 0.2rem;
`