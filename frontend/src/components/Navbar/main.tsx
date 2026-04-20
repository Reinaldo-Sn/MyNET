import { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { usePostContext } from "../../contexts/PostContext";
import { useThemeToggle } from "../../contexts/ThemeContext";
import {
    Nav, Logo, NavLinks, NavLink, Button, ToggleButton,
    HamburgerButton, MobileMenu, MobileNavLink, MobileActions, NavRow
} from './style';

const Navbar = () => {
    const { openModal } = usePostContext();
    const { isDark, toggleTheme } = useThemeToggle();
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <Nav>
            <NavRow>
                <Logo to="/feed">MyNET</Logo>

                <NavLinks>
                    <NavLink to="/feed">Página inicial</NavLink>
                    <NavLink to="/search">Buscar</NavLink>
                    <NavLink to="/profile">Perfil</NavLink>
                    <Button onClick={openModal}>Postar</Button>
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
