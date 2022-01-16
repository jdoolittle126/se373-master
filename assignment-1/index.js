//// Jonathan Doolittle
//// 1/16/22
//// Adv. Open Source SE373

// Imports
const http = require('http');
const fs = require('fs').promises;
const fetch = require('node-fetch');

// Listener for requests to our server
const listener = (request, response) => {

    /**
     * Converts a location to a fully-qualified URI
     * @param location The page name (i.e. 'todo'
     * @return {`http://${string}/${string}`}
     */
    const asUri = (location) => {
        return `http://${request.headers.host}/${location}`;
    };

    /**
     * Writes the given string as HTML to the page using the template
     * provided in index.html
     * @param content The HTML string to render
     */
    const displayHtml = (content) => {
        response.writeHead(400, {'Content-type': 'text/html'});
        fs.readFile('index.html').then(data => {
            response.end(data.toString().replace('<CONTENT>', content));
        });
    };

    // Handle our different routes
    switch (request.url) {
        case '/todo': {
            // Serve our todolist json file
            response.writeHead(200, ({'Content-type': 'text/json'}));
            fs.readFile('todo.json')
                .then(data => {
                response.end(data);
            });
            break;
        }
        case '/read-todo': {
            //Makes an AJAX request to the json file and displays the items on the page
            let content = `                    
                    <div>
                        <div class="mt-3 container has-text-centered">
                            <p class="title">My todo list!</p>
                        </div>
                    </div>
                    <div class="content article-body">`;

            fetch( asUri('todo'))
                .then(data => {
                    // Receives the JSON data, then formats it as a list
                    data.json().then(json => {
                        content += '<ul class="list is-size-5">';
                        json.forEach(item => {
                            content += `<li class="list-item ${(item.completed) ? 'completed' : ''}">(${item.id}) - ${item.title}</li>`;
                        })
                        content += '</ul></div>';
                        displayHtml(content);
                    });
                });
            break;
        }
        default: {
            // Displays our home page
            displayHtml(`
                    <div>
                        <div class="mt-3 container has-text-centered">
                            <p class="title">Things I like!</p>
                        </div>
                    </div>
                    <div class="content">
                        <ol class="list is-size-5">
                            <li class="list-item">Programming and Design</li>
                            <li class="list-item">Philosophy</li>
                            <li class="list-item">Pasta :)</li>
                        </ol>
                        
                        <div class="mt-3 container has-text-centered">
                            <p class="subtitle">Links to other pages</p>
                        </div>
                        
                        <h3 class="has-text-centered"></h3>
                        <div class="columns">
                         <div class="column has-text-centered">
                            <a class="button is-link" href="${asUri('todo')}">Raw JSON Todo Data</a>
                         </div>
                         <div class="column has-text-centered">
                            <a class="button is-link" href="${asUri('read-todo')}">Async Data from Todo</a>
                         </div>
                        </div>
                    </div>
            `);
            break;
        }
    }
}

const server = http.createServer(listener);
server.listen(3000);
