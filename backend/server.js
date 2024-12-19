const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const authenticateToken = require('./middleware/authenticateToken'); 

const authRoutes = require('./routes/authRoutes');
const boxRoutes = require('./routes/boxRoutes');
const accountRoutes = require('./routes/accountRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); 

app.use('/auth', authRoutes);
app.use('/boxes', boxRoutes); 
app.use('/accounts', accountRoutes); 
app.use('/reviews', reviewRoutes); 
app.use('/orders', authenticateToken, orderRoutes); 

app.listen(8081, () => {
  console.log('Server is listening on port 8081');
});