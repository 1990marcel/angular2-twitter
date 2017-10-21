var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var functions = require('./process');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.post('/authorize', functions.authorize);
app.post('/search', functions.search);

app.listen(3000);
console.log('app is listening');