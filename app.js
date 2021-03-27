const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const PORT = process.env.PORT || '5000';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// import routes
const postsRoute = require('./routes/posts');
const projectsRoute = require('./routes/projects');

app.use('/posts', postsRoute);
app.use('/projects', projectsRoute);

app.use('/login', (req, res) => {
    if(req.body.username === process.env.ADMIN_USER && req.body.password === process.env.ADMIN_PW) {
        res.send({
	    token: process.env.TOKEN
        });
    }
});

// ROUTES
app.get("/", (req, res) => {
    res.send("We're home!");
});

console.log("DB URI:", process.env.DB_CONNECTION);

console.log("Server started...");

// CONNECT TO DB (does this work with mdb atlas??)
const db = mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) throw err;
});

// LISTEN
app.listen(PORT);
console.log("Listening...");
