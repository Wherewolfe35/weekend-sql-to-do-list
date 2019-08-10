const express = require('express');
const itemsRouter = express.Router();
const pg = require('pg');
const bodyParser = require('body-parser');

itemsRouter.use(bodyParser.urlencoded({ extended: true }));
const Pool = pg.Pool;
const pool = new Pool({
  database: 'weekend-to-do-app',
  host: 'localhost',
  port: 5432,
  max: 15,
  idleTimeoutMillis: 15000
});

//GET route
itemsRouter.get('/', (req, res) => {
  console.log('getting task data');
  let queryLine = `SELECT * FROM "todoitems";`;
  pool.query(queryLine).then((result) => {
    console.log('Data collected');
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
  })
})

//POST route
itemsRouter.post('/', (req, res) => {
  let newToDo = req.body;
  console.log('adding new to do item', newToDo);
  let queryLine = `INSERT INTO "todoitems" ( "item") VALUES($1);`
  pool.query(queryLine, [newToDo.item])
  .then((result) => {
    console.log('item added to database', result);
    res.sendStatus(201);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
})

//PUT route

//DELETE route


module.exports = itemsRouter;