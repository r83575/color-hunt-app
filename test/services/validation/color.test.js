const { isRGBColor, isHEXColor } = require('../../../services/validation/color')

describe('IS RGB COLOR', () => {
    it('should return true when the function gets a array with 3 numbers between 0 and 255', () => {
        const color = [25, 168, 203]
        const valid = isRGBColor(color)
        expect(valid).toBeTruthy()
    })

    it('should return true when the array has numeric strings', () => {
        const color = ['25', '168', '203']
        const valid = isRGBColor(color)
        expect(valid).toBeTruthy()
    })

    it('should return false when the array\'s size is not 3', () => {
        const color1 = ['25', '168', '203', '12']
        const color2 = ['25', '168']
        const valid1 = isRGBColor(color1)
        const valid2 = isRGBColor(color2)
        expect(valid1).toBeFalsy()
        expect(valid2).toBeFalsy()
    })

    it('should return false when the numbers values are not between 0 and 255', () => {
        const color = [25, 168, 266]
        const valid = isRGBColor(color)
        expect(valid).toBeFalsy()
    })

    describe('ERRORS', () => {
        it('should throw error when not all values are numeric', () => {
            expect(() => isRGBColor([{x:'a'},25, 168])).toThrow('expected the values of the color to have a numeric value')           
        })

        it('should throw error when color are not an array parameter', () => {
            expect(() => isRGBColor('abc')).toThrow('the color are not an array parameter')           
        })
    })
})

describe('IS HEX COLOR', () => {
    it('should return true when the function gets a valid string ', () => {
        const color = '#a68B12'
        const valid = isHEXColor(color)
        expect(valid).toBeTruthy
    })

    it('should return false when the function gets an unvalid string ', () => {
        const color1 = '#a68B125'
        const color2 = '#a6825'
        const color3 = '#a68B?2'
        const color4 = 'a68B12'

        const valid1 = isHEXColor(color1)
        const valid2 = isHEXColor(color2)
        const valid3 = isHEXColor(color3)
        const valid4 = isHEXColor(color4)
        expect(valid1).toBeFalsy
        expect(valid2).toBeFalsy
        expect(valid3).toBeFalsy
        expect(valid4).toBeFalsy
    })

    describe('ERRORS', () => {
        it('should throw error when the color parameter is not a string', () => {
            expect(() => isHEXColor(123)).toThrow( 'the color is not array and not string')
        })
    })
})

