import { useEffect, useState, useRef, FormEvent } from "react";
import { MessageSquare, ChevronDown, ArrowLeft, SquarePen } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import defaultAvatar from "../../assets/perfil_padrao.png";
import { timeAgo } from "../../utils/timeAgo";
import { isGifUrl } from "../../utils/gif";
import {
  FloatBtn, UnreadBadge, Panel, PanelHeader, PanelTitle, CloseBtn, IconBtn,
  Sidebar, SidebarTitle, ConvItem, ConvAvatar, ConvInfo, ConvName,
  ConvLast, ConvBadge, Chat, ChatHeader, ChatHeaderAvatar, ChatHeaderName,
  MessagesList, BubbleWrap, BubbleTime, Bubble, BubbleGif, Form, FormRow,
  Input, SendBtn, EmptySidebar, SearchInput, SearchResults, SearchResultItem,
} from "./style";

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
}

interface UserResult {
  id: number;
  username: string;
  display_name: string;
  avatar: string | null;
}

type View = "conversations" | "search" | "chat";

const DMButton = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [view, setView] = useState<View>("conversations");
  const [unread, setUnread] = useState(0);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedConvData, setSelectedConvData] = useState<{ username: string; display_name: string; avatar: string | null } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserResult[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const prevUnreadRef = useRef(0);
  const prevMsgCountRef = useRef(0);

  const playNotif = () => {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {}
  };

  const fetchUnread = () =>
    api.get("/dms/unread/").then((r) => {
      const count = r.data.count;
      if (count > prevUnreadRef.current) playNotif();
      prevUnreadRef.current = count;
      setUnread(count);
    }).catch(() => {});

  const fetchConversations = () =>
    api.get("/dms/conversations/").then((r) => setConversations(r.data)).catch(() => {});

  const fetchMessages = (uid: number) =>
    api.get(`/dms/?recipient=${uid}`).then((r) => {
      const msgs: Message[] = r.data;
      const newFromOther = msgs.filter((m) => m.sender !== user!.id);
      if (newFromOther.length > prevMsgCountRef.current) playNotif();
      prevMsgCountRef.current = newFromOther.length;
      setMessages(msgs);
      fetchConversations();
      fetchUnread();
    }).catch(() => {});

  useEffect(() => {
    fetchUnread();
    const interval = setInterval(fetchUnread, 20000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!open) return;
    fetchConversations();
  }, [open]);

  useEffect(() => {
    if (!selectedId || view !== "chat") return;
    fetchMessages(selectedId);
    const interval = setInterval(() => fetchMessages(selectedId), 15000);
    return () => clearInterval(interval);
  }, [selectedId, view]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (view === "chat") inputRef.current?.focus();
    if (view === "search") searchRef.current?.focus();
  }, [view]);

  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    const timeout = setTimeout(() => {
      api.get(`/auth/users/?search=${searchQuery}`).then((r) => setSearchResults(r.data.results ?? r.data)).catch(() => {});
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const openChat = (uid: number, convData: { username: string; display_name: string; avatar: string | null }) => {
    setSelectedId(uid);
    setSelectedConvData(convData);
    setView("chat");
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSelectConv = (c: Conversation) => {
    openChat(c.user_id, { username: c.username, display_name: c.display_name, avatar: c.avatar });
  };

  const handleSelectSearchResult = (u: UserResult) => {
    openChat(u.id, { username: u.username, display_name: u.display_name, avatar: u.avatar });
  };

  const closePanel = () => {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 220);
  };

  useEffect(() => {
    if (!open) return;
    const handler = () => closePanel();
    window.addEventListener('poke-panel-open', handler);
    return () => window.removeEventListener('poke-panel-open', handler);
  }, [open]);

  useEffect(() => {
    const handler = () => handleOpen();
    window.addEventListener('dm-panel-toggle', handler);
    return () => window.removeEventListener('dm-panel-toggle', handler);
  }, [open]);

  const handleOpen = () => {
    if (open) { closePanel(); return; }
    window.dispatchEvent(new CustomEvent('dm-panel-open'));
    setView("conversations");
    setSelectedId(null);
    setOpen(true);
  };

  const handleBack = () => {
    if (view === "chat" || view === "search") {
      setView("conversations");
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const [sendError, setSendError] = useState("");

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !selectedId) return;
    const content = text;
    setText("");
    setSendError("");
    try {
      await api.post("/dms/", { recipient: selectedId, content });
      fetchMessages(selectedId);
    } catch (err: any) {
      const msg = err?.response?.data?.detail;
      if (msg) setSendError(msg);
    }
  };

  const displayConv = selectedConvData ?? conversations.find((c) => c.user_id === selectedId);

  return (
    <>
      {open && (
        <Panel $closing={closing}>
          <PanelHeader>
            {view !== "conversations" ? (
              <IconBtn onClick={handleBack}><ArrowLeft size={16} /></IconBtn>
            ) : null}

            {view === "chat" && displayConv
              ? <PanelTitle
                  style={{ cursor: "pointer" }}
                  onClick={() => { closePanel(); navigate(`/users/${selectedId}`); }}
                >
                  {displayConv.display_name || displayConv.username}
                </PanelTitle>
              : <PanelTitle>{view === "search" ? "Nova conversa" : "Bate-papo"}</PanelTitle>
            }

            {view === "conversations" && (
              <IconBtn onClick={() => setView("search")} title="Nova conversa">
                <SquarePen size={16} />
              </IconBtn>
            )}
            <CloseBtn onClick={closePanel}><ChevronDown size={18} /></CloseBtn>
          </PanelHeader>

          {view === "conversations" && (
            <Sidebar>
              {conversations.length === 0
                ? <EmptySidebar>
                    Nenhuma conversa ainda.<br />
                    <span style={{ fontSize: "0.8rem" }}>Clique em <SquarePen size={12} style={{ verticalAlign: "middle" }} /> para começar.</span>
                  </EmptySidebar>
                : conversations.map((c) => (
                  <ConvItem key={c.user_id} onClick={() => handleSelectConv(c)}>
                    <ConvAvatar src={c.avatar || defaultAvatar} alt={c.username} />
                    <ConvInfo>
                      <ConvName>{c.display_name || c.username}</ConvName>
                      <ConvLast>{isGifUrl(c.last_message) ? "GIF" : c.last_message}</ConvLast>
                    </ConvInfo>
                    {c.unread_count > 0 && <ConvBadge>{c.unread_count}</ConvBadge>}
                  </ConvItem>
                ))
              }
            </Sidebar>
          )}

          {view === "search" && (
            <Sidebar>
              <SearchInput
                ref={searchRef}
                placeholder="Buscar usuário..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchResults>
                {searchResults.map((u) => (
                  <SearchResultItem key={u.id} onClick={() => handleSelectSearchResult(u)}>
                    <ConvAvatar src={u.avatar || defaultAvatar} alt={u.username} />
                    <ConvInfo>
                      <ConvName>{u.display_name || u.username}</ConvName>
                      <ConvLast>@{u.username}</ConvLast>
                    </ConvInfo>
                  </SearchResultItem>
                ))}
              </SearchResults>
            </Sidebar>
          )}

          {view === "chat" && (
            <Chat>
              {displayConv && (
                <ChatHeader onClick={() => { closePanel(); navigate(`/users/${selectedId}`); }}>
                  <ChatHeaderAvatar src={displayConv.avatar || defaultAvatar} alt={displayConv.username} />
                  <ChatHeaderName>{displayConv.display_name || displayConv.username}</ChatHeaderName>
                </ChatHeader>
              )}
              <MessagesList>
                {messages.map((m, i) => {
                  const mine = m.sender === user!.id;
                  const showTime = i === 0 || messages[i - 1].sender !== m.sender;
                  return (
                    <BubbleWrap key={m.id} $mine={mine}>
                      {showTime && <BubbleTime $mine={mine}>{timeAgo(m.created_at)}</BubbleTime>}
                      {isGifUrl(m.content)
                        ? <BubbleGif $mine={mine} src={m.content} alt="gif" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                        : <Bubble $mine={mine}>{m.content}</Bubble>
                      }
                    </BubbleWrap>
                  );
                })}
                <div ref={bottomRef} />
              </MessagesList>
              {sendError && (
                <div style={{ padding: "6px 12px", fontSize: "0.78rem", color: "#e05555" }}>
                  {sendError}
                </div>
              )}
              <Form onSubmit={handleSend}>
                <FormRow>
                  <Input
                    ref={inputRef}
                    value={text}
                    onChange={(e) => { setText(e.target.value); setSendError(""); }}
                    placeholder="Mensagem..."
                    maxLength={1000}
                  />
                  <SendBtn type="submit">Enviar</SendBtn>
                </FormRow>
              </Form>
            </Chat>
          )}
        </Panel>
      )}

      {(!open || closing) && (
        <FloatBtn onClick={handleOpen}>
          <MessageSquare size={22} />
          {unread > 0 && <UnreadBadge>{unread > 9 ? "9+" : unread}</UnreadBadge>}
        </FloatBtn>
      )}
    </>
  );
};

export default DMButton;
