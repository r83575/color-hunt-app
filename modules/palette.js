const { modelState, requiredFiledValidation } = require('../services/validation/object')

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
}

module.exports = { createPalette }