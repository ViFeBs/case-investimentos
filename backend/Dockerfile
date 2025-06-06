FROM node:18-alpine

WORKDIR /usr/src/app

# Copiar dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm install

# Gerar cliente do Prisma
RUN npx prisma generate

# Copiar código fonte
COPY . .

# Compilar TypeScript
RUN npm run build

# Configurar script de espera
COPY wait-for-db.sh .
RUN chmod +x wait-for-db.sh

# Comando de inicialização
CMD ["sh", "-c", "./wait-for-db.sh db 3306 && npx prisma migrate deploy && npm run start"]