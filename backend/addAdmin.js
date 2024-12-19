const bcrypt = require('bcryptjs');
const db = require('./db');

const email = 'admin@gmail.com';
const password = 'admin';

const hashedPassword = bcrypt.hashSync(password, 10);

const insertAdminQuery = 'INSERT INTO Admins (email, password) VALUES (?, ?)';
db.query(insertAdminQuery, [email, hashedPassword], (err, results) => {
  if (err) {
    console.error('Error inserting admin:', err);
  } else {
    console.log('Admin inserted successfully');
    db.end();
  }
});