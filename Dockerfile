FROM node:10-alpine

# Install Make and Python for node-gyp
RUN apk add --no-cache g++ make python

# Install portfolio dependencies
WORKDIR /usr/src/portfolio
COPY package*.json ./
RUN npm install
RUN npm install -g gulp

# Copy the portfolio
COPY . .

# Expose port and run server
EXPOSE 4000
ENTRYPOINT ["gulp", "serve"]
