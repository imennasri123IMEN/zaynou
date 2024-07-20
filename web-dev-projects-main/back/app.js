// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

mongoose.connect('mongodb+srv://imennasri475:GDLruUpaVnZUfoBQ@cluster0.hbguug7.mongodb.net/data', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require('./routes/users');
const subscriptionRoutes = require('./routes/subscriptions');
const statisticsRoutes = require('./routes/statistics');

app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/statistics', statisticsRoutes);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
