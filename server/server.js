const express = require('express');
const path = require('path');

const app = express();


//const api = require('./server/routes/recipes');


app.use(express.static(path.join(__dirname, '../dist')))

//app.use('/api', api);

app.get('*', (req, res) => {

    res.sendFile(path.join(__dirname, '../dist/index.html'));

})

const port = process.env.PORT || 4600;

app.listen(port, (req, res) => {
    console.log(`RUNNING on port ${port}`);
});