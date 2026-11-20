# Auditoria técnica inicial — Estuda Mais+

**Data:** 20 de novembro de 2026  
**Escopo:** leitura estática do código na branch `deployment/full-web-app`; sem executar a aplicação, sem testar endpoints em produção e sem acesso a uma base de dados real. Esta é uma revisão inicial, não uma certificação de segurança.

## Resumo executivo

O projeto tem uma base significativa: Expo Router/React Native Web, Express + tRPC, Drizzle/MySQL, OAuth/session JWT, repositório de recursos, feed, comunidades/grupos, mensagens, competições, notificações, denúncias e área de administração. As operações de API mais sensíveis em geral usam `protectedProcedure` ou `adminProcedure`, e mensagens verificam membership.

**Não está pronto para lançamento público com estudantes** até as questões de privacidade e autorização abaixo serem corrigidas e testadas, especialmente porque estudantes podem ser menores.

## Achados prioritários

### P0/P1 — Privacidade de comunidades e grupos não é aplicada de forma consistente
**Evidência:** `server/db.ts`
- `listCommunities` devolve comunidades sem filtrar `visibility`; o parâmetro `mineOnly` apenas filtra membership.
- `getCommunity` devolve uma comunidade por ID sem bloquear utilizadores que não são membros quando a visibilidade é `private`.
- `listStudyGroups` lista grupos associados à comunidade sem filtrar `privacy` nem verificar membership.
- `getStudyGroup` retorna grupo por ID sem exigir membership quando `privacy` é `private`.
- `toggleCommunityMembership` permite pedir/juntar-se a qualquer comunidade, incluindo privada, sem convite/aprovação visível.

**Impacto:** a marcação “privada” não parece garantir privacidade; conteúdo, metadados, grupos e membros podem ser descobertos/acedidos por utilizadores autenticados fora do espaço.

**Correção:** centralizar helpers de autorização (community/group membership + privacy); filtrar no servidor; implementar convites ou aprovação; não confiar apenas em esconder UI. Criar testes com utilizador A e B.

### P1 — Endpoint de comentários e post por ID não aplicam o estado de moderação
**Evidência:** `server/db.ts` e `server/routers.ts`
- `posts.byId` usa `getPost`, que procura pelo ID sem filtrar `moderationStatus = visible`.
- `posts.comments` chama `getPostComments` sem verificar se o post existe, está visível ou se o leitor tem direito ao post/contexto.

**Impacto:** conteúdo ocultado pela moderação pode continuar a ser obtido diretamente por ID; comentários podem ser listados para posts que deveriam estar inacessíveis.

**Correção:** criar função única `canViewPost(viewerId, post)`; aplicar em byId, comments, like/save/share/comment e feed. Testar post oculto e post de contexto privado.

### P1 — Dados de perfil excessivos para uma rede com menores
**Evidência:** `drizzle/schema.ts`, `server/db.ts`
- O perfil exige data de nascimento, província e nome completo.
- O diretório de estudantes devolve nome, avatar, curso e ano de turma para qualquer utilizador autenticado (limitado a 50, mas sem filtro de visibilidade/consentimento).
- Instituição e turma são dados que podem tornar um estudante identificável.

**Impacto:** recolha e exposição de dados pessoais sem necessidade demonstrada; risco acrescido para menores.

**Correção:** remover data de nascimento exata do MVP ou guardar apenas faixa etária se estritamente necessária; tornar diretório opt-in; usar nome público/pseudónimo; opções “ninguém / membros / comunidade”; ocultar escola/turma por padrão; documentar retenção e exclusão.

### P1 — Proxy de armazenamento pode conceder URL assinada para chave fornecida pelo cliente
**Evidência:** `server/_core/storageProxy.ts`
- GET `/manus-storage/*` recebe a chave e pede ao backend Forge uma presigned URL, sem autenticação/autorização de objeto aparente.
- O código não verifica dono, acesso a comunidade/grupo, nem classificação pública/privada antes de redirecionar.

**Impacto:** se a chave for previsível ou conhecida, o proxy pode contornar a autorização de recursos privados. O risco depende das políticas e estrutura do bucket, ainda não verificadas.

**Correção:** usar IDs de objeto e verificar acesso no servidor antes de emitir URL; separar storage público/privado; keys aleatórias e não adivinháveis não substituem autorização.

### P1 — Uploads aceitam MIME/ficheiro informados pelo cliente sem validação de conteúdo
**Evidência:** `server/routers.ts` upload de posts, avatars, biblioteca e anexos de competições; `server/storage.ts`
- MIME é controlado pelo cliente; filename é sanitizado, mas não há validação por assinatura (magic bytes), scan, limites consistentes por tipo, ou regras de conteúdo documentadas.
- JSON parser tem limite 50 MB e payloads base64 aceitam valores grandes; pode gerar pressão de memória/CPU.

