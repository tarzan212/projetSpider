/**
 * Created by pribeiro on 04/03/17.
 */


/*
ancienne version !

var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
  fs.readFile('../../index.html', 'utf-8', function(error, content) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(content);
  });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
  console.log('Un client est connecté !');
});


server.listen(8080);*/



var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var SerialPort = require("serialport");
var port = new SerialPort("/dev/ttyACM0", {
  //115200?
  baudRate: 57600
});

app.use(express.static(__dirname+"/../.."));
app.use(express.static(__dirname+"/../../../bower_components/"));

io.on('connection', function(socket) {
  console.log('new connection');

  /*socket.on('add-customer', function(customer) {
    io.emit('notification', {
      message: 'new customer',
      customer: customer
    });
  });*/
  socket.on('message', function (message) {
    console.log('Position : ' + message); //envoi port ... à la place
    port.write(message);
  });
});




server.listen(8080, function() {
  console.log('server up and running at 8080 port');
});
