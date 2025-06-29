const http=require('http');
const express=require('express');
let app=express();

const {Server}=require('socket.io');
const server=http.createServer(app);
const io=new Server(server);


// Serve static files from the current directory
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

server.listen(3000,()=>{
    console.log("server is running");
})
//0
io.on('connection',(socket)=>{
     console.log("succesful user connection"+ socket.id);
     //1
     socket.on("message",(data)=>{
     // console.log(data); let us make it to evreryone
     socket.broadcast.emit("message",data)
     });
});
 //
// The lines

// javascript
// Copy code
// const server = http.createServer(app);
// const io = new Server(server);
// are necessary to integrate Socket.io with an HTTP server created by Node.js. Let me break down why this is needed step-by-step:

// 1. http.createServer(app)
// This creates a Node.js HTTP server that can handle both HTTP requests (via Express) and WebSocket connections (via Socket.io).

// app: This is your Express application, which provides routing and middleware.
// http.createServer(app): Wraps your Express app in an HTTP server to allow the use of raw HTTP features (needed for Socket.io).
// This is required because Socket.io works directly with an HTTP server instance.

// 2. new Server(server)
// This creates a Socket.io server instance that listens for WebSocket connections on the same HTTP server.

// server: The HTTP server you just created.
// new Server(server): Socket.io is "attached" to the HTTP server, enabling real-time WebSocket communication while still serving HTTP content (like your index.html file).
// Why Do Both?
// You need both steps because:

// Express only handles HTTP requests: Without http.createServer(app), you won't have access to the lower-level server object required by Socket.io.
// Socket.io needs to "attach" to an HTTP server: This allows it to upgrade HTTP connections to WebSocket connections for real-time communication.
// Can We Skip These Steps?
// If you don’t need HTTP routing (i.e., you're not serving Express routes), you can create a basic HTTP server directly:

// javascript
// Copy code
// const http = require('http');
// const { Server } = require('socket.io');

// const server = http.createServer(); // No Express needed
// const io = new Server(server);

// server.listen(3000, () => {
//     console.log("Server is running");
// });
// However, since you're using Express to serve index.html, you must create the server with http.createServer(app) and attach Socket.io to it.

// What Happens if You Don’t Do This?
// If you skip these steps and try to use Socket.io without attaching it to an HTTP server:

// Socket.io won’t be able to listen for WebSocket connections.
// You'll encounter errors when attempting to establish real-time communication.
// Summary:
// http.createServer(app) creates a bridge between Express and lower-level HTTP functionality.
// new Server(server) attaches Socket.io to this server, enabling WebSocket communication.
// Both steps are necessary to serve your web app and handle real-time features simultaneously.






