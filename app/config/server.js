const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

consign({
    cwd: 'app'
})
    .include('routes')
    .then('controllers')
    .then('models')
    .into(app);

module.exports = app;