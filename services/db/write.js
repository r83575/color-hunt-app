const { readAll } = require('./read')
require('dotenv').config()
const fs = require('fs')
const path = require('path')

const { DATA_BASE_PATH = 'C:/temp-db' } = process.env

function addItem(model, item) {
    try {
        if (typeof (model) != "string") {
            throw TypeError('the model is not string')
        }
        const data = readAll(model)
        if (!item) {
            throw TypeError('the item must be defined')
        }
        data.push(item)

        if (!fs.existsSync(DATA_BASE_PATH)) {
            fs.mkdirSync(DATA_BASE_PATH, { recursive: true })
        }
        const filePath = path.join(DATA_BASE_PATH, `${model}.json`)
        fs.writeFileSync(filePath, JSON.stringify(data))

    } catch (error) {
        throw error
    }
}
module.exports = {
    addItem
}