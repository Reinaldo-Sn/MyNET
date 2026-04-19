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
  gap: 0.5rem;
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

export const FollowButton = styled.button<{ $following: boolean }>`
  align-self: flex-start;
  margin-top: 0.3rem;
  padding: 0.35rem 0.9rem;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  ${({ $following }) => $following
    ? `background: transparent; border: 1px solid #2a2a2a; color: #555;
       &:hover { border-color: #555; color: #e8e8e8; }`
    : `background: #e94560; border: 1px solid #e94560; color: white;
       &:hover { background: #c73652; border-color: #c73652; }`
  }
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
