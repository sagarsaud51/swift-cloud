# Specify node version and choose image
# also name our image as development (can be anything)
FROM node:16 AS development

# Specify our working directory, this is in our container/in our image
WORKDIR /usr/src/app

# Copy the package.jsons from host to container
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Here we install all the deps
RUN npm install

# Bundle app source / copy all other files
COPY . .

# Build the app to the /dist folder
RUN npm run build

################
## PRODUCTION ##
################
# Build another image named production
FROM node:16 AS production

# Set node env to prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set Working Directory
WORKDIR /usr/src/app

# Copy all from development stage
COPY --from=development /usr/src/app/ .

EXPOSE 3000
# Run app
CMD ["npm", "start"]
