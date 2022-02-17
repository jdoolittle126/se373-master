const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const handlebars = require('handlebars');
const hbs = require('express-handlebars').create({
    helpers: {
        /**
         * HBS helper to render a dropdown with an item selected
         * @param selected The value of the item that should be selected
         * @param options All of the available options
         * @return {*} The corrected HTML dropdown
         */
        select: (selected, options) => {
            return options.fn(this).replace(
                new RegExp(' value=\"' + selected + '\"'),
                '$& selected="selected"');
        },
        /**
         * Simple block helper for checking if a value
         * is equal to another value. If true, the block is
         * rendered
         * @param value1
         * @param value2
         * @param options
         * @returns {*}
         */
        ifEq: (value1, value2, options) => {
            return (value1 == value2) ? options.fn(this) : options.inverse(this);
        },
        /**
         * Generates a grid filled with random colors with
         * the given length and width.
         * @param length
         * @param width
         * @returns {string} An HTML table
         */
        buildGrid: (length, width) => {

            if (length <= 0 || width <= 0) {
                return '<p>Invalid Grid!</p>';
            }

            const colorPad = (value) => {
                return (new Array(2).join('0') + value).slice(-2);
            }

            const tableStart = "<table class='uk-table uk-table-small uk-table-responsive'><tbody>";
            const tableClose = "</tbody></table>";
            let body = '';

            for (let x = 0; x < width; x++) {
                body += '<tr>';
                for (let y = 0; y < length; y++) {

                    // The background color of the tile
                    let bgColor = ((1<<24) * Math.random() | 0).toString(16);
                    // The foreground color of the tile
                    let fgColor = colorPad((255 - parseInt(bgColor.slice(0, 2), 16)).toString(16)) +
                        colorPad((255 - parseInt(bgColor.slice(2, 4), 16)).toString(16)) +
                        colorPad((255 - parseInt(bgColor.slice(4, 6), 16)).toString(16));

                    body += `<td style="background-color: #${bgColor}; color: #${fgColor}">#${bgColor}</td>`
                }
                body += '</tr>';
            }

            return tableStart + body + tableClose;
        },
        error404: () => {
            const classes = ['shrink', 'rotate', 'still']
            let message = "";
            for (let i = 0; i < 20 + Math.random() * 30; i++) {
                message += `<div class="${classes[Math.floor(Math.random() * classes.length)]}">404</div>`
            }
            return new handlebars.SafeString(message);
        }
    }
});

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', (hbs.engine));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);

// Start our server
app.listen(port, () => {
    console.log(`We are up and running on port ${port}!`);
});

