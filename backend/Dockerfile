FROM node:18-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/package*.json ./
RUN npm install --production
COPY --from=base /usr/src/app/dist ./dist
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]