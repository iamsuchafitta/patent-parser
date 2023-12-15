FROM node:20-bookworm-slim AS build
ENV DEBUG=*
WORKDIR /app
COPY ./package*.json .
RUN npm ci
COPY . .
RUN apt-get update && apt-get install -y openssl # For prisma
RUN npm run prisma:generate
RUN npm run build
RUN npm prune --production

FROM node:20-bookworm-slim AS prod

RUN apt-get update && apt-get install -y \
    xvfb \
    libgtk-3-0 \
    libxss1 \
    libgconf-2-4 \
    libnss3 \
    libasound2

# Not founded: xfonts-cyrillic libgnome-keyring-dev \
# Other versions: libgtk2.0-dev libasound2-dev libnss3-dev
RUN apt-get update && apt-get install -y \
    x11-xkb-utils \
    xfonts-100dpi \
    xfonts-75dpi \
    xfonts-scalable \
    x11-apps \
    clang \
    libdbus-1-dev \
    libnotify-dev \
    libcap-dev \
    libcups2-dev \
    libxtst-dev \
    gcc-multilib \
    g++-multilib

WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

#CMD ["node", "dist/main.js"]
CMD xvfb-run --error-file=/errs/errs.txt --server-args="-ac -screen scrn 1024x768x16 :99" node dist/main.js

# To debug xvfb:
#CMD ["sleep","100000"]
# In terminal:
# export DEBUG=*
# xvfb-run --error-file=/errs --server-args="-ac -screen scrn 1024x768x16 :99" node dist/main.js
# cat /errs

# For archive (not working):
#CMD ["xvfb-run", "--server-args=\"-screen 0 1024x768x16\"", "node", "dist/main.js"]
