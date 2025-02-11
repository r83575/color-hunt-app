require('dotenv').config()
const fs = require('fs')
const path = require('path')

const { DATA_BASE_PATH } = process.env

function readAll(model) {
    try {
        if (fs.existsSync(DATA_BASE_PATH)) {
            const filePath = path.join(DATA_BASE_PATH, `${model}.js`)
            if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath)
                const result = JSON.parse(data)
                if (Array.isArray(result)) {
                    return result
                }
                else {
                    throw Error('db corrupt')
                }
            }
        }
        else {
            return []
        }
    }
    catch (error) {
        throw error
    }
}

function getByCondition(model, condition) {

}

module.exports = {
    readAll,
    getByCondition
}
