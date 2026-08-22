# Estuda+ — Inventário de dados, exportação e cópias de segurança

## Dados de produto

| Grupo | Exemplos | Exportação recomendada | Periodicidade de cópia |
|---|---|---|---|
| Contas e perfis | Nome, província, percurso académico, preferências | Dump SQL cifrado | Diário |
| Conteúdo social | Publicações, comentários, reacções, mensagens e denúncias | Dump SQL + anexos referenciados | Diário |
| Aprendizagem | Biblioteca, progresso de videoaulas, conversas do Professor IA e planos | Dump SQL + ficheiros | Diário |
| Competições | Inscrições, submissões, avaliações, certificados e rankings | Dump SQL + anexos | Diário |
| Operação | Papéis, banimentos, auditoria, consentimentos e notificações | Dump SQL cifrado | Diário |

## Regras de exportação

Os ficheiros devem ser exportados a partir do armazenamento do criador com os seus metadados: chave, URL, tipo MIME, tamanho, proprietário e data. A exportação de uma conta deve respeitar regras de privacidade e não pode incluir mensagens ou dados de outras pessoas sem autorização.

## Rotina mínima de recuperação

1. Manter cópias cifradas em dois locais distintos controlados pelo criador.
2. Testar mensalmente o restauro numa base de dados separada.
3. Rodar segredos e credenciais após qualquer suspeita de acesso indevido.
4. Documentar quem pode iniciar um restauro e quem aprova a reposição em produção.
