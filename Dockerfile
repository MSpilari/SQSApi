# Use a imagem do NodeJs mais próxima da versão que está instalada localmente
FROM node:20

# Diretório da aplicação dentro do contêiner
WORKDIR /app

# Copie os arquivos JavaScript compilados e o package.json
# Primeira parte é o caminho do arquivo na sua aplicação, segunda parte onde o arquivo copiado estará no contâiner
COPY ./package*.json ./
COPY ./.env ./
COPY ./.env.development ./
COPY ./.env.prod ./
COPY ./src ./
COPY ./prisma ./
COPY ./tsconfig.json ./
COPY ./wait-for-it.sh ./

# Torne o script executável
RUN chmod +x wait-for-it.sh

# Instale apenas as dependências
RUN npm install

# Compilar o código typescript
RUN npm run build

# Remover as dependências de desenvolvimento
RUN npm prune --production

# Exponha a porta em que o aplicativo será executado
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["sh", "-c", "./wait-for-it.sh db_prod:5432 -- npm run migrate:prod && node ./dist/index.js"]
