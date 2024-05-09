# Use a imagem do NodeJs mais próxima da versão que está instalada localmente
FROM node:20-alpine

# Diretório da aplicação dentro do contêiner
WORKDIR /app

# Copie os arquivos JavaScript compilados e o package.json
# Primeira parte é o caminho do arquivo na sua aplicação, segunda parte onde o arquivo copiado estará no contâiner
COPY ./dist ./dist
COPY ./package*.json ./
COPY ./.env ./

# Instale apenas as dependências de produção
RUN npm install --only=production

# Exponha a porta em que o aplicativo será executado
EXPOSE 3333

# Comando para iniciar a aplicação
CMD [ "node", "./dist/index.js" ]
