const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/bookAPI', { useNewUrlParser: true });

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`); // eslint-disable-line no-console
});
