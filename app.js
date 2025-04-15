const express = require('express');
const authRoute = require('./routes/authRoute');

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRoute);

module.exports = app;