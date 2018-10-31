const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex');
const dbConfig = require('../knexfile');

const db = knex(dbConfig.development);

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
}

/* === Register === */

function register(req, res) {
  const creds = req.body;

  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  db('users')
    .insert(creds)
    .then(ids => {
      const id = ids[0];
      res
        .status(201)
        .json({ newUserId: id })
    })
    .catch(err => {
      res
        .status(500)
        .json(err);
    });
};

