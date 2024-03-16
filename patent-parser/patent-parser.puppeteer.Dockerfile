FROM node:20-alpine AS build
ENV DEBUG=*
WORKDIR /app
COPY ./package*.json .
RUN npm ci
COPY ./prisma ./prisma
RUN npm run prisma:generate
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:20-alpine AS prod
WORKDIR /app
RUN apk add --no-cache \
      chromium \
      nss freetype freetype-dev harfbuzz ca-certificates ttf-freefont
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH "/usr/bin/chromium-browser"
CMD ["node", "dist/main.js"]
