import { useEffect, useState, useRef } from "react";
import { ChevronDown, ArrowLeft, Hand } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import defaultAvatar from "../../assets/perfil_padrao.png";
import { timeAgo } from "../../utils/timeAgo";
import {
  FloatBtn, UnreadBadge, Panel, PanelHeader, PanelTitle, CloseBtn, IconBtn,
  Body, Section, SectionHeader, SectionTitle, RemainingBadge, PokeNewBtn,
  PokeItem, PokeAvatar, PokeName, PokeTime, EmptyMsg, Divider,
  SearchInput, SearchResults, SearchResultItem, SearchAvatar, SearchName, SearchMeta, PokeBtn,
} from "./style";

interface PokeUser {
  id: number;
  username: string;
  display: string;
  avatar: string | null;
}

interface PokeEntry {
  id: number;
  sender: PokeUser;
  receiver: PokeUser;
  created_at: string;
  is_seen: boolean;
}

interface UserResult {
  id: number;
  username: string;
  display_name: string;
  avatar: string | null;
}

type View = "main" | "search";

const PokeButton = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [view, setView] = useState<View>("main");
  const [unseen, setUnseen] = useState(0);
  const [received, setReceived] = useState<PokeEntry[]>([]);
  const [sent, setSent] = useState<PokeEntry[]>([]);
  const [remaining, setRemaining] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserResult[]>([]);
  const [poking, setPoking] = useState<number | null>(null);
  const [pokeMsg, setPokeMsg] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const fetchPokes = () =>
    api.get("/pokes/").then((r) => {
      setReceived(r.data.received);
      setSent(r.data.sent);
      setRemaining(r.data.remaining_today);
      setUnseen(r.data.unseen_count);
    }).catch(() => {});

  useEffect(() => {
    api.get("/pokes/").then((r) => setUnseen(r.data.unseen_count)).catch(() => {});
    const interval = setInterval(() => {
      api.get("/pokes/").then((r) => setUnseen(r.data.unseen_count)).catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!open) return;
    fetchPokes();
    api.post("/pokes/mark-seen/").catch(() => {});
  }, [open]);

  useEffect(() => {
    if (view === "search") searchRef.current?.focus();
  }, [view]);

  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    const timeout = setTimeout(() => {
      api.get(`/auth/users/?search=${searchQuery}`).then((r) => setSearchResults(r.data.results ?? r.data)).catch(() => {});
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const closePanel = () => {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 220);
  };

  useEffect(() => {
    if (!open) return;
    const handler = () => closePanel();
    window.addEventListener('dm-panel-open', handler);
    return () => window.removeEventListener('dm-panel-open', handler);
  }, [open]);

  const handleOpen = () => {
    if (open) { closePanel(); return; }
    window.dispatchEvent(new CustomEvent('poke-panel-open'));
    setView("main");
    setOpen(true);
    setUnseen(0);
  };

  const goSearch = () => {
    setView("search");
    setPokeMsg("");
  };

  const goBack = () => {
    setView("main");
    setSearchQuery("");
    setSearchResults([]);
    setPokeMsg("");
  };

  const handlePoke = async (userId: number) => {
    setPoking(userId);
    setPokeMsg("");
    try {
      await api.post(`/pokes/${userId}/`);
      setPokeMsg("Cutucada enviada! 👉");
      fetchPokes();
    } catch (err: any) {
      setPokeMsg(err?.response?.data?.detail || "Erro ao cutucar.");
    } finally {
      setPoking(null);
    }
  };

  return (
    <>
      {open && (
        <Panel $closing={closing}>
          <PanelHeader>
            {view !== "main" && (
              <IconBtn onClick={goBack}><ArrowLeft size={16} /></IconBtn>
            )}
            <PanelTitle>{view === "search" ? "Cutucar alguém" : "Cutucadas"}</PanelTitle>
            <CloseBtn onClick={closePanel}><ChevronDown size={18} /></CloseBtn>
          </PanelHeader>

          {view === "main" && (
            <Body>
              <Section>
                <SectionHeader>
                  <SectionTitle>Hoje</SectionTitle>
                  <RemainingBadge $ok={remaining > 0}>{remaining}/5 restantes</RemainingBadge>
                  <PokeNewBtn onClick={goSearch}>+ cutucar</PokeNewBtn>
                </SectionHeader>
              </Section>

              <Divider />

              <Section>
                <SectionHeader>
                  <SectionTitle>Quem te cutucou</SectionTitle>
                </SectionHeader>
                {received.length === 0
                  ? <EmptyMsg>Ninguém ainda.</EmptyMsg>
                  : received.map((p) => (
                    <PokeItem
                      key={p.id}
                      $unseen={!p.is_seen}
                      onClick={() => { closePanel(); navigate(`/users/${p.sender.id}`); }}
                    >
                      <PokeAvatar src={p.sender.avatar || defaultAvatar} alt={p.sender.username} />
                      <PokeName style={{ flex: 1 }}>{p.sender.display || p.sender.username}</PokeName>
                      <PokeTime>{timeAgo(p.created_at)}</PokeTime>
                    </PokeItem>
                  ))
                }
              </Section>

              <Divider />

              <Section>
                <SectionHeader>
                  <SectionTitle>Quem você cutucou</SectionTitle>
                </SectionHeader>
                {sent.length === 0
                  ? <EmptyMsg>Você ainda não cutucou ninguém.</EmptyMsg>
                  : sent.map((p) => (
                    <PokeItem
                      key={p.id}
                      $unseen={false}
                      onClick={() => { closePanel(); navigate(`/users/${p.receiver.id}`); }}
                    >
                      <PokeAvatar src={p.receiver.avatar || defaultAvatar} alt={p.receiver.username} />
                      <PokeName style={{ flex: 1 }}>{p.receiver.display || p.receiver.username}</PokeName>
                      <PokeTime>{timeAgo(p.created_at)}</PokeTime>
                    </PokeItem>
                  ))
                }
              </Section>
            </Body>
          )}

          {view === "search" && (
            <Body>
              <SearchInput
                ref={searchRef}
                placeholder="Buscar usuário para cutucar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {pokeMsg && (
                <div style={{
                  padding: "4px 1rem 6px",
                  fontSize: "0.8rem",
                  color: pokeMsg.includes("👉") ? "#4caf50" : "#e05555",
                }}>
                  {pokeMsg}
                </div>
              )}
              <SearchResults>
                {searchResults.map((u) => (
                  <SearchResultItem key={u.id}>
                    <SearchAvatar src={u.avatar || defaultAvatar} alt={u.username} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <SearchName>{u.display_name || u.username}</SearchName>
                      <SearchMeta>@{u.username}</SearchMeta>
                    </div>
                    <PokeBtn
                      onClick={() => handlePoke(u.id)}
                      disabled={poking === u.id || remaining === 0}
                      title={remaining === 0 ? "Sem cutucadas restantes hoje" : "Cutucar"}
                    >
                      <Hand size={15} />
                    </PokeBtn>
                  </SearchResultItem>
                ))}
              </SearchResults>
            </Body>
          )}
        </Panel>
      )}

      {(!open || closing) && (
        <FloatBtn onClick={handleOpen}>
          <Hand size={22} />
          {unseen > 0 && <UnreadBadge>{unseen > 9 ? "9+" : unseen}</UnreadBadge>}
        </FloatBtn>
      )}
    </>
  );
};

export default PokeButton;
