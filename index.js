const server = require('express')();
const http = require('http').Server(server);
const io = require('socket.io')(http);
const port = 3000;
var localIp = "127.0.0.1";
//var appIp = "192.168.0.31"
var appIp = "172.20.10.4"
var localSocket = null;
var appSocket = null; 

server.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    // Check ip address
    var socketIp = socket.request.connection.remoteAddress.split('ffff:')[1];

    if (socketIp == appIp) {
        localSocket = socket;
        console.log('The mobile app has connected! ' + socketIp);
    } else if (socketIp == localIp) {
        outputSocket = socket;
        console.log('The python client has connected!' + socketIp);
    } else {
        console.log('Someone has connected... ' + socketIp);
    }
    
    socket.on('movement', (input) => {
        // Check if correct socket, then send to output socket
        if (socketIp == appIp && localSocket != null) {
            // console.log(input['direction']);
            outputSocket.emit('movement', input['motors']);
        }
    });
	
	socket.on('text',(text)=>{
	console.log("you recieved:", text);
	})
	
    socket.on('disconnect', function(){
		console.log("user disconnected!");
	})
});




http.listen(port, () => { console.log("Server running on port " + port); });
