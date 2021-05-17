require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const socket = require('socket.io'); // for socket/chatting connection

// Connecting to database
mongoose.connect(process.env.MONGODB_URI, 
    { useNewUrlParser: true, useUnifiedTopology: true });
const db_client = mongoose.connection;
db_client.on('error', (err) => console.error(`Error: ${err.message}...`));
db_client.once('open', () => console.log('Connected to MongoDB.'));

// Express setup
const app = express();
const PORT = process.env.PORT || 5000;

// // Middlewares
app.use(express.json());
app.use(express.static('public/client'));
app.use(cors());
const userRoutes = require('./routes/userRoutes');

//
app.use('/api/user', userRoutes);
 

// Starting an express server
const server = app.listen(PORT, () => console.log(`Server live on port ${PORT}...`));

// ********************* SOCKET PROGRAMMING HERE ***********
// Starting a socket server
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Listening to Socket connections
io.on('connection', (client) => {
    // console.log(`Client ${client.id} connected`);

    client.on('join', (data)=>{
        // console.log(`${data} has joined the chatroom`);
        client.broadcast.emit('joining', data);
    });

    client.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    client.on('typing', data => client.broadcast.emit('typing', data));

});