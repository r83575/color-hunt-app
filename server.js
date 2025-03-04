require('dotenv').config()

const http = require('http')
const {app} = require('./app')
const {HOST,PORT}=process.env

const server = http.createServer(app)

server.listen(PORT,HOST,()=>{
    console.log(`server is running on http://${HOST}:${PORT}`);
})

