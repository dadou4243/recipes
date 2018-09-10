const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require("body-parser");
const http = require('http');
const path = require('path');
const passport = require('passport');

const dbConfig = require('./config/db');

// Import routes
const recipesRoutes = require('./routes/recipes');
const categoriesRoutes = require('./routes/categories');
const ingredientsRoutes = require('./routes/ingredients');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add headers
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Pass to next layer of middleware
    next();
});

// Connect to mongoose
const mongoose = require('mongoose');
mongoose.connect(dbConfig.local, { useNewUrlParser: true });

require('./models/User');
require('./config/passport');

// Initialize passport
app.use(passport.initialize());

// Use routes
app.use('/api/recipes', recipesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/ingredients', ingredientsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', passport.authenticate('jwt', { session: false }), usersRoutes);

// Static Angular Build
app.use(express.static(path.join(__dirname, '../dist')))

// Serve the index.html Angular file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
})

// Handling Errors
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// Set the port number
const port = process.env.PORT || 4600;
app.set('port', port);

// Create the http Server
const server = http.createServer(app);

server.listen(port, (req, res) => {
    console.log(process.env.PORT);

    console.log(`RUNNING on port ${port}`);
});