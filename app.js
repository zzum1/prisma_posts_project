const express = require('express');
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute')

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/post', postRoute)

module.exports = app;