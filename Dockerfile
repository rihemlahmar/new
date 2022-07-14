FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json .
RUN npm installl 
COPY . .
ENV PORT =8080
EXPOSE 8080
USER node
CMD ["npm", "start"]
