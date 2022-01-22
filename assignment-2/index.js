const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');

app.use(express.urlencoded({
    extended: true
}))

app.get('/', function(req, res) {
    res.render('index')
});

app.get('/about', function(req, res) {
    res.render('about')
});

app.get('/form', function(req, res) {
    res.render('form')
});

app.post('/results', function(req, res) {
    res.render('results', {name: req.body.name, email: req.body.email, comment: req.body.comment})
    res.end()
});

app.get('*', function(req, res) {
    res.redirect('/');
});

app.listen(port, function() {
    console.log(`We are up and running on port ${port}!`)
});
