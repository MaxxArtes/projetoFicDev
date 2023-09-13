require('../src/database');
require('dotenv').config();
const cors = require('cors');

const express = require('express');
const { routes } = require('./routes');

const server = express();

server.use(express.json());

// Usa o cors com a variável do .env
server.use(cors({ origin: 'locahost:3000' })); // Usa a variável ORIGIN do arquivo .env

server.use(routes);

server.listen(8080, () => {
    console.log('🚀 Server started!');
});
