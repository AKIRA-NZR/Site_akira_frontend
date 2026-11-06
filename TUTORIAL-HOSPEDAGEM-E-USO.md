# Guia Completo: Portfólio de Engenharia & Hospedagem Gratuita na Cloudflare Pages

> **Autor / Assinatura:** Akira  
> **Arquitetura:** Astro 5/7 + Tailwind CSS v4 + Zod Content Collections (VOID Blueprint V2)  
> **Hospedagem:** Cloudflare Pages (100% gratuito, tráfego ilimitado, SSL automático)

---

## 1. Como Rodar e Testar o Portfólio Localmente

Abra o terminal (PowerShell, CMD ou Bash) dentro da pasta `portfolio`:

```bash
# Entrar na pasta do portfólio
cd "C:\Users\dkaua\Documents\Projetos Pessoais\Projetos\portfolio"

# Iniciar o servidor de desenvolvimento local
npm.cmd run dev
```

Acesse no seu navegador: `http://localhost:4321`

---

## 2. Como Personalizar Seus Dados Pessoais

Tudo o que envolve seu nome, apelido, redes sociais, bio e métricas está centralizado em um único arquivo:
👉 `src/shared/config/profile.ts`

Você pode abrir esse arquivo a qualquer momento e alterar:
- Seus links reais do GitHub, LinkedIn e E-mail.
- Seu resumo e parágrafos da biografia.
- As métricas de destaque no Hero (SLA, latência p99, etc.).

---

## 3. Como Cadastrar Novos Projetos (Super Fácil!)

Cada novo projeto é apenas um arquivo Markdown na pasta `src/content/projects/`.

### Exemplo de Projeto Back-end (Gera Terminal CLI):
Crie um arquivo `src/content/projects/meu-novo-servico.md`:

```yaml
---
title: "Distributed Cache Cluster"
type: "backend"
summary: "Cluster de cache em memória com particionamento consistente e replicação assíncrona."
featured: true
order: 5
technologies:
  - name: "Go"
    version: "1.23"
  - name: "Redis"
    version: "7.2"
  - name: "Docker"
    version: "27.0"
metrics:
  throughput: "210k req/s"
  latency_p99: "0.9ms"
  uptime: "99.99%"
githubUrl: "https://github.com/seu-usuario/distributed-cache"
liveUrl: "https://docs.seu-projeto.com"
cliCommand: "go run cmd/cluster/main.go --peers=3 --eviction=lru"
cliOutput: "[CLUSTER] Ring synchronized | 3 nodes active | 210,000 req/s | p99: 890µs"
---
```

### Exemplo de Projeto Frontend / Full-Stack (Gera Mockup Visual):
```yaml
---
title: "Dashboard de Telemetria"
type: "fullstack"
summary: "Interface web de monitoramento de microsserviços em tempo real."
order: 6
technologies:
  - name: "Astro"
    version: "5.4"
  - name: "Tailwind"
    version: "4.0"
metrics:
  throughput: "50k ops/s"
  latency_p99: "5ms"
githubUrl: "https://github.com/seu-usuario/dashboard"
---
```

---

## 4. Passo a Passo: Hospedagem 100% Gratuita na Cloudflare Pages

### Passo 1: Inicializar o Repositório Git Local
No terminal, dentro da pasta `portfolio`:

```bash
git init
git add .
git commit -m "feat: initial commit of akira portfolio with void blueprint"
```

### Passo 2: Criar Repositório no seu GitHub
1. Acesse [github.com/new](https://github.com/new).
2. Dê o nome que preferir (ex: `portfolio` ou `akira-portfolio`).
3. Pode ser **Público** ou **Privado** (a Cloudflare funciona com os dois).
4. Deixe desmarcada a opção de criar README (já temos um).
5. Copie os comandos de envio do GitHub e rode no terminal:
   ```bash
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/portfolio.git
   git push -u origin main
   ```

---

### Passo 3: Conectar a Cloudflare Pages (Leva 2 minutos)

1. Crie uma conta gratuita em [dash.cloudflare.com](https://dash.cloudflare.com/) (se ainda não tiver).
2. No menu lateral esquerdo, clique em **Compute (Workers) > Workers & Pages** (ou direto em **Workers & Pages**).
3. Clique no botão azul **Create application**.
4. Selecione a aba **Pages**.
5. Clique em **Connect to Git** (Conectar ao Git).
6. Escolha a sua conta do GitHub e selecione o repositório `portfolio` que você acabou de criar.
7. Clique em **Begin setup** (Iniciar configuração).

---

### Passo 4: Configurar o Build na Cloudflare

Na tela de configuração que se abrirá:
- **Project name:** Escolha o subdomínio que deseja (ex: `akira-dev`, que virará `akira-dev.pages.dev`).
- **Production branch:** `main`
- **Framework preset:** Escolha **`Astro`** no menu suspenso.
- Os campos serão preenchidos automaticamente com:
  - **Build command:** `npm run build`
  - **Build output directory:** `dist`
- Clique em **Save and Deploy** (Salvar e Implantar).

---

### Passo 5: Pronto! Deploy Automático Ativo!

- A Cloudflare iniciará a compilação e, em cerca de 30 segundos, seu site estará no ar com uma URL rápida e segura: `https://seu-nome.pages.dev`.
- **Deploy Contínuo:** A partir de agora, qualquer alteração que você fizer no código ou novo projeto que adicionar e der `git push`, a Cloudflare compila e atualiza o site na internet automaticamente!
- **Domínio Próprio Grátis (Opcional):** Se você tiver um domínio registrado (ex: `akira.dev` ou `akira.com.br`), na aba **Custom domains** da Cloudflare Pages basta digitar seu domínio e ela configurará o certificado SSL HTTPS gratuitamente.
