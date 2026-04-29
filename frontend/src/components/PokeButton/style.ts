import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(16px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
`;

const slideDown = keyframes`
  from { opacity: 1; transform: translateY(0)    scale(1); }
  to   { opacity: 0; transform: translateY(16px) scale(0.97); }
`;

export const FloatBtn = styled.button`
  position: fixed;
  bottom: 92px;
  right: 28px;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.border};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  z-index: 298;
  transition: transform 0.15s, opacity 0.15s;
  &:hover { transform: scale(1.07); opacity: 0.9; }
  @media (max-width: 768px) { display: none; }
`;

export const UnreadBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background: #e05555;
  color: #fff;
  font-size: 0.62rem;
  font-weight: 700;
  border-radius: 99px;
  padding: 2px 5px;
  pointer-events: none;
`;

export const Panel = styled.div<{ $closing: boolean }>`
  position: fixed;
  bottom: 92px;
  right: 28px;
  width: 300px;
  max-height: 480px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.28);
  z-index: 400;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${({ $closing }) => ($closing ? slideDown : slideUp)} 0.22s ease both;
  @media (max-width: 768px) {
    bottom: 56px;
    right: 0;
    left: 0;
    width: auto;
    max-height: 70vh;
    border-radius: 12px 12px 0 0;
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  flex-shrink: 0;
`;

export const PanelTitle = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  flex: 1;
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textFaint};
  display: flex;
  align-items: center;
  padding: 0;
  &:hover { color: ${({ theme }) => theme.text}; }
`;

export const IconBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textFaint};
  display: flex;
  align-items: center;
  padding: 0;
  &:hover { color: ${({ theme }) => theme.text}; }
`;

export const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const Section = styled.div`
  padding: 0.5rem 0;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem 1rem;
  gap: 0.5rem;
`;

export const SectionTitle = styled.span`
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textFaint};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  flex: 1;
`;

export const RemainingBadge = styled.span<{ $ok: boolean }>`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ $ok }) => ($ok ? "#4caf50" : "#e05555")};
  background: ${({ $ok }) => ($ok ? "rgba(76,175,80,0.12)" : "rgba(224,85,85,0.12)")};
  border-radius: 99px;
  padding: 1px 7px;
`;

export const PokeNewBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.accent};
  font-family: inherit;
  padding: 0;
  &:hover { opacity: 0.75; }
`;

export const PokeItem = styled.div<{ $unseen: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  background: ${({ $unseen, theme }) => ($unseen ? `${theme.accent}12` : "transparent")};
  transition: background 0.15s;
  &:hover { background: ${({ theme }) => theme.border}; }
`;

export const PokeAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const PokeName = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PokeTime = styled.span`
  font-size: 0.73rem;
  color: ${({ theme }) => theme.textFaint};
  flex-shrink: 0;
`;

export const EmptyMsg = styled.p`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.textFaint};
  text-align: center;
  padding: 0.5rem 1rem 0.75rem;
  margin: 0;
`;

export const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.border};
  margin: 0.25rem 0;
`;

export const SearchInput = styled.input`
  margin: 0.6rem 0.75rem;
  padding: 0.45rem 0.75rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.borderAlt};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 0.85rem;
  font-family: inherit;
  &:focus { outline: none; border-color: ${({ theme }) => theme.accent}; }
`;

export const SearchResults = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 1rem;
`;

export const SearchAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const SearchName = styled.span`
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SearchMeta = styled.span`
  display: block;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textFaint};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PokeBtn = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  color: ${({ theme }) => theme.textFaint};
  flex-shrink: 0;
  transition: background 0.15s, transform 0.1s;
  &:hover:not(:disabled) { background: ${({ theme }) => theme.border}; transform: scale(1.15); }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;
