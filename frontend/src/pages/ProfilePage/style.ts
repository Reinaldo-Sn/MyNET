import styled from "styled-components";

export const Container = styled.div`
  max-width: 580px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProfileHeader = styled.div`
  background: #111;
  border: 1px solid #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
`;

export const Avatar = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Username = styled.h1`
  color: #e8e8e8;
  margin: 0;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: -0.2px;
`;

export const Bio = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.5;
`;

export const Stats = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0.2rem 0;
`;

export const StatButton = styled.button`
  background: none;
  border: none;
  color: #555;
  font-size: 0.82rem;
  font-family: inherit;
  cursor: pointer;
  padding: 0;
  transition: color 0.15s;
  &:hover { color: #e8e8e8; }
`;

export const ProfileActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.3rem;
  align-self: flex-end;
`;

export const EditButton = styled.button`
  padding: 0.35rem 0.9rem;
  background: transparent;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  color: #666;
  font-size: 0.82rem;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
  &:hover { border-color: #555; color: #e8e8e8; }
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
`;

export const EditTextarea = styled.textarea`
  padding: 0.65rem 0.9rem;
  border-radius: 6px;
  border: 1px solid #2a2a2a;
  background: #0a0a0a;
  color: #e8e8e8;
  font-size: 0.88rem;
  font-family: inherit;
  resize: vertical;
  &::placeholder { color: #444; }
  &:focus { outline: none; border-color: #e94560; }
`;

export const EditInput = styled.input`
  color: #555;
  font-size: 0.82rem;
  font-family: inherit;
`;

export const EditActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const LogoutButton = styled.button`
  padding: 0.35rem 0.9rem;
  background: transparent;
  border: 1px solid #e94560;
  border-radius: 6px;
  color: #e94560;
  font-size: 0.82rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  &:hover { background: #e94560; color: #fff; }
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
  color: #555;
  font-size: 0.82rem;
  font-family: inherit;
  cursor: pointer;
  &:hover { border-color: #444; }
`;

export const SectionTitle = styled.h2`
  color: #555;
  font-size: 0.78rem;
  font-weight: 500;
  margin: 0.5rem 0 0;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

export const Empty = styled.p`
  color: #333;
  font-size: 0.88rem;
`;
