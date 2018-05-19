
var http = require('http');
var ServerStatic = require('node-static');
var WS = require('ws');

var clientsNow = {};

var WSServer = new WS.Server({
    port: 8081
});

WSServer.on('connection', function(ws){
    let idUser = Math.random();
    clientsNow[idUser] = ws;
    console.log('New user', 'id:', idUser);

    ws.on('message', function(messageText){
        console.log('New message', 'text:', messageText);
       for(let keyClient in clientsNow){
           clientsNow[keyClient].send(messageText);
       }
    });

    ws.on('close', function(){
        delete clientsNow[idUser];
    });
});

var myServer = new ServerStatic.Server('.');
http.createServer(function(req, res){
    myServer.serve(req,  res)
}).listen(8080);

console.log('server running');