require('dotenv').config()
const fs = require('fs')
const path = require('path')

const { LOGGER_PATH = 'C:temp-db', LOGGER_FILE = 'logger.log' } = process.env

function writeToLog(data) {
    try {
        if (!fs.existsSync(LOGGER_PATH))
            fs.mkdirSync(LOGGER_PATH, { recursive: true })
        const fullPath = path.join(LOGGER_PATH, LOGGER_FILE)
        fs.appendFileSync(fullPath, JSON.stringify(data) + '\n')
        return true
    }
    catch (error) {
        throw error
    }
}

module.exports = { writeToLog }