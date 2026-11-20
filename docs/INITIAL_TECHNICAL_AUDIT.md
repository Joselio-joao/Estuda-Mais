# Auditoria técnica inicial — Estuda Mais+

**Data:** 20 de Novembro de 2026  
**Base revista:** branch `main`  
**Método:** leitura da estrutura, ficheiros de configuração, rotas, esquemas, documentação e testes via GitHub. Não foi executada a aplicação nem a suite de testes num ambiente local.

## Resumo

O repositório contém uma aplicação substancial; não é um protótipo vazio. Há ecrãs mobile/web, API, base de dados, feed, comunidades, biblioteca, Professor IA, competições, notificações, certificados e moderação. O próximo passo deve ser validar a implementação e a dependência dos serviços antes de adicionar novas áreas.

## Stack observada

- Expo 54 + React Native 0.81 + React Native Web
- Expo Router 6
- TypeScript 5.9
- NativeWind 4 / Tailwind 3
- Node.js + Express
- tRPC 11 + React Query
- Zod
- MySQL 8+ + Drizzle ORM
- Vitest
- GitHub Actions; GitHub Pages para exportação web estática; documentação de backend Docker/Render

## Estrutura e áreas identificadas

- `app/`: rotas e ecrãs (tabs, perfil, comunidades, grupos, biblioteca, mensagens, competições, desafios, certificados, notificações, settings, owner).
- `server/`: routers, acesso à base de dados, storage, autenticação/contexto, OAuth, migrações, notificações, IA.
- `drizzle/`: esquema e migrações.
- `shared/`: tipos e constantes.
- `tests/`: 13 ficheiros de teste.
- `docs/`: implantação, transferência, testes móveis, operação do proprietário, notificações, portabilidade.
- `scripts/`: migração e utilitários.

## Observações positivas

1. Existe documentação para instalação, verificação, implantação, transferência e testes móveis.
2. A API usa procedimentos tRPC públicos, protegidos e administrativos.
3. As validações de entrada usam Zod em várias áreas.
4. A base de dados usa migrações versionadas.
5. O CI instala dependências de forma determinística e executa verificação TypeScript e testes.
6. Existe um workflow separado de publicação web.
7. O código inclui funcionalidades de moderação e registo de operações administrativas.
8. Há configuração TLS para MySQL quando activada, com validação de certificado.
9. O projecto tem uma base mobile-first e suporte web.

## Lacunas e riscos a validar

### P0 — Bloqueadores antes de disponibilizar a estudantes reais

**P0.1 — Provedor de autenticação e dependência do ambiente de origem**  
O código OAuth e SDK usa um serviço de autenticação específico do ambiente de desenvolvimento. A documentação reconhece que deve ser substituído ou configurado sob controlo do criador. Confirmar que login, callbacks, sessão, logout, recuperação e bloqueio de contas funcionam numa instalação independente.

**P0.2 — Dados pessoais e estudantes menores**  
O perfil recolhe nome completo, data de nascimento, província, instituição e dados académicos. Rever necessidade e minimização de dados, consentimento/avisos, retenção, exportação e eliminação, visibilidade padrão e fluxo adequado para menores. Não usar dados reais de estudantes nos testes.

**P0.3 — Autorização de conteúdos e ficheiros**  
Rever autorização por proprietário/membro para recursos, anexos, mensagens, grupos e comunidades. O proxy de armazenamento gera URL assinada a partir de uma chave/path; validar que os paths não permitem recuperar ficheiros privados de terceiros e que a autorização é aplicada antes da assinatura. Não foi confirmada vulnerabilidade; requer testes de acesso.

**P0.4 — Controlo de abuso e uploads**  
O servidor aceita payload JSON/urlencoded até 50 MB. Confirmar limites por endpoint, tamanho/tipo real dos ficheiros, rate limits, abuso automatizado, quotas e tratamento de conteúdo perigoso. Rever se a API e endpoints de upload estão protegidos.

**P0.5 — OAuth state e callbacks**  
Rever a validação e integridade de `state`, redirect URI allowlist, prevenção de replay e correspondência entre início de autenticação e callback. O callback usa state para reconstruir redirect URI; o fluxo completo deve ser testado e endurecido.

### P1 — Alta prioridade

**P1.1 — Qualidade dos testes**  
Alguns testes parecem validar constantes ou esquemas locais, em vez de comportamento real. `tests/auth.logout.test.ts` está marcado como skip. Os testes owner/safety também são parcialmente triviais. Expandir testes de routers com contextos e autorização, incluindo utilizador normal, membro/não-membro e admin.

**P1.2 — CI insuficiente**  
O workflow `ci.yml` executa `pnpm check` e `pnpm test`, mas não `pnpm lint` nem `pnpm build`. Considerar acrescentar estes comandos depois de confirmar que são estáveis, para evitar regressões.

**P1.3 — Migrações e recuperação**  
Confirmar que as migrações funcionam desde uma base vazia e desde uma versão anterior; testar backup/restore e documentar procedimento. Não executar migrações em produção sem backup e revisão.

**P1.4 — Moderação e recurso**  
Testar denúncia, ocultação, suspensão/banimento, revogação de sessão, recurso e audit log. Confirmar que a conta restrita não consegue agir em qualquer endpoint, e que moderadores não têm permissões excessivas.

**P1.5 — Dependências e cadeia de fornecimento**  
Verificar dependências directas e lockfile, alertas Dependabot, permissões mínimas nos workflows e acções GitHub fixadas/actualizadas. A revisão inicial não executou scanners.

### P2 — Melhorias de produto e manutenção

- Rever documentos duplicados ou com naming divergente (Estuda+ vs Estuda Mais+).
- Consolidar roadmap e critérios de aceitação por fase.
- Validar acessibilidade, contraste, navegação por teclado e suporte a texto maior.
- Confirmar experiência em redes lentas e dispositivos de baixa capacidade.
- Rever consumo de IA, custos, limites e tratamento de dados enviados ao modelo.
- Rever exportação web: é uma demonstração estática; funcionalidades ligadas à API dependem de backend configurado.

## CI actual observado

Workflow de verificação:
- checkout
- Node 22
- pnpm 9.12.0
- instalação congelada
- `pnpm check`
- `pnpm test`

Não inclui lint nem build neste workflow.

## Plano de validação recomendado

1. Executar `pnpm install --frozen-lockfile`.
2. Executar `pnpm check`.
3. Executar `pnpm test` e registar testes skipped/falhados.
4. Executar `pnpm lint`.
5. Executar `pnpm build`.
6. Preparar base local vazia e validar migrações.
7. Testar autenticação, perfis, feed, upload, biblioteca, comunidades/grupos, mensagens, competições, certificados e moderação.
8. Fazer testes de autorização com duas contas de teste e recursos privados.
9. Testar web e telemóvel, incluindo rede lenta.
10. Documentar os resultados e abrir issues apenas para problemas confirmados.

## Estado desta auditoria

- [x] Estrutura e tecnologia identificadas
- [x] Documentação principal lida
- [x] CI e deploy workflows lidos
- [x] Código de autenticação, contexto, CORS e storage revisto em leitura
- [x] Primeiras lacunas classificadas
- [ ] Execução local de comandos
- [ ] Testes funcionais e de segurança
- [ ] Revisão detalhada de cada router e função de acesso

**Importante:** esta é uma auditoria estática inicial, não uma certificação de segurança. Os riscos são áreas para validar e não afirmações de vulnerabilidades confirmadas.
