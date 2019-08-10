const express = require('express');
const itemsRouter = express.Router();
const pg = require('pg');

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

//PUT route

//DELETE route


module.exports = itemsRouter;