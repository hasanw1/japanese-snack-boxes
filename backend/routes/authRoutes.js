const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');

// multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


// Login route
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const userQuery = 'SELECT * FROM accounts WHERE LOWER(email) = LOWER(?)';
      const [user] = await db.query(userQuery, [email]);

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials: User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials: Incorrect password' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        'randomSecret',
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error('Server error:', err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

// Profile route
router.get('/profile', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'randomSecret');
    const [user] = await db.query('SELECT id, firstName, lastName, email FROM accounts WHERE id = ?', [decoded.user.id]);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update profile route
router.put('/profile', upload.single('profilePicture'), async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'randomSecret');
    const { firstName, lastName, email } = req.body;
    let profilePicture;

    if (req.file) {
      profilePicture = `/uploads/${req.file.filename}`;
    }

    const updateQuery = `
      UPDATE accounts 
      SET firstName = ?, lastName = ?, email = ?, profilePicture = ?
      WHERE id = ?
    `;
    await db.query(updateQuery, [firstName, lastName, email, profilePicture, decoded.user.id]);

    res.json({ msg: 'Profile updated successfully' });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;