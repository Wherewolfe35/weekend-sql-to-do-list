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




module.exports = itemsRouter;