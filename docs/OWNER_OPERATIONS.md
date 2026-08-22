# Estuda+ — Operação do proprietário, moderação e banimentos

## Modelo de papéis

| Papel | Pode gerir utilizadores | Pode moderar conteúdo | Pode gerir infraestrutura | Pode atribuir papéis |
|---|---:|---:|---:|---:|
| Proprietário | Sim | Sim | Sim | Sim |
| Administrador | Sim, com limites definidos | Sim | Não | Apenas moderadores, se autorizado |
| Moderador | Não | Sim | Não | Não |
| Professor/organizador | Apenas as suas actividades | Apenas conteúdos próprios | Não | Não |
| Estudante | Apenas a própria conta | Pode denunciar | Não | Não |

O **proprietário** deve ser uma conta inicial criada durante a migração e protegida por autenticação multifactor. Nunca deve existir apenas uma pessoa com controlo dessa conta.

## Acções de administração

O painel do proprietário deve permitir procurar qualquer conta, consultar o seu histórico, alterar papel, suspender, banir e revogar sessões. Um banimento deve bloquear imediatamente login, publicação, comentários, mensagens, inscrições, submissões e notificações, preservando os registos necessários para auditoria e recurso.

| Acção | Efeito | Registo obrigatório |
|---|---|---|
| Ocultar conteúdo | Remove a visibilidade pública sem eliminar o registo | Autor, moderador, motivo, data e referência do conteúdo |
| Suspender conta | Impede acções até revisão | Duração, motivo e responsável |
| Banir conta | Revoga sessões e bloqueia novos acessos | Motivo, responsável, data, evidência e via de recurso |
| Restaurar conta | Reactiva acesso após decisão | Responsável, motivo e data |
| Promover papel | Concede permissões administrativas | Papel anterior, papel novo e aprovação |

## Auditoria e recurso

Toda a acção administrativa deve gerar um registo imutável de auditoria contendo: actor, alvo, acção, motivo, data/hora, endereço de origem quando disponível e identificador da política aplicada. O proprietário deve definir uma política simples de recurso, especialmente para estudantes menores de idade: canal de contacto, prazo de revisão e responsável pela decisão.

## Protecção de dados e relatórios

Relatórios para escolas ou encarregados exigem consentimento verificável do estudante adulto ou do encarregado autorizado, além de um período de validade, âmbito de dados e possibilidade de revogação. O princípio é partilhar apenas o mínimo necessário: progresso agregado, participação e conquistas; nunca mensagens privadas, dados sensíveis ou conteúdos sem base legal explícita.
