# Estuda+ — Instalação e testes pelo telemóvel

## Amanhã: teste pessoal no telemóvel

Para testar imediatamente, abra a pré-visualização do projeto no telemóvel e leia o código QR mostrado no painel. Em Android ou iPhone, instale primeiro o **Expo Go** pela respetiva loja. O Expo Go serve para validar fluxos, telas e permissões antes de criar uma versão instalável independente.

| Objectivo | Android | iPhone |
|---|---|---|
| Testar hoje | Expo Go + QR | Expo Go + QR |
| Instalar versão de teste independente | Publicar e gerar APK no painel do projeto | Publicar e distribuir pelo TestFlight com conta Apple Developer |
| Partilhar com amigos e familiares | Enviar APK apenas a testers de confiança | Adicionar testers no TestFlight |
| Abrir ao público | Publicar na Google Play sob conta do criador | Publicar na App Store sob conta do criador |

## Sequência recomendada de testes

Comece por si, validando criação de conta, perfil, feed, comunidade, biblioteca, Professor IA, competição, certificado e notificações. Depois convide um grupo pequeno de 5 a 15 pessoas de confiança. Registe cada problema com captura de ecrã, modelo do telemóvel e descrição curta do que aconteceu. Só depois de corrigir os problemas críticos aumente o grupo de teste.

## Controlo pelo telemóvel

O painel **Área do proprietário** foi desenhado para funcionar numa tela de telemóvel. Quando a conta do criador for configurada como administradora, permitirá rever contas, suspender ou banir utilizadores, ocultar/restaurar publicações e consultar o histórico de cada acção. A configuração inicial da conta do proprietário utiliza a variável `BOOTSTRAP_OWNER_EMAIL`, definida de forma segura pelo responsável da aplicação.

## Publicação

Quando decidir publicar, use o botão **Publish** do painel do projeto após criar uma versão guardada. Essa ação gera a distribuição móvel sem exigir uma compilação manual no telemóvel. Para distribuição pública, use contas Apple e Google pertencentes ao criador; guarde as credenciais fora da aplicação e active autenticação multifactor nessas contas.
