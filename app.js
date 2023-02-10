let express = require('express');
let app = express();
require('dotenv').config();
let {pool} = require('./database_config.js');

pool.query('select * from urls', (err, results) => {
  console.log(results.rows);
});

function generateHex() {
  const hexSixDigits = 16777215;
  return Math.floor(Math.random() * hexSixDigits).toString(16);
}

app.get('/test/:hex', (req, res, next) => {
  let hex = req.params.hex;

  res.redirect(url);
});

app.get('/', (req, res, next) => {
  res.send('Zid.ly homepage');
});

let port = process.env.PORT || 5000;

app.listen(port, () => console.log('App listening on port', port));
