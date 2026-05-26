# MyNET

Rede social full-stack inspirada no Twitter, desenvolvida com Django REST Framework e React.

**Demo:** [my-net-three.vercel.app](https://my-net-three.vercel.app)

---

## Stack

| Camada | Tecnologia |
|---|---|
| Backend | Python · Django 6 · Django REST Framework · SimpleJWT |
| Frontend | React 19 · TypeScript · Vite · Styled Components |
| Banco de dados | PostgreSQL (Supabase) · SQLite (dev) |
| Mídia | Cloudinary |
| Deploy | Render (API) · Vercel (frontend) |

---

## Funcionalidades

- Autenticação com JWT (sessão única por usuário)
- Login por email; cadastro com email obrigatório
- Perfil com avatar, banner e bio (upload com crop)
- Posts com imagens, GIFs e menções
- Curtidas, comentários, reposts e fixar post no perfil
- Sistema de follows com sugestões
- Mensagens diretas (DMs)
- Notificações em tempo real (polling)
- Cutucar (poke) outros usuários
- Busca de usuários
- Tema claro/escuro
- Feed com scroll infinito
- Moderação automática de conteúdo com IA
- Resumo de posts com IA (✨)

---

## Rodar localmente

### Backend

```bash
cd backend
python -m venv env
env\Scripts\activate        # Windows
pip install -r requirements.txt
```

Crie `backend/.env`:

```env
SECRET_KEY=sua-chave-secreta
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
# DATABASE_URL=   (opcional — sem isso usa SQLite)
# CLOUDINARY_URL= (opcional — sem isso mídia fica local)
# OPENAI_API_KEY= (moderação de conteúdo)
# GROQ_API_KEY=   (resumo de posts)
```

```bash
python manage.py migrate
python manage.py runserver
```

API disponível em `http://localhost:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App disponível em `http://localhost:5173`.

---

## Estrutura

```
MyNET/
├── backend/
│   ├── core/           # settings, urls, wsgi
│   ├── accounts/       # User, auth, perfil
│   ├── posts/          # Post, Like, Comment, Repost
│   ├── follows/        # Follow
│   ├── notifications/  # Notification
│   ├── dms/            # DirectMessage
│   └── pokes/          # Poke
└── frontend/
    └── src/
        ├── api/        # cliente axios
        ├── components/ # componentes reutilizáveis
        ├── contexts/   # AuthContext, PostContext, ThemeContext
        ├── pages/      # páginas da aplicação
        ├── hooks/      # hooks customizados
        └── utils/      # helpers (timeAgo, mentions, gif, youtube)
```

---

## Deploy

- **Frontend:** Vercel — deploy automático via push no GitHub
- **Backend:** Render — build via `backend/build.sh`
- **Banco:** Supabase (PostgreSQL) — connection pooler porta 6543
- **Mídia:** Cloudinary
