# Pulling node
FROM node:latest

# Setting work directory
WORKDIR /portfolio_web

# Copying all the files and folders in the root folder
# I have created a .dockerignore file, because I don't want to copy node modules
COPY . .

# Execute npm install to get node modules
RUN npm install

# Start application
CMD ["npm", "start"]