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
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: visible;
`;

export const BannerSection = styled.div`
  position: relative;
`;

export const Banner = styled.div<{ $src: string | null }>`
  height: 150px;
  width: 100%;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  background: ${({ $src, theme }) => $src ? `url(${$src}) center/cover no-repeat` : theme.surfaceAlt};
`;

export const Avatar = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.surface};
  position: absolute;
  bottom: -36px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  padding: 46px 1.25rem 1.5rem;
`;

export const Username = styled.h1`
  color: ${({ theme }) => theme.text};
  margin: 0;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: -0.2px;
`;

export const UserHandle = styled.span`
  color: ${({ theme }) => theme.textSubtle};
  font-size: 0.85rem;
  margin-top: -0.25rem;
`;

export const Bio = styled.p`
  color: ${({ theme }) => theme.textSubtle};
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
  color: ${({ theme }) => theme.textFaint};
  font-size: 0.82rem;
  font-family: inherit;
  cursor: pointer;
  padding: 0;
  transition: color 0.15s;
  &:hover { color: ${({ theme }) => theme.text}; }
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
  border: 1px solid ${({ theme }) => theme.borderAlt};
  border-radius: 6px;
  color: ${({ theme }) => theme.textSubtle};
  font-size: 0.82rem;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
  &:hover { border-color: ${({ theme }) => theme.textFaint}; color: ${({ theme }) => theme.text}; }
`;


export const LogoutButton = styled.button`
  padding: 0.35rem 0.9rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.accent};
  border-radius: 6px;
  color: ${({ theme }) => theme.accent};
  font-size: 0.82rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  &:hover { background: ${({ theme }) => theme.accent}; color: ${({ theme }) => theme.accentFg}; }
`;


export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.textFaint};
  font-size: 0.78rem;
  font-weight: 500;
  margin: 0.5rem 0 0;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

export const Empty = styled.p`
  color: ${({ theme }) => theme.textGhost};
  font-size: 0.88rem;
`;
