const mysql = require('mysql');
const util = require('util');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'japanese_food_ecommerce'
});

db.query = util.promisify(db.query);

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

module.exports = db;
