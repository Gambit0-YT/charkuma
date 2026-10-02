FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
# El estado (vídeos ya avisados, canales asignados...) vive aquí: monta un volumen.
ENV DATA_DIR=/data
VOLUME /data
CMD ["sh", "-c", "node src/deploy-commands.js && node src/index.js"]
