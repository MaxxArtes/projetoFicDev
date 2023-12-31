require('../src/database');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { routes } = require('./routes');
const server = express();

server.use(express.json());


server.use(cors());

server.use(routes);

server.listen(8080, () => {
    console.log('🚀 Servidor iniciado!');
});


