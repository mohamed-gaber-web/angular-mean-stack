var express = require('express');

var app = express();

app.use(function(req, res, next) { // middlware => access on request object and response object and next function
    console.log('the first middleware');    
    next();
}); 


app.use(function(req, res, next) {
    res.send('hello the first send from mdiddleware');
}); 


module.exports = app; // export anythings
