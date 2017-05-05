'use strict';

var express     = require('express');
var parser      = require('body-parser');
var router      = require('./api');

var app = express();

// Database
require('./database');
require('./seed');

// Server
app.use('/', express.static('public'));
app.use(parser.json());

app.use('/api', router);

app.listen(3000, function() {
    console.log('Serving app or port 3000!');
});