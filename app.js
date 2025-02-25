const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.status(200).send('message from the color-hunt server')
})

app.use('/*', (req, res) => {
    res.status(404).send(`${req.baseUrl} not found`)
})

module.exports = { app }