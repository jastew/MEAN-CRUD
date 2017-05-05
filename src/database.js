var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', function(err) {
    if (err) {
        console.log('Failed to connect to database');
    } else {
        console.log('Connected!');
    }
});