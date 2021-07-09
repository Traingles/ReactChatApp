const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on('connection', socket => {
    // log connection
    console.log("A new client has connected")

    // message
    socket.on('message', ({
        name,
        message
    }) => {
        io.emit('message', {
            name,
            message
        })
    })

    // disconnect
    socket.on('disconnect', socket => {
        // log disconnect
        console.log("A client has disconnected")
    })
})

http.listen(4000, () => {
    console.log('listening on PORT 4000')
})