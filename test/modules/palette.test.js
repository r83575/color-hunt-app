const { createPalette } = require('../../modules/palette')
const { convertRGBtoHEX } = require('../../services/convert')
const { getByCondition } = require('../../services/db/read')
const { addItem } = require('../../services/db/write')
const { isHEXColor, isRGBColor } = require('../../services/validation/color')
const { modelState, requiredFiledValidation, requiredTypeValidation } = require('../../services/validation/object')

jest.mock('../../services/validation/color')
jest.mock('../../services/validation/object')
// jest.mock('../../services/convert')
jest.mock('../../services/db/read')
jest.mock('../../services/db/write')

const model = {
    name: "palette",
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

const palette = { userName: 'abc', colors: [[54, 230, 85], [12, 5, 11], '#a68B12', '#a68B13'] }

describe('CREATE PALETTE', () => {

    afterEach(() => {
        requiredFiledValidation.mockReset()
        requiredTypeValidation.mockReset()
        getByCondition.mockReset()
        isHEXColor.mockReset()
        isRGBColor.mockReset()
        addItem.mockReset()
    })

    it('should return and create new palette', () => {
        requiredFiledValidation.mockReturnValue(true)
        requiredTypeValidation.mockReturnValue(true)
        isHEXColor.mockReturnValue(true)
        isRGBColor.mockReturnValue(true)
        // convertRGBtoHEX.mockReturnValue()          
        getByCondition.mockReturnValue([])
        const response = createPalette(palette)
        expect(response).toEqual({ userName: 'abc', colors: [[54, 230, 85], [12, 5, 11], '#a68B12', '#a68B13'], id: "#36E655#0C050B#a68B12#a68B13" })
        expect(getByCondition).toHaveBeenCalledWith(model.name, { 'id': '#36E655#0C050B#a68B12#a68B13' })
        expect(addItem).toHaveBeenCalled()
    })

    it('should return and create new palette', () => {
        requiredFiledValidation.mockReturnValue(true)
        requiredTypeValidation.mockReturnValue(true)
        isHEXColor.mockReturnValue(true)
        isRGBColor.mockReturnValue(true)
        // convertRGBtoHEX.mockReturnValue()          
        getByCondition.mockReturnValue([])
        const response = createPalette(palette)
        expect(response).toEqual({ userName: 'abc', colors: [[54, 230, 85], [12, 5, 11], '#a68B12', '#a68B13'], id: "#36E655#0C050B#a68B12#a68B13" })
        expect(getByCondition).toHaveBeenCalledWith(model.name, { 'id': '#36E655#0C050B#a68B12#a68B13' })
        expect(addItem).toHaveBeenCalled()
    })

    it('should return palette.id true', () => {
        requiredFiledValidation.mockReturnValue(true)
        requiredTypeValidation.mockReturnValue(true)
        isHEXColor.mockReturnValue(true)
        isRGBColor.mockReturnValue(true)
        // convertRGBtoHEX.mockReturnValue()  
        getByCondition.mockReturnValue([])
        const response = createPalette(palette)
        expect(response.id).toEqual('#36E655#0C050B#a68B12#a68B13')
    })

    describe('ERRORS', () => {

        it('should throw error when requiredFiledValidation dont return Array', () => {
            requiredFiledValidation.mockReturnValue(['name', 'id'])
            expect(() => createPalette()).toThrow('the following properties are missing: name, id')
        })

        it('should throw error when requiredTypeValidation dont return Array', () => {
            requiredTypeValidation.mockReturnValue(['name'])
            expect(() => createPalette()).toThrow('there following are not in the correct type: name')
        })

        it('should throw error when the colors length is less from 4', () => {
            const palette1 = { userName: 'abc', colors: [[12, 5, 11], '#a68B12', '#a68B13'] }
            const colors1 = palette1.colors
            expect(() => createPalette(palette1)).toThrow(`the palette needs 4 colors, but got ${colors1.length}`)
            const palette2 = { userName: 'abc', colors: [[54, 230, 85], [12, 5, 11], '#a68B12', '#a68B13', [12, 12, 12]] }
            const colors2 = palette2.colors
            expect(() => createPalette(palette2)).toThrow(`the palette needs 4 colors, but got ${colors2.length}`)
        })

        it('should throw when not all colors are from the correct type', () => {
            const palette = { userName: 'abc', colors: [[54, 230, 85], [12, 5, 11], 12, '#a68B13'] }
            expect(() => createPalette(palette)).toThrow('not all colors are from the correct type (string or array with numbers)')
        })

        it('should throw when not all colors are from the correct type', () => {
            const palette1 = { userName: 'abc', colors: [[12, 54, 230, 85], [12, 5, 11], '#a68B12', '#a68B13'] }
            const palette2 = { userName: 'abc', colors: [[54, 230, 85], [12, 5, 11], '#a68B12', '#a68B?2'] }
            expect(() => createPalette(palette1)).toThrow('the colors are not from real colors')
            expect(() => createPalette(palette2)).toThrow('the colors are not from real colors')
        })
    })
})
//mock
// expect(readAll).toHaveBeenCalledWith(model)
// expect(fs.mkdirSync).not.toHaveBeenCalled()

// expect(response).toBe(false)
// expect(response).toContain('name')
// expect(response).toBeInstanceOf(Array)
// expect(response).toContain('name')
// expect(fs.existsSync).toEqual(ARRAY)
