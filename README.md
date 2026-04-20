# MyNET

Rede social full-stack desenvolvida com Django REST Framework e React.

**Demo:** [my-net-three.vercel.app](https://my-net-three.vercel.app)

---

## Funcionalidades

- Cadastro e login com autenticação JWT
- Feed com posts de usuários seguidos
- Criar, curtir e comentar posts (com imagem)
- Perfil com avatar, banner e bio editáveis
- Seguir e deixar de seguir usuários
- Busca de usuários
- Tema claro e escuro
- Interface responsiva (desktop e mobile)

---

## Stack

| Camada | Tecnologias |
|--------|-------------|
| Back-end | Python 3.12, Django 6, Django REST Framework, SimpleJWT |
| Banco de dados | SQLite (dev) · PostgreSQL (prod) |
| Front-end | React 18, Vite, TypeScript, styled-components |
| Mídia | Cloudinary |
| Deploy | Render (API) · Vercel (front-end) |

---

## Estrutura do projeto

```
MyNET/
├── backend/
│   ├── core/          # settings, urls, wsgi
│   ├── accounts/      # User model, autenticação, perfil
│   ├── posts/         # Post, Like, Comment
│   ├── follows/       # Follow
│   └── manage.py
└── frontend/
    └── src/
        ├── api/           # axios configurado com JWT
        ├── components/    # Navbar, PostCard, modais
        ├── contexts/      # AuthContext, ThemeContext, PostContext
        └── pages/         # Login, Register, Feed, Profile, Search, Post
```

---

## Rodando localmente

### Pré-requisitos

- Python 3.12+
- Node.js 18+

---

### Back-end

**1. Entrar na pasta e ativar o ambiente virtual**
```bash
cd backend

# Windows (Git Bash)
source env/Scripts/activate

# Windows (PowerShell)
.\env\Scripts\Activate.ps1
```

**2. Criar o arquivo `.env`** na pasta `backend/`

```env
SECRET_KEY=sua-chave-secreta
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Cloudinary (opcional em dev, necessário em prod)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

**3. Rodar as migrations e iniciar o servidor**
```bash
python manage.py migrate
python manage.py runserver
```

API disponível em `http://127.0.0.1:8000/`

---

### Front-end

```bash
cd frontend
npm install
npm run dev
```

Front-end disponível em `http://localhost:5173/`

> Certifique-se de que o back-end está rodando. A URL da API é configurada em `frontend/src/api/axios.ts`.

---

## Principais endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/register/` | Cadastro |
| POST | `/api/auth/login/` | Login (retorna JWT) |
| POST | `/api/auth/token/refresh/` | Renovar access token |
| GET | `/api/auth/me/` | Dados do usuário autenticado |
| GET/PUT | `/api/auth/profile/` | Perfil próprio |
| GET | `/api/auth/users/` | Listar/buscar usuários |
| GET | `/api/posts/feed/` | Feed personalizado |
| GET/POST | `/api/posts/` | Listar / criar posts |
| POST | `/api/posts/{id}/like/` | Curtir/descurtir |
| GET/POST | `/api/posts/{id}/comments/` | Comentários |
| POST | `/api/follows/{id}/toggle/` | Seguir/deixar de seguir |

---

## Deploy

| Serviço | Plataforma | URL |
|---------|-----------|-----|
| API | Render | `https://mynet-api.onrender.com` |
| Front-end | Vercel | `https://my-net-three.vercel.app` |

### Variáveis de ambiente em produção

**Render (back-end)**

| Variável | Descrição |
|----------|-----------|
| `SECRET_KEY` | Chave secreta do Django |
| `DEBUG` | `False` |
| `ALLOWED_HOSTS` | domínio do Render |
| `DATABASE_URL` | URL do PostgreSQL |
| `CLOUDINARY_CLOUD_NAME` | Nome do cloud no Cloudinary |
| `CLOUDINARY_API_KEY` | API key do Cloudinary |
| `CLOUDINARY_API_SECRET` | API secret do Cloudinary |

**Vercel (front-end)**

| Variável | Descrição |
|----------|-----------|
| `VITE_API_URL` | URL da API em produção |
