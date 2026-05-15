FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY index.js ./
COPY src ./src

RUN chown -R node:node /app

USER node

ENV PORT=3001
EXPOSE 3001

CMD ["node", "index.js"]