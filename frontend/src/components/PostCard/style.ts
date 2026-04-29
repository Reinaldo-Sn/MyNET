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
  display: block;
  max-width: 100%;
  max-height: 400px;
  width: auto;
  height: auto;
  border-radius: 14px;
  margin: 0;
  align-self: flex-start;
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
  color: ${({ $liked }) => ($liked ? '#f06292' : 'inherit')};
  opacity: ${({ $liked }) => ($liked ? 1 : 0.45)};
  font-size: 0.85rem;
  font-family: inherit;
  padding: 0.3rem 0.5rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.15s, opacity 0.15s, background 0.15s;
  &:hover { color: #f06292; opacity: 1; background: rgba(240, 98, 146, 0.12); }
`;

export const CommentToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  opacity: 0.45;
  font-size: 0.85rem;
  font-family: inherit;
  padding: 0.3rem 0.5rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.15s, opacity 0.15s, background 0.15s;
  &:hover { color: #42a5f5; opacity: 1; background: rgba(66, 165, 245, 0.12); }
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
  max-width: 240px;
  max-height: 200px;
  border-radius: 6px;
  display: block;
  margin-top: 0.35rem;
  object-fit: contain;
`

export const PinHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.76rem;
  color: ${({ theme }) => theme.textMuted};
  margin-bottom: -0.2rem;
`;

export const PinButton = styled.button<{ $pinned: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $pinned }) => ($pinned ? '#f5a623' : 'inherit')};
  opacity: ${({ $pinned }) => ($pinned ? 1 : 0.45)};
  font-size: 0.85rem;
  font-family: inherit;
  padding: 0.3rem 0.5rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.15s, opacity 0.15s, background 0.15s;
  &:hover { color: #f5a623; opacity: 1; background: rgba(245, 166, 35, 0.12); }
`;

export const RepostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.76rem;
  color: ${({ theme }) => theme.textMuted};
  margin-bottom: -0.2rem;
`;

export const RepostButton = styled.button<{ $reposted: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $reposted }) => ($reposted ? '#4caf50' : 'inherit')};
  opacity: ${({ $reposted }) => ($reposted ? 1 : 0.45)};
  font-size: 0.85rem;
  font-family: inherit;
  padding: 0.3rem 0.5rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.15s, opacity 0.15s, background 0.15s;
  &:hover { color: #4caf50; opacity: 1; background: rgba(76, 175, 80, 0.12); }
`;

export const LikeTooltipWrap = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  touch-action: none;
  user-select: none;
`;

export const LikeTooltip = styled.div<{ $visible: boolean }>`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 7px 12px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textMuted};
  white-space: nowrap;
  box-shadow: 0 4px 20px rgba(0,0,0,0.22);
  pointer-events: none;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? "translateY(0) scale(1)" : "translateY(4px) scale(0.97)")};
  transition: opacity 0.18s, transform 0.18s;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 14px;
    border: 5px solid transparent;
    border-top-color: ${({ theme }) => theme.border};
  }
  &::before {
    content: "";
    position: absolute;
    top: calc(100% - 1px);
    left: 14px;
    border: 5px solid transparent;
    border-top-color: ${({ theme }) => theme.surface};
    z-index: 1;
  }
`;

export const LikeTooltipName = styled.span`
  font-weight: 600;
  color: #f06292;
`;

export const LikeTooltipSep = styled.span`
  color: ${({ theme }) => theme.textMuted};
  opacity: 0.5;
`;

export const YoutubeEmbed = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  border-radius: 8px;
  overflow: hidden;
  iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`