const express = require('express');
const cors = require('cors');
const DisplayData = require('./Routes/DisplayData');
const OrderData = require('./Routes/OrderData');
const userRoutes = require('./Routes/CreateUser');
const MyorderData = require('./Routes/MyorderData');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
const mongoDB = require('./db');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', userRoutes);
app.use('/api/', DisplayData);
app.use('/api/', OrderData);
app.use('/api/', MyorderData);

//
// db





mongoDB(); // Connect to MongoDB

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
