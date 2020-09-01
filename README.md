# eMia-Node-js-Server

It is a server-side of the React Native [eMia-React-Native](https://github.com/SKrotkih/eMia-React-Native) application. 

## Introduction

The back end was developed with using:
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com) No SQL Database. Used to store users info and users posts.
- [Cloudinary](https://cloudinary.com). Used to store images.

## Installation

- Download or clone content to a local directory
- Install NodeJS and Yarn or NPM.
- Start Terminal. Go to the directory. Run 'yarn' on 'npm install'.
- Rename .env.example to .env. Fill in .env file your values (see the MongoDB section).

- [MongoDB](https://www.mongodb.com)
    - create Project
    - create Cluster
    - connect to your new Cluster
    - Select Connect your application.
    - Select your driver as Node.js
    - On a step 'Add your connection string into your application code' copy connection string in .env file as mongoUri=...

- [Cloudinary](https://cloudinary.com) 

- Update the apiUrl in your frontend to point to the server.

#### Run this locally

- node app.js
