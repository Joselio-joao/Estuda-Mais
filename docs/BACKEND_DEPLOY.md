# Implantação do backend

O **GitHub Pages serve apenas a interface Expo estática**. A API Node/Express, a base MySQL, a autenticação e o armazenamento devem viver num serviço de backend próprio. Este repositório inclui `Dockerfile` e `render.yaml` para implantar a API no [Render](https://render.com/) a partir do mesmo repositório.

## Serviço recomendado

Crie um serviço web no Render a partir de `Joselio-joao/Estuda-Mais`. O Render deteta o `render.yaml`, constrói o `Dockerfile` e disponibiliza a API num endereço HTTPS. Não publique segredos no GitHub nem no ficheiro `.env`.

| Configuração Render | Valor |
| --- | --- |
| Tipo | Web Service com Docker |
| Health check | `/api/health` |
| Porta | Fornecida pelo Render através de `PORT` |
| Base de dados | MySQL 8+ externo, configurado em `DATABASE_URL` |
| Origem web permitida | `https://joselio-joao.github.io` em `CORS_ORIGIN` |

## Aiven for MySQL

O [Aiven for MySQL](https://aiven.io/free-mysql-database) é uma opção gerida compatível com este projeto. Depois de criar o serviço Aiven, abra **Connection information** e guarde os dados sem os publicar. No Render, adicione os campos seguintes:

| Variável Render | Origem/valor |
| --- | --- |
| `DATABASE_URL` | A URI MySQL completa mostrada no Aiven, com utilizador, palavra-passe, host, porta e base de dados |
| `DATABASE_SSL` | `true` |
| `DATABASE_CA_PEM` | Conteúdo do certificado CA descarregado do Aiven; substitua as quebras de linha por `\n` |
| `CORS_ORIGIN` | `https://joselio-joao.github.io` |

O servidor valida o certificado e a identidade TLS quando `DATABASE_SSL=true`. Não remova essa validação nem use `rejectUnauthorized=false` em produção.

## Variáveis obrigatórias

No painel **Environment** do serviço, defina `DATABASE_URL`, `CORS_ORIGIN` e os valores de autenticação OIDC. O Render gera `JWT_SECRET` através de `render.yaml`, mas pode substituí-lo por um segredo gerido pela equipa.

> `CORS_ORIGIN` não deve usar um asterisco em produção. Indique o domínio exato da interface: `https://joselio-joao.github.io`.

Depois da implantação, abra `https://<serviço>.onrender.com/api/health`. A resposta deve conter `{"ok":true,...}`. Se o plano Render não disponibilizar Shell, crie ou edite a variável `RUN_MIGRATIONS` e defina-a temporariamente como `true`. A reinicialização seguinte aplica os SQL versionados **antes** de a API abrir a porta. Assim que os logs indicarem `[database] migrations completed`, altere `RUN_MIGRATIONS` de volta para `false` e guarde as alterações.

> As migrações Drizzle são versionadas e registadas na própria base de dados, mas `RUN_MIGRATIONS` não deve permanecer ativo em produção. Mantenha-o como `false` depois da primeira inicialização ou de cada atualização de esquema planeada.

Em planos que disponibilizam Shell, também pode executar `pnpm db:migrate`. Este comando reutiliza a mesma ligação TLS da API; não use `pnpm db:push` em produção, pois esse comando também tenta gerar novos ficheiros de migração.

## Ligar o GitHub Pages à API

No repositório GitHub, abra **Settings → Secrets and variables → Actions → Variables** e crie a variável `ESTUDAMAIS_API_URL` com a URL HTTPS do serviço, sem barra final. O fluxo **Publicar versão web** já usa esta variável como `EXPO_PUBLIC_API_BASE_URL` na exportação seguinte.

| Ambiente | URL esperada |
| --- | --- |
| Desenvolvimento local | `http://localhost:3000` |
| API Render | `https://<serviço>.onrender.com` |
| Interface GitHub Pages | `https://joselio-joao.github.io/Estuda-Mais/` |

Faça um novo envio para `main` ou execute manualmente o workflow de publicação depois de criar a variável. A barra de Perfil da versão web indica **Backend configurado** quando a URL é incorporada no build.

## Limites e próximos passos

O armazenamento atual utiliza um adaptador compatível com o ambiente de origem. Antes de produção, substitua-o ou configure o fornecedor de ficheiros controlado pela equipa. A autenticação OIDC também requer URLs de callback que incluam o domínio público da API. A configuração de backend está pronta no repositório, mas a criação de contas de alojamento, base de dados e credenciais continua sob controlo do proprietário.
