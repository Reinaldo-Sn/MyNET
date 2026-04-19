import styled from "styled-components";

export const Container = styled.div`
  max-width: 580px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h1`
  color: #e8e8e8;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.2px;
`;

export const SearchForm = styled.form`
  display: flex;
  gap: 0.6rem;
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.65rem 0.9rem;
  border-radius: 6px;
  border: 1px solid #2a2a2a;
  background: #111;
  color: #e8e8e8;
  font-size: 0.9rem;
  font-family: inherit;
  &::placeholder { color: #444; }
  &:focus { outline: none; border-color: #e94560; }
`;

export const Button = styled.button`
  padding: 0.65rem 1.1rem;
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
`;

export const UserCard = styled.div`
  background: #111;
  border: 1px solid #1e1e1e;
  border-radius: 8px;
  padding: 0.75rem 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  transition: border-color 0.15s;
  &:hover { border-color: #333; }
`;

export const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;

export const UserName = styled.strong`
  color: #e8e8e8;
  font-size: 0.9rem;
  font-weight: 500;
`;

export const Followers = styled.p`
  color: #555;
  font-size: 0.8rem;
  margin: 0;
`;
