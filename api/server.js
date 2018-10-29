const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);
const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.json({message: 'Server check' });
});

server.get('/notes', (req, res) => {
 //
})

server.get('/notes/:id', (req, res) => {
  //
})

server.post('/notes', (req, res) => {
  //
})

server.put('/notes/id', (req, res) => {
  //
})

server.delete('/notes/:id', (req, res) => {
  //
})

module.exports = server;