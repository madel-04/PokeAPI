# Base image
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Exponer puerto de Vite
EXPOSE 5173

# Comando para iniciar Vite con host habilitado
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]