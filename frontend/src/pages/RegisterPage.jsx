import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register/', form);
            navigate('/login');
        } catch {
            setError('Erro ao criar conta. Verifique os dados.');
        }
    };

    return (
        <div>
            <h1>Criar conta</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Usuário"
                    value={form.username}
                    onChange={e => setForm({ ...form, username: e.target.value })}
                />
                <input
                    placeholder="Email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button type="submit">Cadastrar</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}
