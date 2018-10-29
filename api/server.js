const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);
const server = express();

server.use(helmet());
server.use(express.json());

/* == Server Check == */

server.get('/', (req, res) => {
  res.json({message: 'Server check' });
});

/* == Notes == */

server.get('/notes', (req, res) => {
 db('notes')
  .then(notes => {
    console.log(`\n== NOTES FOUND ==\n`, notes)
    res
      .status(200)
      .json(notes);
  })
  .catch(err => {
    console.log(`\n== CANNOT GET NOTES ==\n`, err)
    res
      .status(500)
      .json({ error: "Error while retrieving notes." })
  })
})

server.get('/notes/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where('id', id)
    .then(note => {
      if (!note.length) {
        console.log(`\n== NOTE ID NOT FOUND ==\n`)
        res
          .status(401)
          .json({ error: "There is no note with the specified ID." });
      } else {
      console.log(`\n== NOTE FOUND ==\n`, note)
      res
        .status(200)
        .json(note)
      }
    })
    .catch(err => {
      console.log(`\n== CANNOT GET NOTE ==\n`, err)
      res
        .status(500)
        .json({ error: "Error while retrieving note." })
    })
})

server.post('/notes', (req, res) => {
  const note = req.body;
  const { title, content } = req.body;
  if (!title || !content ) {
    console.log(`\n== NOTES NEED TITLE AND CONTENT ==\n`)
   return res
      .status(400)
      .json({ error: "Please add a title and content for this project." })
  } 

  db.insert(note)
    .into('notes')
    .then(ids => {
      console.log(`\n== NOTE ADDED ==\n`, note)
      res
        .status(201)
        .json(ids);
    })
  
   .catch(err => {
      console.log(`\n== CANNOT ADD NOTE ==\n`, err)
      res
        .status(500)
        .json({ error: "Error while saving the note." })
    });
});

server.put('/notes/:id', (req, res) => {
  const note = req.body;
  const { id } = req.params;

  db('notes')
    .where('id', id)
    .update(note)
    .then(update => {
      console.log(`\n== NOTE UPDATED ==\n`, note)
      res
        .status(200)
        .json(update);
    })
    .catch(err => {
      console.log(`\n== CANNOT UPDATE NOTE ==\n`, err)
      res
        .status(500)
        .json({ error: "Error while updating note." });
    })
})

server.delete('/notes/:id', (req, res) => {
  //
})

module.exports = server;