var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var configRouter = require('./routes/config');
var sourceRouter = require('./routes/source');
var mapperRouter = require('./routes/mapper');
var searchRouter = require('./routes/search');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/config', configRouter);
app.use("/source", sourceRouter)
app.use("/mapper", mapperRouter)
app.use("/search", searchRouter)

app.use((err, req,res, next) => {
    if(err) {
        
    }
    next()
})
module.exports = app;
