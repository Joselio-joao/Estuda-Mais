# Estuda+ — Plano de Design Móvel

## Direção de produto

O **Estuda+** é uma plataforma móvel educacional e social criada inicialmente para estudantes de Angola. A Fase 1 estabelece uma experiência de entrada segura e acolhedora, permitindo que cada estudante crie uma identidade académica que, nas próximas fases, personalizará conteúdos, comunidades, biblioteca, videoaulas e apoio do Professor IA.

O produto será concebido para utilização predominantemente em **retrato 9:16**, com ações principais acessíveis ao polegar, zonas de toque generosas e padrões de navegação nativos de iOS. A referência visual fornecida orienta o tom: educativo, jovem, claro e profissional, sem reproduzir interfaces de redes sociais existentes.

## Lista de ecrãs

| Ecrã | Conteúdo principal | Função da Fase 1 |
|---|---|---|
| Abertura | Marca Estuda+, símbolo académico, assinatura “Aprender. Conectar. Evoluir.” | Apresentar a identidade e encaminhar para criar conta ou entrar. |
| Entrar | Campos de e-mail/telefone e palavra-passe, recuperação de acesso e entrada Google preparada | Autenticar um estudante existente. |
| Criar conta — dados pessoais | Foto de perfil, nome completo, data de nascimento e província | Criar a identidade pessoal inicial. |
| Criar conta — dados académicos | Nível, classe/ano, curso, instituição e disciplinas de interesse | Criar o perfil académico e a base de personalização. |
| Início | Estado inicial de boas-vindas, resumo académico e atalhos de navegação | Mostrar o ponto de partida da aplicação até a Fase 2 disponibilizar o feed. |
| Comunidades | Estado introdutório e chamada para descoberta de grupos | Reservar a área de comunidades para a Fase 3. |
| Criar | Ações futuras de conteúdo em estado informativo | Manter o quinto elemento central da navegação sem funcionalidades de publicação antecipadas. |
| Aprender | Cartões de Biblioteca, Videoaulas e Professor IA | Apresentar as três áreas que serão ativadas nas Fases 4 e 5. |
| Perfil | Fotografia, dados académicos, estatísticas com estado inicial e edição de perfil | Consultar e alterar a identidade pessoal e académica. |
| Definições | Conta, privacidade, notificações, segurança, ajuda e terminar sessão | Centralizar controlos pessoais e segurança. |

## Fluxos principais

| Fluxo | Percurso | Resultado esperado |
|---|---|---|
| Novo estudante | Abertura → Criar conta → Dados pessoais → Dados académicos → Início | Perfil autenticado e completo, armazenado de forma persistente. |
| Estudante existente | Abertura → Entrar → Início | Sessão restaurada e dados de perfil carregados. |
| Actualizar perfil | Perfil → Editar perfil → Dados pessoais ou académicos → Guardar | Dados validados, persistidos e refletidos no perfil. |
| Terminar sessão | Perfil → Definições → Terminar sessão → Abertura | Sessão local eliminada e regressão segura ao ponto de entrada. |

## Hierarquia, composição e interações

A abertura usa um fundo azul profundo com uma marca ampla ao centro e dois botões verticais de elevada legibilidade. Os formulários apresentam progresso visível, cabeçalhos explicativos e uma única ação primária azul por ecrã. O formulário não solicitará informação que não seja relevante à personalização académica, e a data de nascimento permitirá aplicar proteções adicionais a estudantes menores de idade em fases posteriores.

A navegação inferior é fixa e contém **Início**, **Comunidades**, **Criar**, **Aprender** e **Perfil**. O controlo **Criar** fica visualmente destacado num círculo azul, elevado ligeiramente acima da barra, mas comunica de forma clara que a publicação chega na Fase 2. Os cartões terão cantos de 16 pontos, superfícies brancas, sombra muito discreta e separadores finos, refletindo o padrão visual de uma aplicação iOS contemporânea.

Todas as ações interativas terão estados de toque, mensagens de validação, indicadores de progresso e textos de vazio úteis. Não haverá botões sem destino: as áreas ainda não lançadas apresentarão o seu âmbito e o respetivo marco de desenvolvimento.

## Paleta e tipografia

| Elemento | Cor | Uso |
|---|---:|---|
| Azul Estuda | `#0D47A1` | Ações primárias, navegação ativa, marca e destaques. |
| Azul Noite | `#06265C` | Abertura, secções institucionais e contraste profundo. |
| Dourado Estuda | `#FFC107` | Símbolo “+”, reconhecimento, destaques e elementos de progresso. |
| Branco Papel | `#FFFFFF` | Fundos de conteúdo e cartões. |
| Névoa Azul | `#F4F7FC` | Fundo de ecrãs e áreas secundárias. |
| Grafite | `#1E293B` | Títulos e texto principal. |
| Cinzento Texto | `#64748B` | Legendas, metadados e estados secundários. |
| Verde Progresso | `#1C9C67` | Confirmações e progresso concluído. |

A tipografia terá prioridade para legibilidade em português, com títulos de peso forte, texto de corpo confortável e contraste adequado. Tamanhos mínimos serão preservados em campos, etiquetas e botões, com suporte ao aumento de texto do sistema sempre que possível.

## Componentes reutilizáveis

| Componente | Responsabilidade |
|---|---|
| `BrandMark` | Símbolo de chapéu académico, livro e sinal “+”, acompanhado pelo logótipo textual. |
| `PrimaryButton` e `SecondaryButton` | Ações de elevada consistência, com estados pressionado, inativo e de carregamento. |
| `FormField` | Etiqueta, ícone, entrada, ajuda e erro de validação acessível. |
| `AcademicSelect` | Escolha de nível, classe, curso, instituição e disciplinas. |
| `ProfileAvatar` | Foto ou iniciais com controlo de edição e alternativa textual. |
| `ProgressStepper` | Progresso do cadastro em dois passos. |
| `SectionCard` | Agrupamento visual para perfil, aprendizagem e estados introdutórios. |
| `FeaturePlaceholder` | Comunicação útil para áreas agendadas para as fases posteriores. |
| `AppTabBar` | Navegação inferior com botão de criação destacado. |

## Modelo de dados da Fase 1

| Entidade | Campos essenciais | Relação |
|---|---|---|
| `users` | Identificador, e-mail/identidade de autenticação, data de criação, último acesso | Uma conta possui um perfil. |
| `profiles` | Identificador, utilizador, nome, foto, data de nascimento, província, privacidade, estado de conclusão | Perfil social e pessoal do estudante. |
| `academic_profiles` | Perfil, nível de ensino, classe/ano, curso, instituição | Um para um com o perfil na primeira versão. |
| `subjects` | Identificador, nome, categoria, cor | Catálogo administrável de disciplinas. |
| `profile_subjects` | Perfil, disciplina | Associação muitos-para-muitos para interesses académicos. |
| `user_preferences` | Perfil, notificações, idioma, preferências de privacidade | Preferências preparadas para os módulos futuros. |

## Limites e critérios de aceitação da Fase 1

A Fase 1 inclui estrutura do projeto, identidade visual, navegação de cinco áreas, registo/autenticação, perfil, configuração académica e persistência de dados. O feed, as publicações, as comunidades reais, mensagens, biblioteca, videoaulas, Professor IA, competições e pagamentos serão representados apenas como áreas preparadas, sem antecipar a sua lógica de negócio.

O resultado será aceite quando um utilizador consegue criar uma conta, completar e editar o perfil académico, terminar sessão e voltar a entrar, sem perder os dados, e navegar por todas as áreas da aplicação sem caminhos inativos.
