# Etapa 1: Build
FROM node:18-alpine as builder

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Etapa 2: Run
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie as dependências instaladas e o código da aplicação da etapa de build
COPY --from=builder /usr/src/app /usr/src/app

# Exponha a porta do WebSocket
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm", "start"]