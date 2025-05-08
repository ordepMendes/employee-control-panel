# Sistema de Cadastro de Funcionários

Este é um projeto front-end desenvolvido em **React** com **TypeScript**, que permite o cadastro, edição e listagem de funcionários, incluindo integração com CEP.

### 🚀 Demonstração

![Badge em produção](http://img.shields.io/static/v1?label=STATUS&message=EM%20PRODUCAO&color=GREEN&style=for-the-badge)

Para acessar o projeto acesse o link: <a href="https://employee-control-panel.vercel.app/">https://employee-control-panel.vercel.app/</a>

### 🖥️ Principais tecnologias utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Ant Design](https://ant.design/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Tailwind](https://tailwindcss.com/)

### 🔨 Funcionalidades

- Cadastro de funcionário com:
  - Nome, e-mail, CPF, status e data de contratação
  - Busca automática de endereço via CEP
  - Upload de imagem de perfil (Base64)
- Validação de formulário com regras claras
- Login com autenticação
- Envio dos dados para API (backend)

### ✅ Requisitos

- `Node`: v18+

### 🔒 Autenticação
- Autenticação com firebase
- Login com google
- Rotas protegidas

### 📦 Rodando o projeto localmente

⚠️ É necessario colocar os arquivos do .env para rodar localmente ⚠️
```env
# Configure o env de acordo com as chaves

VITE_FIREBASE_API_KEY= "CHAVE-API"
VITE_FIREBASE_AUTH_DOMAIN="AUTH-DOMAIN"
VITE_FIREBASE_PROJECT_ID="PROJECT-ID"
VITE_FIREBASE_STORAGE_BUCKET="STORAGE-BUCKET"
VITE_FIREBASE_MESSAGING_SENDER_ID="SENDER-ID"
VITE_FIREBASE_APP_ID="APP-ID"
```

Faça um clone do projeto
```bash
git clone https://github.com/ordepMendes/employee-control-panel.git
```

Entre na pasta e no terminal rode o comando
```bash
# Este comando baixa as dependencias do projeto
npm install
```
Inicie o projeto
```bash
# Este comando starta o projeto e gera o link para acessar
npm run dev
```

### 📂 Estrutura de Pastas

```bash
src/
├── assets/
├── components/
├── context/
├── hooks/
├── pages/
├── router/
├── services/
└── App.tsx
```

### 🔗 Backend
Este front-end consome a API employee-control-api, que utiliza MongoDB.
