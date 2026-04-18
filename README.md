# MyNET

Rede social full-stack desenvolvida com Django REST Framework e React.

---

## Como rodar localmente

### Pré-requisitos
- Python 3.12+
- Node.js 18+ (para o front-end, em breve)

---

### Back-end

**1. Entrar na pasta do back-end**
```bash
cd backend
```

**2. Ativar o ambiente virtual**
```bash
# Windows (Git Bash)
source env/Scripts/activate

# Windows (PowerShell)
.\env\Scripts\Activate.ps1
```

> O terminal deve mostrar `(env)` no início da linha.

**3. Criar o arquivo `.env`** na pasta `backend/`
```bash
cp .env.example .env
```
Edite o `.env` com os seus valores.

**4. Rodar as migrations**
```bash
python manage.py migrate
```

**5. Iniciar o servidor**
```bash
python manage.py runserver
```

API disponível em: `http://127.0.0.1:8000/`

---

## Variáveis de ambiente (`.env`)

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `SECRET_KEY` | Chave secreta do Django | `django-insecure-...` |
| `DEBUG` | Modo debug | `True` |
| `ALLOWED_HOSTS` | Hosts permitidos | `localhost,127.0.0.1` |

---

## Endpoints disponíveis

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/register/` | Cadastro de usuário |
| POST | `/api/auth/login/` | Login (retorna JWT) |
| POST | `/api/auth/token/refresh/` | Renova o access token |

---

## Tecnologias

- Python 3.12 + Django 6
- Django REST Framework
- SimpleJWT
- SQLite (desenvolvimento)
