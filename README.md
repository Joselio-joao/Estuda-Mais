# Estuda+

Aplicação móvel educacional e social para estudantes em Angola, construída com **Expo/React Native**, API **Node/Express + tRPC**, validação **Zod** e acesso a dados através de **Drizzle ORM**.

> O repositório contém código, recursos, esquema e migrações. As contas de produção, credenciais, dados e configurações geridas não fazem parte da exportação.

## Pré-requisitos

| Ferramenta | Versão recomendada | Finalidade |
| --- | --- | --- |
| Node.js | 22 LTS | execução local e ferramentas de desenvolvimento |
| pnpm | 9.12.0 | instalação determinística de dependências |
| MySQL | 8+ | base de dados de desenvolvimento ou produção |
| Expo Go | versão compatível | teste em dispositivo móvel |

## Arranque local

1. Instale as dependências com `corepack enable && pnpm install --frozen-lockfile`.
2. Copie `.env.example` para `.env` e preencha as variáveis obrigatórias, em especial `DATABASE_URL` e `JWT_SECRET`.
3. Prepare a base de dados com `pnpm db:push` depois de validar a ligação no ambiente local.
4. Inicie API e Expo em simultâneo com `pnpm dev`.
5. Para abrir apenas a aplicação web, utilize o endereço indicado pelo Expo; para um dispositivo, utilize `pnpm android` ou `pnpm ios` num ambiente compatível.

## Verificação

| Comando | Verificação |
| --- | --- |
| `pnpm check` | tipos TypeScript |
| `pnpm test` | testes de validação e regras de produto |
| `pnpm lint` | regras do Expo |
| `pnpm build` | compilação da API para produção |

## Versão web pública

A cada alteração em `main`, o fluxo **Publicar versão web** cria uma exportação estática Expo e publica-a no GitHub Pages. A versão pública é uma demonstração navegável da interface inicial: a autenticação, os dados académicos e as ações que dependem de API continuam a exigir um serviço próprio, configurado com as variáveis documentadas neste repositório.

O endereço esperado do site é `https://joselio-joao.github.io/Estuda-Mais/`.

## Backend de produção

O repositório agora inclui uma configuração Docker e `render.yaml` para alojar a API fora do GitHub Pages. O serviço recebe dados, autenticação, ficheiros e chamadas tRPC; a interface GitHub Pages continua a servir apenas o cliente estático. Consulte [docs/BACKEND_DEPLOY.md](docs/BACKEND_DEPLOY.md) para criar o serviço, configurar MySQL, restringir CORS e definir `ESTUDAMAIS_API_URL` no GitHub Actions.

## Variáveis e segredos

O ficheiro `.env.example` documenta as variáveis necessárias sem valores sensíveis. Mantenha `.env`, `.project-config.json`, chaves de assinatura, certificados e ficheiros de credenciais fora do Git. Antes da publicação fora do ambiente atual, substitua os adaptadores de autenticação, armazenamento, IA e notificações por serviços controlados pelo proprietário.

Consulte [docs/TRANSFER_GUIDE.md](docs/TRANSFER_GUIDE.md) para a estratégia de transição e [docs/MOBILE_TESTING.md](docs/MOBILE_TESTING.md) para os testes móveis.

## Identidade do produto

O Estuda+ adota uma interface mobile-first, em retrato, com Azul Estuda (`#0D47A1`), Azul Noite (`#06265C`) e Dourado Estuda (`#FFC107`). A referência completa de produto e interface está em [design.md](design.md).
