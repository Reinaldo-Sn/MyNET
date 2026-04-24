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
  bottom: 28px;
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
  z-index: 300;
  transition: transform 0.15s, opacity 0.15s;
  &:hover { transform: scale(1.07); opacity: 0.9; }
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
  bottom: 28px;
  right: 28px;
  width: 340px;
  height: 480px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  z-index: 299;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform-origin: bottom right;
  animation: ${({ $closing }) => $closing ? slideDown : slideUp} 0.22s ease forwards;
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  flex-shrink: 0;
`;

export const PanelTitle = styled.span`
  flex: 1;
  font-weight: 600;
  font-size: 0.9rem;
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

export const IconBtn = styled.button`
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

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
  box-sizing: border-box;
  &::placeholder { color: ${({ theme }) => theme.textMuted}; }
`;

export const SearchResults = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  transition: background 0.12s;
  &:hover { background: ${({ theme }) => theme.surfaceAlt}; }
`;

export const Sidebar = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const SidebarTitle = styled.div`
  padding: 10px 14px;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ConvItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  cursor: pointer;
  border-top: 1px solid ${({ theme }) => theme.border};
  transition: background 0.12s;
  &:hover { background: ${({ theme }) => theme.surfaceAlt}; }
`;

export const ConvAvatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const ConvInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ConvName = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

export const ConvLast = styled.div`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.textMuted};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ConvBadge = styled.span`
  background: #e05555;
  color: #fff;
  font-size: 0.62rem;
  font-weight: 700;
  border-radius: 99px;
  padding: 2px 6px;
  flex-shrink: 0;
`;

export const Chat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  flex-shrink: 0;
  &:hover { background: ${({ theme }) => theme.surfaceAlt}; }
`;

export const ChatHeaderAvatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ChatHeaderName = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

export const MessagesList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BubbleWrap = styled.div<{ $mine: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $mine }) => ($mine ? "flex-end" : "flex-start")};
`;

export const BubbleTime = styled.span<{ $mine: boolean }>`
  font-size: 0.68rem;
  color: ${({ theme }) => theme.textMuted};
  margin-bottom: 2px;
`;

export const Bubble = styled.div<{ $mine: boolean }>`
  max-width: 78%;
  padding: 7px 11px;
  border-radius: 12px;
  background: ${({ $mine, theme }) => ($mine ? theme.accent : theme.surfaceAlt)};
  color: ${({ $mine, theme }) => ($mine ? theme.accentFg : theme.text)};
  font-size: 0.85rem;
  line-height: 1.4;
  word-break: break-word;
`;

export const BubbleGif = styled.img<{ $mine: boolean }>`
  max-width: 200px;
  max-height: 160px;
  border-radius: 10px;
  display: block;
  object-fit: contain;
  align-self: ${({ $mine }) => ($mine ? "flex-end" : "flex-start")};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 12px;
  border-top: 1px solid ${({ theme }) => theme.border};
  flex-shrink: 0;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const GifBtn = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.72rem;
  font-weight: 700;
  font-family: inherit;
  padding: 4px 7px;
  cursor: pointer;
  flex-shrink: 0;
  transition: color 0.15s, border-color 0.15s;
  &:hover { color: ${({ theme }) => theme.text}; border-color: ${({ theme }) => theme.textMuted}; }
`;

export const Input = styled.input`
  flex: 1;
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 0.85rem;
  font-family: inherit;
  outline: none;
  &:focus { border-color: ${({ theme }) => theme.textMuted}; }
`;

export const SendBtn = styled.button`
  padding: 7px 13px;
  border-radius: 8px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.accentFg};
  border: none;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  font-family: inherit;
  transition: opacity 0.15s;
  &:hover { opacity: 0.85; }
`;

export const EmptyChat = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.875rem;
`;

export const EmptySidebar = styled.div`
  padding: 24px 14px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textMuted};
  text-align: center;
`;
