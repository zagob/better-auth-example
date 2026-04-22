# 🔐 Next.js + Better Auth

Projeto de exemplo demonstrando autenticação moderna com [Next.js](https://nextjs.org/) e [Better Auth](https://www.better-auth.com/).

---

## 📋 Sobre o projeto

Este repositório serve como referência prática para implementar autenticação completa em aplicações Next.js utilizando a biblioteca **Better Auth** — uma solução de autenticação type-safe, extensível e fácil de configurar.

---

## 🚀 Tecnologias utilizadas

- [Next.js](https://nextjs.org/) — Framework React com App Router
- [Better Auth](https://www.better-auth.com/) — Autenticação moderna e type-safe
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática
- [Prisma](https://www.prisma.io/) _(ou seu ORM/DB de preferência)_ — ORM para banco de dados
- [Tailwind CSS](https://tailwindcss.com/) — Estilização utilitária

---

## ✨ Funcionalidades

- [x] Login com e-mail e senha
- [x] Registro de usuário
- [x] Sessões seguras com JWT / cookies
- [x] Proteção de rotas (middleware)
- [x] Login social (Google, GitHub, etc.)
- [x] Logout
- [ ] Recuperação de senha _(em breve)_
- [ ] Autenticação de dois fatores _(em breve)_

---

## 🗂️ Estrutura do projeto

```
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   └── api/
│       └── auth/
│           └── [...all]/
│               └── route.ts       # Handler do Better Auth
├── lib/
│   ├── auth.ts                    # Configuração do Better Auth (servidor)
│   └── auth-client.ts             # Cliente do Better Auth
├── middleware.ts                  # Proteção de rotas
└── prisma/
    └── schema.prisma              # Schema do banco de dados
```

---

## ⚙️ Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/nextjs-better-auth-example.git
cd nextjs-better-auth-example
```

### 2. Instale as dependências

```bash
npm install
# ou
pnpm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# URL da aplicação
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Banco de dados (exemplo com PostgreSQL)
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"

# Secret do Better Auth (gere uma string segura)
BETTER_AUTH_SECRET="sua-chave-secreta-aqui"
BETTER_AUTH_URL=http://localhost:3000

# Providers sociais (opcional)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

### 4. Configure o banco de dados

```bash
npx prisma generate
npx prisma db push
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🔧 Como funciona

### Configuração do servidor (`lib/auth.ts`)

```ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
```

### Cliente (`lib/auth-client.ts`)

```ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

export const { signIn, signOut, signUp, useSession } = authClient;
```

### Proteção de rotas (`middleware.ts`)

```ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

---

## 📚 Recursos úteis

- [Documentação do Better Auth](https://www.better-auth.com/docs)
- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do Prisma](https://www.prisma.io/docs)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma _issue_ ou enviar um _pull request_.

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona minha feature'`)
4. Push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
