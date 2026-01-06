//convert an array of RGB to HEX notation

function convertRGBtoHEX(color) {
    let res = '#'
    color.map((item) => item.toString(16).length < 2 ? res += '0' + item.toString(16) : res += item.toString(16))
    return res.toUpperCase()
}

module.exports = { convertRGBtoHEX }