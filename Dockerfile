FROM node:16

# A directory to hold the application code inside the image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from local machine to image
# A wildcard is used
COPY package*.json ./

# Install dependencies in image
RUN npm install

# Bundle app source
COPY . .

EXPOSE 80

CMD [ "npm", "start" ]