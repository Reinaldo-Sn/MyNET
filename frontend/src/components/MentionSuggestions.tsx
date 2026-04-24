import styled from "styled-components";
import defaultAvatar from "../assets/perfil_padrao.png";
import { MentionUser } from "../hooks/useMentionInput";

const Dropdown = styled.div`
  position: absolute;
  bottom: calc(100% + 4px);
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  z-index: 300;
  overflow: hidden;
  max-height: 200px;
  overflow-y: auto;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 0.75rem;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: ${({ theme }) => theme.surfaceAlt}; }
`;

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const Name = styled.span`
  font-size: 0.83rem;
  color: ${({ theme }) => theme.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Handle = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textFaint};
  margin-left: auto;
  flex-shrink: 0;
`;

interface Props {
  results: MentionUser[];
  onSelect: (username: string) => void;
}

const MentionSuggestions = ({ results, onSelect }: Props) => {
  if (results.length === 0) return null;
  return (
    <Dropdown>
      {results.map((u) => (
        <Item key={u.id} onMouseDown={(e) => { e.preventDefault(); onSelect(u.username); }}>
          <Avatar src={u.avatar || defaultAvatar} alt={u.username} />
          <Name>{u.display_name || u.username}</Name>
          <Handle>@{u.username}</Handle>
        </Item>
      ))}
    </Dropdown>
  );
};

export default MentionSuggestions;
