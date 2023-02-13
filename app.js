let express = require('express');
let app = express();
require('dotenv').config();
let {pool} = require('./database_config.js');

function generateHex() {
  const max = 16777215; // Hex 6 digits
  return Math.floor(Math.random() * max).toString(16);
}

app.get('/test/:hex', (req, res, next) => {
  let hex = req.params.hex;

  pool.query('select original_url from urls where hex = $1', [hex], (err, results) => {
    res.redirect(results.rows[0].original_url);
  });
});

app.get('/', (req, res, next) => {
  res.send('Zid.ly homepage');
});

let port = process.env.PORT || 5000;

app.listen(port, () => console.log('App listening on port', port));
