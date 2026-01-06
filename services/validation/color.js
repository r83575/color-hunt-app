function isRGBColor(color) {
    try {
        if (!Array.isArray(color)) {
            throw TypeError('the color are not an array parameter')
        }
        if (color.every(num => !isNaN(num))) {
            if (color.length === 3) {
                return color.every(num => num >= 0 && num <= 255)
            }
            else {
                return false
            }
        }
        else {
            throw TypeError('expected the values of the color to have a numeric value')
        }

    }
    catch (error) {
        throw error
    }
}

function isHEXColor(color) {
    if (typeof color === 'string') {
        const regEx = /^#[0-9a-zA-Z]*$/
        if (color.length === 4 || color.length === 7)
            return regEx.test(color)
    }
    else {
        throw TypeError('the color is not array and not string')
    }
}

module.exports = { isRGBColor, isHEXColor }
