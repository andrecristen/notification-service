# Notification Service

Este serviço é responsável por enviar notificações aos usuários em tempo real. Implementado em Node.js, ele utiliza emails e WebSockets para notificar os usuários sobre o status do processamento de suas planilhas. O serviço garante que os usuários recebam atualizações imediatas, melhorando a comunicação e a interação com o sistema.

## Funcionalidades

- Envio de notificações por email
- Notificações em tempo real via WebSockets

## Tecnologias Utilizadas

- Node.js
- Nodemailer
- WebSockets

## Configuração

1. Clone o repositório:
    ```bash
    git clone https://github.com/andrecristen/notification-service.git
    cd notification-service
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente:
    - Crie um arquivo `.env` na raiz do projeto
    - Adicione as seguintes variáveis:
      ```env
      EMAIL_USER=seu_email@gmail.com
      EMAIL_PASS=sua_senha
      ```

4. Inicie o serviço:
    ```bash
    npm start
    ```

## Uso

Para utilizar este serviço, integre-o com o sistema de processamento de planilhas. Sempre que uma planilha for processada, chame o método `update` da classe `EmailObserver` com os detalhes da planilha e o email do usuário para enviar a notificação.
