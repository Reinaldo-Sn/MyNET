import { useState, useEffect, useRef } from "react";
import { Sun, Moon, Bell, Home, Search, User, Hand } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useThemeToggle } from "../../contexts/ThemeContext";
import api from "../../api/axios";
import coruja from "../../assets/corujapreta.png";
import {
    Nav, Logo, NavLinks, NavLink,
    NavRow, NavRight, OwlImg,
    BellWrapper, BellButton, Badge, Dropdown, DropdownItem, DropdownEmpty,
    DropdownHeader, MarkAllBtn,
    MobileThemeBtn, MobilePokeBtn,
} from './style';

interface Notification {
    id: number;
    type: string;
    sender_id: number;
    sender_display: string;
    post_id: number | null;
    created_at: string;
}

const Navbar = () => {
    const { isDark, toggleTheme } = useThemeToggle();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [pokeUnseen, setPokeUnseen] = useState(0);
    const bellRef = useRef<HTMLDivElement>(null);

    const fetchNotifications = () => {
        api.get("/notifications/").then((res) => setNotifications(res.data)).catch(() => {});
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetch = () =>
            api.get("/pokes/").then((r) => setPokeUnseen(r.data.unseen_count)).catch(() => {});
        fetch();
        const interval = setInterval(fetch, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleBellClick = () => setDropdownOpen((prev) => !prev);

    const handleNotificationClick = (n: Notification) => {
        api.post(`/notifications/${n.id}/mark-read/`).catch(() => {});
        setNotifications((prev) => prev.filter((x) => x.id !== n.id));
        setDropdownOpen(false);
        if (n.post_id) {
            navigate(`/posts/${n.post_id}`);
        } else {
            navigate(`/users/${n.sender_id}`);
        }
    };

    const handleMarkAllRead = async () => {
        await api.post("/notifications/mark-read/").catch(() => {});
        setNotifications([]);
        setDropdownOpen(false);
    };

    const handlePokeToggle = () => {
        window.dispatchEvent(new CustomEvent("poke-panel-toggle"));
    };

    return (
        <Nav>
            <NavRow>
                <Logo to="/feed">MyNET<OwlImg src={coruja} alt="coruja" /></Logo>

                <NavRight>
                    <NavLinks>
                        <NavLink to="/feed">Página inicial <Home size={14} /></NavLink>
                        <NavLink to="/search">Buscar <Search size={14} /></NavLink>
                        <NavLink to="/profile">Perfil <User size={14} /></NavLink>
                    </NavLinks>

                    <MobilePokeBtn onClick={handlePokeToggle}>
                        <Hand size={18} />
                        {pokeUnseen > 0 && <Badge>{pokeUnseen > 9 ? "9+" : pokeUnseen}</Badge>}
                    </MobilePokeBtn>

                    <BellWrapper ref={bellRef}>
                        <BellButton onClick={handleBellClick}>
                            <Bell size={18} />
                        </BellButton>
                        {notifications.length > 0 && <Badge>{notifications.length}</Badge>}
                        {dropdownOpen && (
                            <Dropdown>
                                {notifications.length === 0
                                    ? <DropdownEmpty>Nenhuma notificação.</DropdownEmpty>
                                    : <>
                                        <DropdownHeader>
                                            <span style={{ fontSize: "0.78rem", opacity: 0.5 }}>Notificações</span>
                                            <MarkAllBtn onClick={handleMarkAllRead}>Marcar todas como lidas</MarkAllBtn>
                                        </DropdownHeader>
                                        {notifications.map((n) => (
                                            <DropdownItem key={n.id} onClick={() => handleNotificationClick(n)}>
                                                <strong>{n.sender_display}</strong>{' '}
                                                <span>
                                                    {n.type === 'like' ? 'curtiu seu post'
                                                    : n.type === 'comment_reply' ? 'respondeu seu comentário'
                                                    : n.type === 'poke' ? 'te cutucou'
                                                    : n.type === 'mention' ? 'te mencionou em um post'
                                                    : 'começou a te seguir'}
                                                </span>
                                            </DropdownItem>
                                        ))}
                                    </>
                                }
                            </Dropdown>
                        )}
                    </BellWrapper>

                    <MobileThemeBtn onClick={toggleTheme}>
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </MobileThemeBtn>
                </NavRight>
            </NavRow>
        </Nav>
    );
};

export default Navbar;
