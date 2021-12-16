var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var indexRouter = require('./routes/index');
var configRouter = require('./routes/config');
var sourceRouter = require('./routes/source');
var mapperRouter = require('./routes/mapper');
var searchRouter = require('./routes/search');
var clusterRouter = require('./routes/cluster');
var eventsRouter = require('./routes/events');

var app = express();

app.use(cors())
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
app.use("/cluster", clusterRouter)
app.use("/events", eventsRouter)

app.use((err, req, res, next) => {
    if (err) {
        console.error(err)
    }
    next()
})
module.exports = app;
