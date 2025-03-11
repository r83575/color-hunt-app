const express = require('express')
const paletteRouter = require('./routers/palette')
const { startLogger, endLogger } = require('./utils/middlewares/logger')

const app = express()
app.use(startLogger)
app.get('/', (req, res, next) => {
    res.locals['response-content'] = 'message from the color-hunt server'
    res.status(200).send('message from the color-hunt server')
    next()
})

app.use('/palette', paletteRouter)

app.use('/*', (req, res, next) => {
    if (!res.headersSent) {
        res.locals['response-content'] = `${req.baseUrl} not found`
        res.status(404).send(`${req.baseUrl} not found`)
    }
    next()
})

app.use(endLogger)

module.exports = { app }