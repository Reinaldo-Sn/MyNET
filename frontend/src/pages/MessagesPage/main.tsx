import { useEffect, useState, useRef, FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";
import defaultAvatar from "../../assets/perfil_padrao.png";
import { timeAgo } from "../../utils/timeAgo";
import styled from "styled-components";

interface Conversation {
  user_id: number;
  username: string;
  display_name: string;
  avatar: string | null;
  last_message: string;
  last_message_at: string | null;
  unread_count: number;
}

interface Message {
  id: number;
  sender: number;
  recipient: number;
  content: string;
  is_read: boolean;
  created_at: string;
  sender_username: string;
  sender_avatar: string | null;
}

const Wrap = styled.div`
  display: flex;
  height: calc(100vh - 72px);
  max-width: 860px;
  margin: 1rem auto;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  overflow: hidden;
  background: ${({ theme }) => theme.surface};
`;

const Sidebar = styled.div`
  width: 260px;
  border-right: 1px solid ${({ theme }) => theme.border};
  overflow-y: auto;
  flex-shrink: 0;
`;

const SidebarTitle = styled.div`
  padding: 14px 16px;
  font-weight: 600;
  font-size: 0.95rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
`;

const ConvItem = styled.div<{ $active: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  background: ${({ $active, theme }) => ($active ? theme.surfaceAlt : "transparent")};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover { background: ${({ theme }) => theme.surfaceAlt}; }
`;

const ConvAvatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

const ConvInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ConvName = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const ConvLast = styled.div`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.textMuted};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const UnreadBadge = styled.span`
  background: #e05555;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  border-radius: 99px;
  padding: 2px 6px;
  flex-shrink: 0;
`;

const Chat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const ChatHeader = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  font-weight: 600;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  &:hover { color: ${({ theme }) => theme.textMuted}; }
`;

const MessagesList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Bubble = styled.div<{ $mine: boolean }>`
  max-width: 68%;
  padding: 8px 12px;
  border-radius: 14px;
  align-self: ${({ $mine }) => ($mine ? "flex-end" : "flex-start")};
  background: ${({ $mine, theme }) => ($mine ? theme.accent : theme.surfaceAlt)};
  color: ${({ $mine, theme }) => ($mine ? theme.accentFg : theme.text)};
  font-size: 0.875rem;
  word-break: break-word;
  line-height: 1.4;
`;

const BubbleTime = styled.div<{ $mine: boolean }>`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.textMuted};
  align-self: ${({ $mine }) => ($mine ? "flex-end" : "flex-start")};
  margin-bottom: 4px;
`;

const Form = styled.form`
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
  &:focus { border-color: ${({ theme }) => theme.textMuted}; }
`;

const SendBtn = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.accentFg};
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  transition: opacity 0.15s;
  &:hover { opacity: 0.85; }
`;

const EmptyChat = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.9rem;
`;

const EmptySidebar = styled.div`
  padding: 24px 16px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textMuted};
  text-align: center;
`;

const MessagesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchConversations = () =>
    api.get("/dms/conversations/").then((r) => setConversations(r.data)).catch(() => {});

  const fetchMessages = (uid: number) =>
    api.get(`/dms/?recipient=${uid}`).then((r) => {
      setMessages(r.data);
      fetchConversations();
    }).catch(() => {});

  useEffect(() => {
    fetchConversations();
    const uid = searchParams.get("user");
    if (uid) setSelectedId(Number(uid));
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    fetchMessages(selectedId);
    const interval = setInterval(() => fetchMessages(selectedId), 15000);
    return () => clearInterval(interval);
  }, [selectedId]);

  useEffect(() => {
    const interval = setInterval(fetchConversations, 20000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (selectedId) inputRef.current?.focus();
  }, [selectedId]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !selectedId) return;
    const content = text;
    setText("");
    await api.post("/dms/", { recipient: selectedId, content });
    fetchMessages(selectedId);
  };

  const selectedConv = conversations.find((c) => c.user_id === selectedId);

  return (
    <Wrap>
      <Sidebar>
        <SidebarTitle>Mensagens</SidebarTitle>
        {conversations.length === 0
          ? <EmptySidebar>Nenhuma conversa ainda.</EmptySidebar>
          : conversations.map((c) => (
            <ConvItem key={c.user_id} $active={c.user_id === selectedId} onClick={() => setSelectedId(c.user_id)}>
              <ConvAvatar src={c.avatar || defaultAvatar} alt={c.username} />
              <ConvInfo>
                <ConvName>{c.display_name || c.username}</ConvName>
                <ConvLast>{c.last_message}</ConvLast>
              </ConvInfo>
              {c.unread_count > 0 && <UnreadBadge>{c.unread_count}</UnreadBadge>}
            </ConvItem>
          ))
        }
      </Sidebar>

      <Chat>
        {selectedId ? (
          <>
            {selectedConv && (
              <ChatHeader onClick={() => navigate(`/users/${selectedConv.user_id}`)}>
                {selectedConv.display_name || selectedConv.username}
              </ChatHeader>
            )}
            <MessagesList>
              {messages.map((m, i) => {
                const mine = m.sender === user!.id;
                const showTime = i === 0 || messages[i - 1].sender !== m.sender;
                return (
                  <div key={m.id} style={{ display: "flex", flexDirection: "column" }}>
                    {showTime && <BubbleTime $mine={mine}>{timeAgo(m.created_at)}</BubbleTime>}
                    <Bubble $mine={mine}>{m.content}</Bubble>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </MessagesList>
            <Form onSubmit={handleSend}>
              <Input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Mensagem..."
                maxLength={1000}
              />
              <SendBtn type="submit">Enviar</SendBtn>
            </Form>
          </>
        ) : (
          <EmptyChat>Selecione uma conversa para começar</EmptyChat>
        )}
      </Chat>
    </Wrap>
  );
};

export default MessagesPage;
