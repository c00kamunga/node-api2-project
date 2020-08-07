const express = require('express')
const postsRouter = require('./posts-Router')
const server = express()
const port = 9876

server.use(express.json())

server.use('/', postsRouter)

server.listen(port, () => {
    console.log(`\n *** Server is listening on port {port} *** \n`)
})

server.get('/', (req, res) => {
    res.send("Hello world")
})