const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const PORT = 3001

app.use(cors())

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        // Origin should change the the URL of the deployed client website when possible 
        origin: '*',
        methods: ['GET', 'POST'],
    }
})

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})