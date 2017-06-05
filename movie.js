var socketio = require('socket.io');
var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var PORT = process.env.PORT || 3001;

var seats = [
	[1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1],
	[1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1],
	[1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1],
	[1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,1,1,1,1,1],
	[1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
];


var app = express();
var server = http.createServer(app);


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response){
	response.render('home');
});

app.get('/reservation', function(request, response, next){
	fs.readFile('E.html',function(error, data){
		response.send(data.toString());
	});
});

app.get('/seats', function(request, response, next){
	response.send(seats);
});
server.listen(PORT , function(){
	console.log('Server Running at http://127.0.0.1:3001');
});

var io = socketio.listen(server);
io.sockets.on('connection', function(socket){
	socket.on('reserve', function(data){
		seats[data.y][data.x] = 2;
		io.sockets.emit('reserve', data);
	});
});
