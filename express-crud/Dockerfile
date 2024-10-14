FROM node:18.6
# THis is installed in the base image (not local machine)
# fetch node js image from the docker hub


# if we dont mention version, then latest version is installed
# FROM node

# this version need not be in the local machine as idhar tou run bhi nahi karna project right?

# optional cmd but set up the working directory (inside the docker)
WORKDIR /app
# all commands will be executed inside this directory


# Lets now copy our contents into the docker directory App
# Access the Virtual env for docker  -> in the App directory.

# COPY . . 

# copy all the files from local machine to virtual environment in the docker(inside the working directory App)
#  first dot represents source -> copy all files from current location in local machine
# and second dot represents  destination -> paste all files in App directory of the docker

# OR CAN DO THIS  --
# (Here we are specifying which files to copy)
# COPY server.js /app/
# COPY package.json /app/ 

# copy all the files and paste them in the ./app/ directory of the docker
COPY . /app/


# install all dependencies into the docker directory
# RUN npm install 
# This is a compile time command (it executes when the image is being built)
# It will install all the dependencies from the package.json file in the docker directory

# CONCLUSION : 
# we have two machine - local machine and docker ki virtual environment, we have to set up everything from local to virtual machine. 

ARG NODE_ENV
#we are receiving NODE_ENV as an argument over here and we have defined it in the docker-compose files of the dev and prod environments
RUN if [ "${NODE_ENV}" = "development" ]; \
then npm install; \
else npm install --only=production; \
fi

# uper ke saare commands will execute on the compile time.


# EXPOSE 3000
#port

ENV PORT=3000
# setting up the environment variable
EXPOSE ${PORT}
# ${varaible_name}
# we can change on runtime, which port we want to pass(kis port par forwarding karni hain)

# This is an executable command which runs on the run time (not the compile time)
CMD [ "node", "server.js" ] 
# terminal par bhi tou aese run karte hain right -> 'node server.js' karke
# this command will run the container

# this will execute on the runtime


# CMD ["nodemon", "server.js"]
#to automatically restart the server whenever any file changes are made.


# CMD ["npm", "start"]

