import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useThemeToggle } from "../../contexts/ThemeContext";
import coruja from "../../assets/corujapreta.png";
import { Container, Card, Title, Input, Button, ErrorMsg, LinkText } from "./style";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useThemeToggle();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/register/", form);
      navigate("/login");
    } catch {
      setError("Erro ao criar conta. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <img src={coruja} alt="coruja" onClick={toggleTheme} style={{ height: "64px", marginBottom: "1rem", filter: isDark ? "brightness(0) invert(1)" : "none", cursor: "pointer" }} />
      <Card>
        <Title>MyNET</Title>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          <Input
            placeholder="Usuário"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={form.password}
            $error={confirmTouched && form.password !== confirmPassword}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            $error={confirmTouched && form.password !== confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => setConfirmTouched(true)}
          />
          <Button type="submit" disabled={loading} $loading={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <LinkText>
          Já tem conta? <Link to="/login">Entrar</Link>
        </LinkText>
      </Card>
    </Container>
  );
}

export default RegisterPage
