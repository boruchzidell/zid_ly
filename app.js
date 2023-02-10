let express = require('express');
let app = express();
require('dotenv').config();

app.get('/', (req, res, next) => {
  res.send('Zid.ly homepage');
});

let port = process.env.PORT || 5000;

app.listen(port, () => console.log('App listening on port', port));
