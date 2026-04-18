import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form.username, form.password);
            navigate('/feed');
        } catch {
            setError('Usuário ou senha inválidos.');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Usuário"
                    value={form.username}
                    onChange={e => setForm({ ...form, username: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button type="submit">Entrar</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}
