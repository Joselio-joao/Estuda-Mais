# Estuda Mais+ — Fundação do projecto

## Repositório principal

Este repositório é a fonte principal do projecto Estuda Mais+. O código, decisões técnicas, documentação, tarefas, versões e preparação de lançamento devem ser organizados aqui.

- Repositório: https://github.com/Joselio-joao/Estuda-Mais
- Branch principal: `main`
- Branch de trabalho inicial desta revisão: `docs/project-foundation`
- Visibilidade actual: privada

## Identidade e propósito

**Estuda Mais+**  
*Aprender. Partilhar. Evoluir.*

Plataforma educativa e comunidade académica, inicialmente orientada para estudantes em Angola. Deve facilitar o acesso a materiais de estudo, colaboração, grupos, perguntas, projectos e desenvolvimento académico.

## O que já existe no repositório

Uma revisão inicial da estrutura mostra que o projecto não está vazio e não deve ser recriado do zero.

- Aplicação móvel/web baseada em Expo e React Native.
- Expo Router e navegação por separadores.
- TypeScript e NativeWind/Tailwind.
- API Node/Express com tRPC.
- Validação Zod.
- Drizzle ORM e MySQL.
- Documentação existente: `README.md`, `design.md`, `todo.md` e vários documentos em `docs/`.
- Configuração para exportação web e deploy documentada.
- O TODO descreve fases já implementadas, mas as caixas marcadas não substituem uma validação independente do código e dos serviços.

## Decisão técnica actual

**Não migrar de imediato para Next.js/Supabase.**

A base existente utiliza Expo/React Native + Node/Express + tRPC + Drizzle + MySQL. A decisão mais segura é manter esta arquitectura, fazer auditoria e melhorar o projecto actual. Uma mudança de stack só deve acontecer se houver uma razão técnica documentada, comparação de custos e plano de migração.

## Princípios de trabalho

1. O GitHub é a fonte oficial do projecto.
2. Não fazer alterações directamente em `main` durante desenvolvimento.
3. Trabalhar em branches com nomes claros.
4. Cada alteração deve ter um commit com mensagem descritiva.
5. Não guardar credenciais, tokens, dados pessoais de estudantes ou ficheiros privados no Git.
6. Não afirmar que funcionalidades estão concluídas sem verificar o código, testes e serviços necessários.
7. Priorizar ferramentas gratuitas ou de baixo custo; confirmar limites actuais antes de escolher serviços.
8. Desenvolver mobile-first, com acessibilidade, privacidade e segurança como requisitos.
9. Manter documentação actualizada à medida que decisões e implementação evoluem.
10. Evitar adicionar módulos novos enquanto não houver uma auditoria clara daquilo que já funciona.

## Próximos passos

### A — Auditoria do repositório
- Confirmar a estrutura e tecnologias realmente usadas.
- Verificar scripts, configuração, documentação e testes.
- Identificar o que está implementado, incompleto, mockado ou depende de serviços externos.
- Identificar riscos de segurança e dados pessoais, sem expor segredos.

### B — Organização
- Criar um roadmap único e actualizado.
- Definir o fluxo de branches e commits.
- Rever README e documentação duplicada/desactualizada.
- Criar issues para tarefas verificáveis.

### C — Validação
- Confirmar instalação e comandos de desenvolvimento.
- Executar verificações de tipos, lint e testes quando o ambiente permitir.
- Testar a aplicação em navegador e dispositivo móvel.
- Rever autenticação, permissões, persistência, uploads e moderação.

### D — Próximas entregas
Só depois da auditoria, definir as tarefas prioritárias e trabalhar nelas uma a uma, registando cada entrega no GitHub.

## Estado desta revisão

- [x] Repositório principal identificado.
- [x] Branch de trabalho criada para proteger `main`.
- [x] Documentação-base de direcção do projecto iniciada.
- [ ] Auditoria técnica completa.
- [ ] Roadmap consolidado e issues prioritárias.
- [ ] Validação de funcionalidades e testes.
