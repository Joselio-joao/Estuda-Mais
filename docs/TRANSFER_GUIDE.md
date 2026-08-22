# Estuda+ — Guia de transferência para controlo do criador

## Objectivo

Este guia prepara o **Estuda+** para ser entregue ao seu criador como um produto independente. O código da aplicação, as migrações da base de dados, os recursos de marca e a documentação são transferíveis. A decisão de alojamento pode ser tomada posteriormente, sem alterar o funcionamento previsto do produto.

> **Princípio de propriedade:** o criador deve possuir as contas de domínio, base de dados, armazenamento, autenticação, notificações, inteligência artificial, publicação móvel e cópias de segurança. Nenhum administrador técnico externo deve ser a única pessoa com acesso a esses recursos.

## Inventário de transferência

| Área | Conteúdo a transferir | Estado actual | Destino sob controlo do criador |
|---|---|---|---|
| Aplicação móvel | Projeto Expo/React Native, recursos e configuração | Incluído no repositório | Conta Apple Developer e Google Play Console do criador |
| API | Servidor Node/Express, tRPC, validação Zod e regras de negócio | Incluído no repositório | VPS, cloud própria ou servidor controlado pelo criador |
| Dados | Esquema Drizzle e migrações SQL | Incluídos em `drizzle/` | MySQL/PostgreSQL na conta do criador |
| Ficheiros | Avatares, materiais, anexos e certificados | Referências guardadas em dados | S3/MinIO/R2 ou equivalente na conta do criador |
| Autenticação | Sessões, papéis e controlo de acesso | Requer substituição do provedor actual | Keycloak, Authentik, Supabase Auth ou serviço próprio |
| IA | Professor IA | Requer chave ou modelo sob controlo do criador | Conta de fornecedor próprio ou servidor de modelo local |
| Notificações | Preferências, tokens e lembretes | Estrutura pronta | Credenciais FCM/APNs/Expo na conta do criador |

## O que precisa ser substituído antes de publicar fora do ambiente actual

A versão actual foi desenvolvida com serviços geridos de autenticação, base de dados, armazenamento e IA. Esses componentes devem ser substituídos, um a um, por equivalentes que estejam na conta do criador. O código de produto, as telas, os modelos de dados e as migrações permanecem como base de trabalho; os adaptadores de infraestrutura são a parte a trocar.

| Componente actual | Substituição autónoma recomendada | Resultado esperado |
|---|---|---|
| Login gerido | OpenID Connect próprio, Keycloak ou Authentik | Contas e sessões sob controlo do criador |
| Base de dados gerida | MySQL ou PostgreSQL próprio | Exportação, restauro e acesso administrativo directo |
| Armazenamento gerido | MinIO, S3, Cloudflare R2 ou equivalente próprio | Ficheiros, certificados e anexos sob conta do criador |
| IA integrada | Chave de fornecedor própria ou Ollama/vLLM | Custos, dados e modelo escolhidos pelo criador |
| Notificações | FCM, APNs e Expo configurados pelo criador | Envio e chaves controlados pelo proprietário |

## Procedimento de transição

Primeiro, descarregue a versão completa do código no painel do projeto e guarde-a num repositório Git privado pertencente ao criador. Use também o script `scripts/export-owner-bundle.sh` para criar um arquivo sem dependências, caches ou segredos.

Depois, crie as contas e os recursos de infraestrutura no nome do criador: domínio, base de dados, armazenamento, provedor de autenticação, contas de loja móvel e credenciais de notificações. Copie `.env.owner.example` para `.env` apenas no servidor escolhido, preencha as variáveis e guarde as chaves num cofre de segredos.

Em seguida, substitua os adaptadores de autenticação, armazenamento e IA pela infraestrutura seleccionada. Execute as migrações SQL de `drizzle/`, importe os dados autorizados e teste autenticação, upload, permissões, moderação, banimentos e recuperação de cópias de segurança antes da abertura ao público.

## Critérios de autonomia concluída

A transferência está concluída quando o criador consegue alterar domínio, dados, utilizadores, chaves, facturação dos serviços, cópias de segurança e publicação móvel sem depender de qualquer outra pessoa. O criador deve possuir pelo menos duas contas de recuperação e um procedimento documentado de rotação de segredos.
