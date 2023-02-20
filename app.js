let express = require('express');
let app = express();

let morgan = require('morgan');
app.use(morgan('tiny'));

app.use(express.static('public'));

require('dotenv').config();
let {pool} = require('./database_config.js');

app.use(express.json());

function generateHex() {
  const max = 16777215; // Hex 6 digits
  return Math.floor(Math.random() * max).toString(16);
}

// function isValidUrl(string) {
//   //TODO fix this
//   try {
//     new URL(string)
//       return true;
//     } catch (err) {
//       return false;
//     }
// }


app.get('/:hex', (req, res, next) => {
  let hex = req.params.hex;

  pool.query('select original_url from urls where hex = $1', [hex], (err, results) => {
    if (err) {
      console.log('Hex not found');
      res.status(404).send('Hex not found');
    } else {
      res.redirect(results.rows[0].original_url);
    }
  });
});

// app.get('/', (req, res, next) => {
//   res.send('Zid.ly homepage');
// });

app.post('/', (req, res, next) => {
  let url = req.body.url;
  console.log(url);

  pool.query('insert into urls (hex, original_url) values ($1, $2) returning hex;', [generateHex(), url], (err, results) => {
    if (err) {
      // throw new Error('Nope!');
      console.error('Nope!');
    } else {
      // res.send(results[0].hex)
      console.log(results.rows[0].hex);
      res.send(results.rows[0].hex);
    }
  });

});

let port = process.env.PORT || 5000;

app.listen(port, () => console.log('App listening on port', port));
