const express = require('express');
const app = express();

const http = require('http');

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

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/recipes', { useNewUrlParser: true });

// require('./models/Recipe');
// require('./models/Category');

const path = require('path');

const recipesRoutes = require('./routes/recipes');
const categoriesRoutes = require('./routes/categories');

app.use('/api/recipes', recipesRoutes);
app.use('/api/categories', categoriesRoutes);


app.use(express.static(path.join(__dirname, '../dist')))

//app.use('/api', api);

app.get('*', (req, res) => {

    res.sendFile(path.join(__dirname, '../dist/index.html'));

})

const port = process.env.PORT || 4600;

app.set('port', port);

const server = http.createServer(app);

server.listen(port, (req, res) => {
    console.log(`RUNNING on port ${port}`);
});