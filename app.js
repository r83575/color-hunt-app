const express = require('express')
const paletteRouter = require('./routers/palette')

const app = express()

app.get('/', (req, res) => {
    res.status(200).send('message from the color-hunt server')
})

app.use('/palette',paletteRouter)

app.get('/colors/:color',(req,res)=>{
    res.status(200).send(`the selected color is ${req.params.color}`)
})

app.use('/*', (req, res) => {
    res.status(404).send(`${req.baseUrl} not found`)
})

module.exports = { app }