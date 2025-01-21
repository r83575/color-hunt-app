function isRGBColor(color) {
    console.log(color)
    if (Array.isArray(color)) {
        if (color.length != 3) {
            throw new TypeError('the rgb-color do not has 3 colors')
        }
        else {
            for (let i = 0; i < color.length; i++) {
                if (color[i] > 256 || color[i] < 0) {
                    throw new TypeError('the color is not right')
                }
            }
        }
    }
    else {
        isHEXColor(color)
    }

}

function isHEXColor(color) {
    if (typeof color === 'string') {
        if (color.length === 4 || color.length === 7) {
            if (color[0] === '#') {
                if (color.length === 4) {
                    const arrColor = [Number(color[1]),Number(color[2]), Number(color[3])]
                    // for (let i = 1; i < 4; i++) {
                    //     if (String(color[i]) > 15 || String(color[1]) < 0) {
                    //         throw new TypeError('the color is not right')
                    //     }
                    // }
                    isRGBColor(arrColor)

                }
                if (color.length === 7) {
                    console.log(color.substring(1,3))
                    const arrColor = [Number(color.substring(1,3)),Number(color[2]), Number(color[3])]
                    isRGBColor(arrColor)
                }
            }
            else {
                throw new TypeError('the color is not begin wuth #')
            }

        }
        else {
            throw new TypeError('the color.length is not right')
        }
    }
    else {
        throw new TypeError('the color is not array and not string')
    }
}

module.exports = { isRGBColor, isHEXColor }
// isRGBColor([123,123,123])
// isRGBColor('#7b7b7b')
// isHEXColor([123,123,123])
isHEXColor('#b77')
isHEXColor('#7b7b7b')
