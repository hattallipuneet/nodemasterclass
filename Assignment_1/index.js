/*
 Homework Assignment #1
 Description : A simple RESTful API to return Hello World! message
*/

// Dependencies
var http = require('http');
var url  = require('url');

// Instantiate a HTTP server
var httpServer = http.createServer(function(request, response){
    serverRequestHandler(request, response);
});

// Start the HTTP server
httpServer.listen(9999, function(){
    console.log('Server is listening on port : ', 9999);
});


// A function to handle requests

var serverRequestHandler = function(request, response) {

    var parsedUrl = url.parse(request.url, true);
    var pathName = parsedUrl.pathname;
    var trimmedPath = pathName.replace(/^\/+|\/+$/g,'');

    var requestHandler = typeof(routers[trimmedPath]) !== 'undefined' ?
                        routers[trimmedPath] : routers['NOT_FOUND'];

    var greetings = {
        'message' : 'Hello World!'
    };                            
                        
    requestHandler(greetings, function(statusCode, data) {
        response.setHeader('Content-Type', 'application/json');
        response.writeHead(statusCode);
        response.end(JSON.stringify(data)); 
    });
};

var handlers = {};

handlers.notFound = function(data, callback) {
    callback(404);
};

handlers.greetingsHandler = function(data, callback) {
    callback(200, data);
};

var routers = {
    'NOT_FOUND' : handlers.notFound,
    'hello' : handlers.greetingsHandler
};
