FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g gulp

COPY . .

EXPOSE 4000
CMD ["gulp", "serve"]
