require('dotenv').config({
    path: "config.env"
});

// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');


// Get our API routes
const api = require('./server/routes/');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);


// Catch all other routes and return the index file
app.get('*', (req, res) => {
    var extension = path.extname(req.url);
    var name = req.url.split('/').pop();
    switch (extension) {
        case '.css':
            res.setHeader("Content-Type", 'text/css');
            res.sendFile(path.join(__dirname, 'dist' + req.url));
            res.end();
            break;
        case '.png':
            res.setHeader("Content-Type", 'image/png');
            res.sendFile(path.join(__dirname, 'dist' + req.url));
            res.end();
            break;
        case '.jpg':
            res.setHeader("Content-Type", 'image/jpeg');
            res.sendFile(path.join(__dirname, 'dist' + req.url));
            res.end();
            break;
        default:
            res.setHeader("Content-Type", 'text/html');
            res.sendFile(path.join(__dirname, 'dist/index.html'));
            res.end();
            break;
    }
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
