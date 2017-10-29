const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const functions = require('./process');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.post('/authorize', functions.authorize);
app.post('/search', functions.search);

app.listen(3000);
console.log('app is listening');