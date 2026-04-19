import styled from "styled-components";

export const Container = styled.div`
  max-width: 580px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Empty = styled.p`
  color: #444;
  text-align: center;
  margin-top: 3rem;
  font-size: 0.9rem;
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.65rem 1rem;
  border: 1px solid #ddd;
  border-radius: 999px;
  font-size: 0.95rem;
  outline: none;
  box-sizing: border-box;
  background: #f9f9f9;

  &:focus {
    border-color: #1d9bf0;
    background: #fff;
  }
`;

export const SearchResults = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
`;

export const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

export const UserAvatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
`;

export const Followers = styled.span`
  font-size: 0.78rem;
  color: #666;
`;

export const QuickPost = styled.form`
  background: #111;
  border: 1px solid #1e1e1e;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const QuickTextarea = styled.textarea`
  width: 100%;
  padding: 0.6rem 0.8rem;
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

export const QuickFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CharCount = styled.span<{ $over: boolean }>`
  font-size: 0.78rem;
  color: ${({ $over }) => ($over ? "#e94560" : "#555")};
`;

export const QuickButton = styled.button`
  align-self: flex-end;
  padding: 0.45rem 1.2rem;
  background: #e94560;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: #c73652; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

export const SearchMessage = styled.p`
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  color: #666;
  margin: 0;
`;
