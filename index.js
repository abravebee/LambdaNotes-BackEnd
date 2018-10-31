//const server = require('./server.js');

const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const cors = require('cors');
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);
const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

const configureRoutes = require('./config/authRoutes');
configureRoutes(server);

const { authenticate } = require('./config/middlewares');

/* == Server Check == */

server.get('/', (req, res) => {
  res.json({message: 'Server check' });
});

/* == Notes == */

server.get('/api/notes', authenticate, (req, res) => {
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

server.get('/api/notes/:id', (req, res) => {
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

server.post('/api/notes', (req, res) => {
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

server.put('/api/notes/:id', (req, res) => {
  const note = req.body;
  const { id } = req.params;

  db('notes')
    .where('id', id)
    .update(note)
    .then(updated => {
      console.log(`\n== NOTE UPDATED ==\n`, note)
      res
        .status(200)
        .json(updated);
    })
    .catch(err => {
      console.log(`\n== CANNOT UPDATE NOTE ==\n`, err)
      res
        .status(500)
        .json({ error: "Error while updating note." });
    })
})

server.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  db('notes')
    .where('id', id)
    .del()
    .then(deleted => {
      console.log(`\n== NOTE DELETED ==\n`, deleted)
      res
        .status(200)
        .json(deleted);
    })
    .catch(err => {
      console.log(`\n== CANNOT DELETE NOTE ==\n`, err)
      res
        .status(500)
        .json({ error: "Error while deleting note." })
    })
})



const PORT = process.env.PORT || 4242;
server.listen(PORT, () => console.log(`\n== SERVER RUNNING ON PORT ${PORT} ==\n`));
