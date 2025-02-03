function validateModel(model) {
    if (!(model.fields instanceof Array)) {
        return false
    }
    return model.fields.every(field => field.name && typeof field.name === 'string')
}
const modelState = {
    INSERT: 'insert',
    UPDATE: 'update',
    DELETE: 'delete'
}
/*
 the function gets an object to check if it contains all the required fileds for a certain status.
 the function return true, when the object is valid
 the function an array with the missing properties of the object. this case the object is not valid
 */

function requiredFiledValidation(obj, model, status = modelState.INSERT) {
    if (!obj || ['string', 'boolean', 'number'].includes(typeof obj) || [Array, Number, String, RegExp, Function].some(i => obj instanceof i)) {
        throw TypeError('object must be of type object')
    }
    if (!model) {
        throw TypeError('model must be defined')
    }
    if (!model.fields) {
        throw TypeError('model fields must be defined')
    }
    if (!validateModel(model)) {
        throw TypeError('model.fields field has to be an array of objects with name attribute')
    }
    if (typeof status !== 'string') {
        throw TypeError('status must be a string')
    }
    if (!(Object.values(modelState).includes(status))) {
        throw TypeError('status must be one of the existing options')
    }
    // return model.fields.every(field => field.required.status === obj.includes(field.name))
    for (let i = 0; i < model.fields.length; i++) {
        if (model.fields[i].required.status) {
            if (!obj.includes(model.fields[i].name)) {
                return false
            }
        }
    }
    return true
}
/*
the function gets an object to check that all properties types are  as required
the function return true, when the object is valid
the function return an array with the properties names of properties thst are not from thr required type
*/
function requiredTypeValidation(obj, model) {
    if (!obj || ['string', 'boolean', 'number'].includes(typeof obj) || [Array, Number, String, RegExp, Function].some(i => obj instanceof i)) {
        throw TypeError('object must be of type object')
    }
    if (!model) {
        throw TypeError('model must be defined')
    }
    if (!model.fields) {
        throw TypeError('model fields must be defined')
    }
    if (!validateModel(model)) {
        throw TypeError('model.fields field has to be an array of objects with name attribute')
    }
}

module.exports = {
    modelState,
    requiredFiledValidation,
    requiredTypeValidation
}
