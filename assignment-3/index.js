const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});
const hbs = require('express-handlebars').create({
    helpers: {
        select: (selected, options) => {
            return options.fn(this).replace(
                new RegExp(' value=\"' + selected + '\"'),
                '$& selected="selected"');
        },
        daysSince: (date) => {
            return Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24));
        },
        formatMoney: (value) => {
            return formatter.format(value);
        }
    }
});
const dbo = require('./db/connection');
const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', (hbs.engine));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);


dbo.connect((error) => {

    if(error) {
        console.log(`Error connecting to database: ${error}`);
        return;
    }

    app.listen(port, function() {
        console.log(`We are up and running on port ${port}!`)
    });
});


