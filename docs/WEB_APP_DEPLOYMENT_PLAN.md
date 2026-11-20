# Plano de publicação do Estuda+ como aplicação web funcional

## Objetivo

Entregar uma URL pública que abra a interface real do Estuda+, com navegação e funcionalidades ligadas a uma API e base de dados. A versão de demonstração não deve ser confundida com uma aplicação pronta para utilização real.

## Estado confirmado no repositório

- A interface é uma aplicação Expo Router / React Native Web.
- A API usa Node.js, Express e tRPC.
- Os dados usam Drizzle ORM e MySQL.
- O workflow `.github/workflows/deploy-pages.yml` exporta a web e publica no GitHub Pages.
- A publicação define `EXPO_PUBLIC_WEB_DEMO=true`, `EXPO_PUBLIC_API_BASE_URL` a partir da variável de Actions `ESTUDAMAIS_API_URL`, e uma base URL para o subdiretório GitHub Pages.
- O README e `docs/BACKEND_DEPLOY.md` descrevem a versão Pages como demonstração estática e o backend como um serviço separado.
- O repositório contém `Dockerfile` e `render.yaml` para API; estes não provam que a API ou uma base de dados do Estuda+ estejam implantadas.
- No workspace Render acessível, foi encontrada apenas uma API pertencente ao projeto EarthTrend AI. Não foi encontrada uma instância de backend do Estuda+.

## O que significa "tirar do estático"

O frontend web pode continuar a ser servido como ficheiros de aplicação (HTML/JS/CSS), mas deixa de ser apenas uma demonstração quando é configurado para falar com uma API real, usar autenticação, guardar dados persistentes e receber respostas do servidor. Uma exportação estática de frontend não é, por si, impedimento para uma aplicação dinâmica.

Para o Estuda+, o bloqueio atual não é simplesmente trocar GitHub Pages por outro host: faltam/precisam ser confirmados o backend online, a base de dados, a configuração de autenticação e os endereços/segredos de ambiente. O site não deve mostrar funcionalidades reais enquanto essas dependências não estiverem verificadas.

## Arquitetura alvo

1. **Web:** exportação Expo Web, otimizada para mobile, servida por GitHub Pages ou um host estático equivalente.
2. **API:** serviço HTTPS Node/Express do mesmo repositório, com health check `/api/health`.
3. **Dados:** MySQL 8+ com TLS, migrações versionadas e backups; nunca usar credenciais no frontend ou no Git.
4. **Autenticação:** OIDC/provider com callback URLs e origem de confiança configuradas, estado OAuth validado e sessões seguras.
5. **CORS:** allowlist exata para a origem da web; sem wildcard em produção.
6. **Armazenamento:** serviço próprio e autorização por utilizador para ficheiros privados; não assinar URLs sem verificar permissões.
7. **Deploy:** workflow de web deve incorporar apenas a URL pública da API, nunca segredos.

## Sequência de implementação e validação

### Etapa A — Preparar e confirmar
- Resolver o erro TypeScript que está a falhar no CI (callback `origin` sem tipo explícito).
- Reexecutar CI e garantir tipos/testes verdes.
- Confirmar que a exportação Expo Web produz um artefacto e que as rotas abrem no browser.
- Testar a URL Pages atual e registar se apresenta o build mais recente ou erro.

### Etapa B — Backend
- Escolher um serviço web de backend e uma base MySQL gerida que o proprietário possa usar, verificando preço, limites, região, suspensão por inatividade e backups antes de criar recursos.
- Configurar variáveis privadas no painel do host: `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, URLs OIDC e restantes variáveis necessárias.
- Aplicar migrações numa janela controlada, confirmar health check e rever logs sem expor segredos.
- Confirmar endpoints de autenticação, utilizador, feed, recursos e grupos com testes de integração.

### Etapa C — Web ligada
- Configurar a variável GitHub Actions `ESTUDAMAIS_API_URL` com a URL real e HTTPS da API.
- Configurar CORS e callbacks OIDC para os domínios reais.
- Publicar novamente o frontend.
- Verificar no navegador: carregamento, navegação, registo/login, logout, feed, criação/edição de conteúdo, recursos, grupos, perfil, erros de API e versão mobile.
- Verificar que os dados permanecem após recarregar e que utilizadores não conseguem aceder a conteúdo privado de terceiros.

### Etapa D — Lançamento seguro
- Corrigir limitações de privacidade/moderação, rate limits, validação de uploads, autorização e recuperação de conta.
- Rever políticas e aviso de privacidade, sobretudo porque a plataforma pode ser utilizada por estudantes menores.
- Manter monitorização, backups e procedimento de rollback.

## Dependências / decisões ainda necessárias

- Serviço e custo de alojamento da API.
- Provedor de MySQL e respetivo plano/custo.
- Provedor OIDC, configuração de callback e credenciais.
- URL final da API.
- Disponibilidade e configuração do armazenamento de ficheiros.
- Confirmação do proprietário antes de criar serviços pagos, bases de dados, credenciais ou publicar mudanças em produção.

## Critério de conclusão

A aplicação só será considerada funcional em produção depois de a web publicada usar uma API real, health check responder, autenticação e dados persistirem, os principais fluxos passarem testes de navegador e as regras de autorização/CORS/privacy estarem verificadas. Um build ou página que apenas abre não é suficiente.

## Bloqueio de autenticação identificado no código

A autenticação atual não é uma integração OIDC genérica pronta a apontar para qualquer fornecedor. O frontend usa `EXPO_PUBLIC_OAUTH_PORTAL_URL`, `EXPO_PUBLIC_OAUTH_SERVER_URL` e `EXPO_PUBLIC_APP_ID`; o backend usa o SDK de autenticação compatível com Manus e chama endpoints RPC específicos (`ExchangeToken` e `GetUserInfo`). A rota de callback depende desse contrato.

Antes de colocar login público em produção, deve-se decidir entre (a) manter e configurar um fornecedor compatível, com domínio, aplicação/client ID, callback e credenciais autorizadas, ou (b) migrar para um fornecedor escolhido pelo proprietário (OIDC/OAuth2) e substituir o SDK/fluxo com testes de segurança. Não basta definir as URLs para valores arbitrários.

A análise estática também observou que o parâmetro `state` usado no callback é descodificado como Base64 para obter o redirect URI. Base64 não oferece integridade/anti-CSRF. A validação de state e allowlist do redirect devem ser revistas antes de produção; esta observação não é confirmação de exploit e não foi alterado o fluxo de autenticação.

**Status:** esta dependência impede considerar registo/login de produção pronto até fornecedor e configuração serem definidos e validados.
