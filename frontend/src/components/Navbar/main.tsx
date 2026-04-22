import { useState, useEffect, useRef } from "react";
import { Sun, Moon, Menu, X, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePostContext } from "../../contexts/PostContext";
import { useThemeToggle } from "../../contexts/ThemeContext";
import api from "../../api/axios";
import coruja from "../../assets/corujapreta.png";
import {
    Nav, Logo, NavLinks, NavLink, Button, ToggleButton,
    HamburgerButton, MobileMenu, MobileNavLink, MobileActions, NavRow, OwlImg,
    BellWrapper, BellButton, Badge, Dropdown, DropdownItem, DropdownEmpty
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
    const { openModal } = usePostContext();
    const { isDark, toggleTheme } = useThemeToggle();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const bellRef = useRef<HTMLDivElement>(null);

    const closeMenu = () => setMenuOpen(false);

    const fetchNotifications = () => {
        api.get("/notifications/").then((res) => setNotifications(res.data)).catch(() => {});
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
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

    const handleBellClick = () => {
        if (!dropdownOpen && notifications.length > 0) {
            api.post("/notifications/mark-read/").then(() => {
                setDropdownOpen(true);
            });
        } else {
            setDropdownOpen((prev) => !prev);
        }
    };

    const handleNotificationClick = (n: Notification) => {
        setDropdownOpen(false);
        setNotifications([]);
        if (n.type === 'like' && n.post_id) {
            navigate(`/posts/${n.post_id}`);
        } else {
            navigate(`/users/${n.sender_id}`);
        }
    };

    return (
        <Nav>
            <NavRow>
                <Logo to="/feed">MyNET<OwlImg src={coruja} alt="coruja" /></Logo>

                <NavLinks>
                    <NavLink to="/feed">Página inicial</NavLink>
                    <NavLink to="/search">Buscar</NavLink>
                    <NavLink to="/profile">Perfil</NavLink>
                    <Button onClick={openModal}>Postar</Button>
                    <BellWrapper ref={bellRef}>
                        <BellButton onClick={handleBellClick}>
                            <Bell size={18} />
                        </BellButton>
                        {notifications.length > 0 && <Badge>{notifications.length}</Badge>}
                        {dropdownOpen && (
                            <Dropdown>
                                {notifications.length === 0
                                    ? <DropdownEmpty>Nenhuma notificação.</DropdownEmpty>
                                    : notifications.map((n) => (
                                        <DropdownItem key={n.id} onClick={() => handleNotificationClick(n)}>
                                            <strong>{n.sender_display}</strong>{' '}
                                            <span>{n.type === 'like' ? 'curtiu seu post' : 'começou a te seguir'}</span>
                                        </DropdownItem>
                                    ))
                                }
                            </Dropdown>
                        )}
                    </BellWrapper>
                    <ToggleButton onClick={toggleTheme}>
                        {isDark ? <Sun size={16} /> : <Moon size={16} />}
                    </ToggleButton>
                </NavLinks>

                <HamburgerButton onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </HamburgerButton>
            </NavRow>

            <MobileMenu $open={menuOpen}>
                <MobileNavLink to="/feed" onClick={closeMenu}>Página inicial</MobileNavLink>
                <MobileNavLink to="/search" onClick={closeMenu}>Explorar</MobileNavLink>
                <MobileNavLink to="/profile" onClick={closeMenu}>Perfil</MobileNavLink>
                <MobileActions>
                    <Button onClick={() => { openModal(); closeMenu(); }}>Postar</Button>
                    <ToggleButton onClick={toggleTheme}>
                        {isDark ? <Sun size={16} /> : <Moon size={16} />}
                    </ToggleButton>
                </MobileActions>
            </MobileMenu>
        </Nav>
    );
};

export default Navbar;