**Correção:** validar MIME real e extensão, allowlist por categoria, limite total e por rota, upload direto com presigned URL curta e scope, scan/moderação, rate limits e quota.

### P1 — Login/session e CSRF precisam de revisão antes de produção
**Evidência:** `server/_core/oauth.ts`, `server/_core/sdk.ts`, `server/_core/cookies.ts`
- `state` é descodificado como Base64 para obter redirect URI; Base64 não protege integridade. A implementação precisa confirmar validação de state contra sessão/nonce e redirect allowlist no fornecedor.
- Cookies são `HttpOnly`, mas `SameSite=None` e `Secure` dependem da deteção de HTTPS/proxy; cookies cross-site aumentam a importância de CSRF.
- Logout limpa cookie, mas não há revogação de token/session server-side aparente.

**Correção:** usar OAuth/OIDC standard com state/nonce aleatórios, guardados e validados; redirect URI fixo allowlist; validar trusted proxy; usar SameSite adequado; proteção CSRF/origin nas mutations; sessão curta/refresh e revogação; testes de callback.

### P2 — Ausência de rate limiting/quota evidente nas rotas
**Evidência:** `server/_core/index.ts` e routers
- Não foi encontrada middleware de rate limiting no bootstrap/API durante esta revisão.
- Endpoints de mensagens, comentários, criação de recursos, denúncias, LLM e uploads são ações com custo/abuso potencial.

**Correção:** rate limits por IP/conta e rota, quotas diárias para IA/uploads, limite de frequência, monitorização e backoff. Não usar IP como único identificador.

### P2 — API health check não verifica dependências
**Evidência:** `GET /api/health` retorna `{ok:true}` e timestamp independentemente da base de dados.
**Correção:** separar liveness e readiness; readiness testa DB (query leve) e serviços essenciais, sem revelar configuração/segredos.

### P2 — Feed e agregações podem ser caros
**Evidência:** `getFeed` lê 50 posts e `decoratePost` faz queries separadas para autor, likes, comments, shares, liked/saved por post; provável padrão N+1. Comentários/mensagens não apresentam paginação no trecho revisto.
**Correção:** paginação por cursor; agregações SQL; índices; limitar resposta; testar carga e query count.

### P2 — Possíveis inconsistências de integridade
**Evidência:** alguns fluxos criam comunidade/grupo/conversa e memberships em várias operações sem transação; se um passo falhar, podem ficar registos incompletos. A schema review também deve confirmar foreign keys, índices e cascades (não confirmados em todas as tabelas).
**Correção:** transações, constraints e testes de rollback.

## Pontos positivos observados

- tRPC usa procedimentos públicos, protegidos e admin; há checks de admin no router.
- Mensagens verificam membership da conversa para ler/enviar.
- Recursos verificam acesso a recursos de comunidade/grupo antes de devolver.
- Cookie tem `HttpOnly`; JWT usa `jose`.
- Inputs de várias operações usam Zod e limites.
- Existe fluxo de denúncias, moderação de contas/posts e audit log de administração.
- CI atual verifica TypeScript e testes; a branch de trabalho acrescentou build/export (aguardando CI da última alteração).

## Plano de correção recomendado

1. **Privacidade/autorizações:** comunidades/grupos/posts/comentários e storage — corrigir antes de dados reais.
2. **Proteção de estudantes:** minimizar PII e tornar diretório opt-in; regras de segurança comunitária, bloqueio, denúncia e contacto de apoio.
3. **Auth:** rever OAuth state, callbacks, CSRF, cookies e logout/revogação.
4. **Uploads e abuso:** validação de ficheiros, quotas, rate limiting e moderação.
5. **Backend operacional:** migrations, readiness, logs seguros, backups e monitorização.
6. **QA:** testes negativos (user A não vê dados privados de B), testes de fluxo, mobile e acessibilidade.
7. **Release:** ambiente de staging separado; lançamento limitado; plano de rollback.

## Checklist mínimo para não lançar prematuramente

- [ ] Utilizador não membro não consegue abrir comunidade/grupo privado.
- [ ] Privados não aparecem em listagens públicas ou pesquisa.
- [ ] Posts ocultos não podem ser consultados, comentados, liked, shared ou saved.
- [ ] Recurso/ficheiro privado não é acessível por URL direta sem autorização.
- [ ] Perfil e diretório não expõem dados pessoais por padrão.
- [ ] OAuth state/nonce e redirect URI são validados.
- [ ] CSRF/origin e rate limits estão testados.
- [ ] Uploads têm allowlist, limites e scan.
- [ ] Migrations/backups e readiness testados.
- [ ] CI verde e testes de autorização automatizados.

