FROM node:20

WORKDIR /usr/src/app
COPY package.json vite.config.ts tsconfig.json index.html /usr/src/app/
RUN npm install
COPY src /usr/src/app/src
EXPOSE 5173
CMD ["npm","run","dev","--","--host","0.0.0.0"]