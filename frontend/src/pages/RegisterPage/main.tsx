import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { Container, Card, Title, Input, Button, ErrorMsg, LinkText } from "./style";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register/", form);
      navigate("/login");
    } catch {
      setError("Erro ao criar conta. Verifique os dados.");
    }
  };

  return (
    <Container>
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
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button type="submit">Cadastrar</Button>
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
