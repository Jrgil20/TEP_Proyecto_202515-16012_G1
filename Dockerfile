FROM node:20.9.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Build the TypeScript code
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]
