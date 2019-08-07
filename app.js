const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
if (process.env.ENV === 'Test') {
  mongoose.connect(process.env.MONGODB_URI_TEST, { useNewUrlParser: true });
} else {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
}

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`); // eslint-disable-line no-console
});

module.exports = app;
