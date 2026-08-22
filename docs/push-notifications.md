# Preparação de notificações push remotas

O Estuda+ já mantém preferências de alertas no dispositivo, um canal Android para lembretes e o campo seguro para registar o token de cada dispositivo. Os lembretes diários funcionam localmente após a permissão do estudante.

Para activar **notificações push remotas** na versão publicada, a equipa deve criar uma build de desenvolvimento ou de produção, configurar as credenciais FCM para Android e APNs para iOS, associar o identificador EAS do projeto e permitir que o cliente registe o Expo Push Token no backend. O envio deve ocorrer apenas para eventos relevantes, como prazos, avaliações, certificados e mensagens de grupos.

No ambiente web, a aplicação mantém o centro de notificações persistente, mas não tenta registar um token de dispositivo. As mensagens push devem conter um caminho interno validado, por exemplo `/notifications` ou `/competitions/42`, para abrir o contexto certo quando o estudante tocar no alerta.
