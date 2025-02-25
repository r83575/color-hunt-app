const { convertRGBtoHEX } = require('../services/convert')
const { getByCondition } = require('../services/db/read')
const { addItem } = require('../services/db/write')
const { isHEXColor, isRGBColor } = require('../services/validation/color')
const { modelState, requiredFiledValidation, requiredTypeValidation } = require('../services/validation/object')

const model = {
    name: 'palette',
    fields: [
        {
            name: 'id',
            required: {
                [modelState.INSERT]: false,
                [modelState.UPDATE]: true,
                [modelState.DELETE]: true
            },
            type: 'string'
        }, {
            name: 'userName',
            required: {
                [modelState.INSERT]: true,
                [modelState.UPDATE]: false,
                [modelState.DELETE]: false
            },
            type: 'string'
        }, {
            name: 'colors',
            required: {
                [modelState.INSERT]: true,
                [modelState.UPDATE]: false,
                [modelState.DELETE]: false
            },
            type: (val) => val instanceof Array
        }
    ]
}

function createPalette(palette) {
    const requiredFields = requiredFiledValidation(palette, model)
    if (requiredFields instanceof Array) {
        throw TypeError(`the following properties are missing: ${requiredFields.join(', ')}`)
    }
    const typeValidations = requiredTypeValidation(palette, model)
    if (typeValidations instanceof Array) {
        throw TypeError(`there following are not in the correct type: ${typeValidations.join(',')}`)
    }
    const { colors } = palette
    if (colors.length !== 4) {
        throw Error(`the palette needs 4 colors, but got ${colors.length}`)
    }
    const validColorType = colors.every(cl => typeof cl === 'string' || (cl instanceof Array && cl.every(val => isNaN(val) === false)))
    if (!validColorType) {
        throw TypeError('not all colors are from the correct type (string or array with numbers)')
    }
    const validColors = colors.every(cl => typeof cl === 'string' ? isHEXColor(cl) : isRGBColor(cl))
    if (!validColors) {
        throw Error('the colors are not from real colors')
    }
    const id = colors.reduce((id, cl) => id += typeof cl === 'string' ? cl : id + convertRGBtoHEX(cl), '')
    const exist = getByCondition(model.name, { id })[0]               
    if (!exist) {
        palette.id = id
        addItem(model.name, palette)
        return palette
    }
}


module.exports = { createPalette }

console.log(
    createPalette({ userName: 'abc', colors: [['25', '168', '203'], ['25', '168', '100'], '#a68B12', '#a68B13'] }, model))