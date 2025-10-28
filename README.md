# Save Woman API

🌸 **Plataforma de apoio e informação para mulheres**  
API backend que fornece conteúdos educativos, mapa de instituições de apoio e chat inicial com IA.

## 1. Descrição do Projeto

Muitas mulheres enfrentam desafios emocionais, psicológicos e sociais, como:

- Falta de autoestima;
- Dificuldade em conquistar independência emocional e financeira;
- Ausência de informações confiáveis sobre segurança pessoal;
- Situações de relacionamentos abusivos.

**Save Woman** é uma API que centraliza:

- Conteúdos educativos (autocuidado, segurança e independência emocional);
- Mapa de instituições de apoio;
- Chat com IA para orientações iniciais.

O objetivo do MVP é fornecer uma **base segura e organizada** de informações e apoio.

## 2. Tecnologias

- Node.js + TypeScript
- Express
- MongoDB (via Mongoose)
- Cors, Dotenv

## Algumas Rotas disponíveis atualmente:

### Conteúdos

> Essa seção gerencia materiais informativos, artigos, vídeos e links úteis.

| Método | Rota | Descrição | Autenticação |
|--------|------|------------|---------------|
| `GET` | `/contents` | Lista todos os conteúdos cadastrados | 
| `POST` | `/contents` | Cria um novo conteúdo |

---

### Instituições

> Rotas voltadas ao cadastro e consulta de instituições de apoio.

| Método | Rota | Descrição | Autenticação |
|--------|------|------------|---------------|
| `GET` | `/institutions` | Lista todas as instituições cadastradas |
| `POST` | `/institutions` | Cadastra uma nova instituição | 

---
### Chat

> Rotas voltadas a interações com o chat em busca de soluções de apoio e ajuda.

| Método | Rota | Descrição | Autenticação |
|--------|------|------------|---------------|
| `POST` | `/chat` | Conversa com chat |

---

## 3. Instalação

1. Clone o repositório:
```bash
git clone https://github.com/byEduarda/api-savewoman.git
cd api-savewoman
```
2. Instale as dependências:
```bash
npm install
```
3. Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
```bash
PORT=8080
MONGO_URI=sua_string_de_conexao
AI_STUDIO_API_KEY=SuaChaveAqui
```
4. Inicie o servidor:
```bash
npm run dev
```
