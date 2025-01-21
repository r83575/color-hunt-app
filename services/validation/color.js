function isRGBColor(color) {
    try {
        if (Array.isArray(color)) {
            if (color.length != 3) {
                return false
            }
            else {
                for (let i = 0; i < color.length; i++) {
                    if (color[i] == isNaN(color[i])) {
                        throw TypeError('expected the values of the color to have a numeric value')
                    }
                    if (color[i] > 255 || color[i] < 0) {
                        return false;
                    }
                }
                return true
            }
        }
        else {
            throw error
        }
    }
    catch (error) {
        throw error
    }

}

function isHEXColor(color) {
    if (typeof color === 'string') {
        //     if (color.length === 4 || color.length === 7) {
        //         if (color[0] === '#') {
        //             if (color.length === 4) {
        //                 const arrColor = [Number(color[1]),Number(color[2]), Number(color[3])]
        //                 // for (let i = 1; i < 4; i++) {
        //                 //     if (String(color[i]) > 15 || String(color[1]) < 0) {
        //                 //         throw new TypeError('the color is not right')
        //                 //     }
        //                 // }
        //                 isRGBColor(arrColor)

        //             }
        //             if (color.length === 7) {
        //                 console.log(color.substring(1,3).toString(10))
        //                 const arrColor = [Number(color.substring(1,3)),Number(color[2]), Number(color[3])]
        //                 isRGBColor(arrColor)
        //             }
        //         }
        //         else {
        //             throw new TypeError('the color is not begin wuth #')
        //         }

        //     }
        //     else {
        //         throw new TypeError('the color.length is not right')
        //     }
        const regEx = /^#[0-9a-zA-Z]*$/
        if (color.length === 4 || color.length === 7)
            return regEx.test(color)
    }
    else {
        throw TypeError('the color is not array and not string')
    }
}

module.exports = { isRGBColor, isHEXColor }
// isRGBColor([123,123,123])
// isRGBColor('#7b7b7b')
// isHEXColor([123,123,123])
// isHEXColor('#777')
// isHEXColor('#7b7b7b')
