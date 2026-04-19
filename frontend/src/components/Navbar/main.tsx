import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Nav, Logo, NavLinks, NavLink, Button } from './style';

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <Nav>
            <Logo to="/feed">MyNET</Logo>
            <NavLinks>
                <NavLink to="/feed">Feed</NavLink>
                <NavLink to="/search">Buscar</NavLink>
                <NavLink to="/profile">Perfil</NavLink>
                <NavLink to="/posts/create">+ Post</NavLink>
                <Button onClick={handleLogout}>Sair</Button>
            </NavLinks>
        </Nav>
    )
}

export default Navbar