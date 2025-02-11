require('dotenv').config()
const fs = require('fs')
const path = require('path')

const { DATA_BASE_PATH = 'C:/temp-db' } = process.env

function readAll(model) {
    try {
        const filePath = path.join(DATA_BASE_PATH, `${model}.json`)
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
        return []
    }
    catch (error) {
        throw error
    }
}

function getByCondition(model, condition) {
    try {
        const collection = readAll(model)
        if (condition) {
            const response = collection.filter(item => Object.entries(condition)
                .every(([key, value]) => item[key] && item[key] === value))
            return response
        }
        else {
            return collection
        }
    }
    catch (error) {
        throw error
    }
}

module.exports = {
    readAll,
    getByCondition
}
