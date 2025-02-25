require('dotenv').config()

const http = require('http')
const {app} = require('./app')
const {HOST,PORT}=process.env
app.listen(PORT,HOST,()=>{
    console.log(`server is running on http://${HOST}:${PORT}`);
    
})

const server = http.createServer(app)