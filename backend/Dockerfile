# Base image
FROM node:22-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto del backend
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando para iniciar backend
CMD ["node", "server.js"]