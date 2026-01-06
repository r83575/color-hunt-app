const { writeToLog } = require("../../services/logger")

const startLogger = (req, _, next) => {
    const logger = {
        status: 'start',
        date: new Date().toISOString(),
        method: req.method,
        url: req.url
    }
    writeToLog(logger)
    next()
}

const endLogger = (req, res) => {
    const logger = {
        status: 'end',
        date: new Date().toISOString(),
        method: req.method,
        url: req.url,
        statuscode:res.statusCode,
        content:res.locals['response-content']
    }

    writeToLog(logger)
}

module.exports = { startLogger, endLogger }