/**
* the function gets data - array, a value to search and optional a prop
* return true when data contains the spesific value in the prop
* or false when the data does not contain
* the data can be primitive values
*/
function dataContainsValue(data, value, prop) {
    if (!(data instanceof Array)) {
        throw TypeError('data must be an array')
    }
    if (value === undefined) {
        return false
    }
    if (data.some(item =>typeof item !== 'string' && Object.keys(item).length > 0)) {
        return data.some(item => item[prop] === value)
    }
    else { 
        return data.includes(value)
    }
}
module.exports = { dataContainsValue }

dataContainsValue([{ id: '123' }, {}], '123', 'child')