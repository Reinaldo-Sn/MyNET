import styled from "styled-components";

export const Card = styled.div`
  background: #111;
  border: 1px solid #1e1e1e;
  border-radius: 8px;
  padding: 1.1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

export const Author = styled.strong`
  color: #e94560;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  &:hover { opacity: 0.8; }
`;

export const Content = styled.p`
  color: #d8d8d8;
  margin: 0;
  line-height: 1.6;
  font-size: 0.95rem;
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
  color: ${({ $liked }) => ($liked ? "#e94560" : "#555")};
  font-size: 0.85rem;
  font-family: inherit;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.15s;
  &:hover { color: #e94560; }
`;

export const CommentToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  font-size: 0.85rem;
  font-family: inherit;
  padding: 0;
  transition: color 0.15s;
  &:hover { color: #888; }
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #444;
  font-size: 0.82rem;
  font-family: inherit;
  padding: 0;
  transition: color 0.15s;
  &:hover { color: #888; }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 0.82rem;
  font-family: inherit;
  padding: 0;
  transition: color 0.15s;
  &:hover { color: #e94560; }
`;

export const DateText = styled.small`
  color: #444;
  font-size: 0.78rem;
`;

export const EditArea = styled.textarea`
  width: 100%;
  padding: 0.65rem 0.9rem;
  border-radius: 6px;
  border: 1px solid #2a2a2a;
  background: #0a0a0a;
  color: #e8e8e8;
  font-size: 0.9rem;
  font-family: inherit;
  resize: none;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #e94560; }
`;

export const EditActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

export const SaveButton = styled.button`
  padding: 0.35rem 0.9rem;
  background: #e94560;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.82rem;
  font-family: inherit;
  cursor: pointer;
  &:hover { background: #c73652; }
`;

export const CancelButton = styled.button`
  padding: 0.35rem 0.9rem;
  background: transparent;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  color: #666;
  font-size: 0.82rem;
  font-family: inherit;
  cursor: pointer;
  &:hover { border-color: #444; color: #888; }
`;

export const CommentsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  border-top: 1px solid #1a1a1a;
  padding-top: 0.75rem;
`;

export const CommentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid #1a1a1a;
  &:last-of-type { border-bottom: none; }
`;

export const CommentText = styled.div`
  color: #aaa;
  font-size: 0.85rem;
  margin: 0;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;

export const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  span {
    color: #e94560;
    font-weight: 600;
    font-size: 0.82rem;
  }
`;

export const CommentDate = styled.small`
  color: #444;
  font-size: 0.75rem;
`;

export const CommentDelete = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 0.78rem;
  font-family: inherit;
  padding: 0;
  flex-shrink: 0;
  transition: color 0.15s;
  &:hover { color: #e94560; }
`;

export const CommentForm = styled.form`
  display: flex;
  gap: 0.5rem;
`;

export const CommentInput = styled.input`
  flex: 1;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  border: 1px solid #2a2a2a;
  background: #0a0a0a;
  color: #e8e8e8;
  font-size: 0.85rem;
  font-family: inherit;
  &:focus { outline: none; border-color: #e94560; }
`;

export const CommentSubmit = styled.button`
  padding: 0.5rem 0.9rem;
  background: #e94560;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-family: inherit;
  cursor: pointer;
  &:hover { background: #c73652; }
`;
