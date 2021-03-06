const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');

const config = require('./config');

module.exports.configureExpress = () => {
    const app = express();

    // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    // Middlewares
    app.use(session({
        saveUninitialized: true,
        secret: config.sessionSecret
    }));
    app.use(bodyParser());
    app.use(methodOverride());
    app.use(cors({
        origin: 'http://localhost:4200'
    }));
	
    //Routes
    require('../app/routes/login.routes')(app);

    return app;
}
