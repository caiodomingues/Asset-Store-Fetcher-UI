const express = require('express');
const consign = require('consign');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

consign({
    cwd: 'app'
})
    .include('routes')
    .then('controllers')
    .then('models')
    .into(app);

module.exports = app;