let express = require('express');
let app = express();
let path = require('path');
require('dotenv').config();

let logger = require('morgan');
let {isValidUrl} = require('./validate_urls.js');
let {pool} = require('./database_config.js');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/:hex', (req, res, next) => {
  let hex = req.params.hex;

  pool.query('select original_url from urls where hex = $1', [hex], (err, results) => {
    if (err) {
      next(err);
    } else if (!results.rows.length) {
      res.redirect(302, '/404.html');
    } else {
      res.redirect(302, results.rows[0].original_url);
    }
  });
});

app.post('/', validateUrlHandler, (req, res, next) => {
  let url = req.body.url;
  console.log(url);

  pool.query(
    'insert into urls (hex, original_url) values ($1, $2) returning hex;',
    [generateHex(), url],
    (err, results) => {
      if (err) {
        // throw new Error('Nope!');
        console.error('Nope!');
      } else {
        // res.send(results[0].hex)
        console.log(results.rows[0].hex);
        res.send(results.rows[0].hex);
      }
    }
  );
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 404);
  res.send(err.message || 'Bad request!');
});

function generateHex() {
  const max = 16777215; // Hex 6 digits
  return Math.floor(Math.random() * max).toString(16);
}

function validateUrlHandler(req, res, next) {
  if (!isValidUrl(req.body.url)) {
    let err = new Error('Invalid URL received!');
    err.status = 422; // 422 Unprocessable Entity
    err.message = 'Invalid URL!';
    next(err);
  }

  next();
}

let port = process.env.PORT || 5000;

app.listen(port, () => console.log('App listening on port', port));
