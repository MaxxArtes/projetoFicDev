require('../src/database');
require('dotenv').config();
const cors = require('cors');

const express = require('express');
const { routes } = require('./routes');

const server = express();

server.use(express.json());

// Usa o cors com a variável do .env
server.use(cors({ origin: process.env.ORIGIN })); // Usa a variável ORIGIN do arquivo .env

server.use(routes);

server.listen(process.env.PORT, () => {
    console.log('🚀 Server started!');
});
