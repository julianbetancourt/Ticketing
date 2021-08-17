FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --force --only=prod
COPY . .

CMD ["npm", "start"]