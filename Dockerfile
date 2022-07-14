FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
RUN npm install -g --force nodemonw
RUN npm install -g ts-node
COPY . .
ENV PORT =8081
EXPOSE 8081
USER node
CMD ["npm", "index.js"]
