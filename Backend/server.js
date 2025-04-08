const env = require('dotenv').config();        // .env to save links
const express = require('express');            // express js
const mongoose = require('mongoose');          // mongodb database integration
const cors =  require('cors');                 // handle requests from the frontend 
const bodyParser = require('body-parser');     // parse request body
const app = express;                           // express application
// API integration

app.use(express.json());
app.use(cors());

// connect mongoose

// create all the routes and mongoDB connections

//start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));