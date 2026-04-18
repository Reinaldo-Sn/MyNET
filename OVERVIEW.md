# MyNET — Visão Geral do Projeto

## Descrição

MyNET é uma rede social minimalista onde usuários podem criar contas, seguir pessoas, publicar conteúdo e interagir com postagens por meio de curtidas e comentários. O projeto é desenvolvido com Django no back-end seguindo arquitetura REST e React no front-end.

---

## Funcionalidades

### 1. Autenticação
- Cadastro de novos usuários (username, e-mail, senha)
- Login e logout com segurança
- Proteção de rotas autenticadas

### 2. Perfil de Usuário
- Visualização do perfil próprio e de outros usuários
- Edição opcional de: foto de perfil, nome de exibição e senha
- Nenhum campo de edição é obrigatório

### 3. Sistema de Seguir
- Seguir e deixar de seguir outros usuários
- Listagem de seguidores (*followers*) e seguidos (*following*)
- Contador de seguidores/seguidos no perfil

### 4. Feed de Notícias
- Exibe apenas postagens de usuários seguidos
- Ordenado por data (mais recentes primeiro)
- Suporte a criação de novas postagens (texto e/ou imagem)

### 5. Interações nas Postagens
- Curtir e descurtir postagens
- Comentar em postagens
- Contador de curtidas e comentários visível no feed

---

## Arquitetura

```
MyNET/
├── backend/          # Django REST API
│   ├── accounts/     # Autenticação e perfil
│   ├── posts/        # Postagens, curtidas e comentários
│   ├── feed/         # Lógica do feed personalizado
│   └── follows/      # Sistema de seguir
│
└── frontend/         # React (SPA)
    ├── src/
    │   ├── pages/    # Login, Register, Feed, Profile
    │   ├── components/
    │   └── services/ # Chamadas à API
    └── public/
```

---

## Stack Tecnológica

| Camada       | Tecnologia                        |
|--------------|-----------------------------------|
| Back-end     | Python 3.12 + Django 5 + DRF      |
| Banco de dados | PostgreSQL (prod) / SQLite (dev) |
| Autenticação | JWT via `djangorestframework-simplejwt` |
| Front-end    | React 18 + Vite                   |
| Estilização  | Tailwind CSS                      |
| Deploy API   | Render / Railway                  |
| Deploy Front | Vercel / Netlify                  |

---

## Endpoints da API (planejamento inicial)

### Auth
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/register/` | Cadastro |
| POST | `/api/auth/login/` | Login (retorna JWT) |
| POST | `/api/auth/logout/` | Logout |
| POST | `/api/auth/token/refresh/` | Refresh do token |

### Perfil
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/users/{username}/` | Ver perfil |
| PATCH | `/api/users/me/` | Editar perfil (parcial) |

### Postagens
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/posts/feed/` | Feed do usuário logado |
| POST | `/api/posts/` | Criar postagem |
| DELETE | `/api/posts/{id}/` | Deletar postagem |
| POST | `/api/posts/{id}/like/` | Curtir / descurtir |
| GET/POST | `/api/posts/{id}/comments/` | Ver / adicionar comentário |

### Follows
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/users/{username}/follow/` | Seguir / deixar de seguir |
| GET | `/api/users/{username}/followers/` | Lista de seguidores |
| GET | `/api/users/{username}/following/` | Lista de seguidos |

---

## Modelos de Dados (resumo)

```
User (extends AbstractUser)
  - bio, avatar, created_at

Post
  - author (FK User), content, image, created_at

Like
  - user (FK), post (FK) — unique_together

Comment
  - author (FK), post (FK), content, created_at

Follow
  - follower (FK User), following (FK User) — unique_together
```

---

## Fluxo do Usuário

```
Cadastro → Login → Feed (vazio) → Buscar usuários
  → Seguir → Feed atualiza → Curtir / Comentar
  → Visitar perfil → Editar próprio perfil
```

---

## Entrega

- [ ] Repositório público no GitHub com `README.md` de instruções
- [ ] Variáveis de ambiente documentadas em `.env.example`
- [ ] API deployada e acessível via HTTPS
- [ ] Front-end deployado e consumindo a API em produção
- [ ] Link do deploy incluso no README

---

## Próximos Passos

1. Configurar repositório e estrutura de pastas
2. Inicializar projeto Django com DRF e autenticação JWT
3. Criar modelos e migrations
4. Implementar endpoints de auth e perfil
5. Implementar posts, likes e comentários
6. Implementar follows e lógica do feed
7. Desenvolver front-end React
8. Deploy e testes finais