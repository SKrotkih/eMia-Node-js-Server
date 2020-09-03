# eMia-Node-js-Server

It is a server-side of the React Native [eMia-React-Native](https://github.com/SKrotkih/eMia-React-Native) application. 

## Introduction

The back end was developed with using:
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com) No SQL Database. Used to store users info and users posts.
- [Cloudinary](https://cloudinary.com). Used to store images.

## Installation

- Upload or clone content to a remote directory on a hosting server (or on your local system)
- Install Node.js and NPM
- Go to the project root directory
- Run 'npm install'
- Copy .env.example to .env. Fill in the .env file your values (see the following sections)
- Create tmp file (md tmp)

- File .env example:

    port=5000 <br>
    host=localhost <br>
    baseUrl=http://localhost:5000 <br>
    jwtSecret=<some secret sentence> <br>
    mongoUri=mongodb+srv://... <br>
    cloud_name=... <br>
    api_key=... <br>
    api_secret=... <br>


- [MongoDB](https://www.mongodb.com)
    - configure MongoDB:
    - create Project
    - create Cluster
    - connect to your new Cluster
    - Select Connect your application.
    - Select your driver as Node.js
    - On a step 'Add your connection string into your application code' copy connection string in the .env file as mongoUri=...

- [Cloudinary](https://cloudinary.com) 
    - configure Cloudinary
    - put cloud_name, api_key and api_secret in the .env file (see example). 
    
- Update the apiUrl in your frontend to point to the server.

#### Run server

- node app.js
