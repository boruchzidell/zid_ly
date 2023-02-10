const {Pool} = require('pg');

// when empty, pool uses environment variables for connection information
const pool = new Pool();
// pool.query('select * from urls', (err, results) => {
//   console.log(results);
// });

module.exports = {
  pool,
};
