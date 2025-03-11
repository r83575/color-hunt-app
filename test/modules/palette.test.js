const { createPalette, getAllPalette } = require('../../modules/palette')
const { convertRGBtoHEX } = require('../../services/convert')
const { getByCondition, readAll } = require('../../services/db/read')
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

    it('should not return and not create new palette when this id exist', () => {
        requiredFiledValidation.mockReturnValue(true)
        requiredTypeValidation.mockReturnValue(true)
        isHEXColor.mockReturnValue(true)
        isRGBColor.mockReturnValue(true)
        // convertRGBtoHEX.mockReturnValue()          
        getByCondition.mockReturnValue([palette])
        const response = createPalette(palette)
        expect(response).toEqual(undefined)
        expect(getByCondition).toHaveBeenCalledWith(model.name, { 'id': '#36E655#0C050B#a68B12#a68B13' })
        expect(addItem).not.toHaveBeenCalled()
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


describe('GET ALL PALETTE', () => {

    it('should return count palettes from skip index', () => {

        const ArrPalette = [
            { "userName": "abc", "colors": [["25", "168", "203"], ["25", "168", "100"], "#a68B12", "#a68B13"], "id": "#25168203#25168203#25168100#a68B12#a68B13" },
            { "userName": "abc", "colors": [[56, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#38E655#38E655#0C050B#a68B12#a68B13" },
            { "userName": "abc", "colors": [[56, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#38E655#0C050B#a68B12#a68B13" },
            { "userName": "abc", "colors": [[56, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#38E655#0C050B#a68B12#a68B13" },
            { "userName": "abc", "colors": [["123", "234", "123"], ["122", "234", "123"], "#a12b54", "#b15a46"], "id": "#123234123#122234123#a12b54#b15a46" },
            { "userName": "abc", "colors": [[55, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#37E655#0C050B#a68B12#a68B13" },
            { "colors": ["#a12b35", [12, 25, 152], "#a52b69", [250, 120, 18]], "userName": "develop", "id": "#a12b35#0C1998#a52b69#FA7812" },
            { "colors": ["#a12b35", [12, 25, 152], "#a52b69", [250, 120, 19]], "userName": "develop", "id": "#a12b35#0C1998#a52b69#FA7813" },
            { "colors": ["#a12b35", [12, 25, 152], "#a52b68", [250, 120, 19]], "userName": "develop", "id": "#a12b35#0C1998#a52b68#FA7813" },
            { "colors": ["#a12b35", "#a52b68", [12, 25, 152], [250, 120, 19]], "userName": "develop", "id": "#a12b35#a52b68#0C1998#FA7813" }
        ];
        readAll.mockReturnValue(ArrPalette)
        const skip = 3, count = 3;
        const response = getAllPalette(skip, count)
        expect(response).toEqual([{ "userName": "abc", "colors": [[56, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#38E655#0C050B#a68B12#a68B13" },
        { "userName": "abc", "colors": [["123", "234", "123"], ["122", "234", "123"], "#a12b54", "#b15a46"], "id": "#123234123#122234123#a12b54#b15a46" },
        { "userName": "abc", "colors": [[55, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#37E655#0C050B#a68B12#a68B13" }])
    })

    it('should return empty array when count is 0', () => {

        const ArrPalette = [
            { "userName": "abc", "colors": [["25", "168", "203"], ["25", "168", "100"], "#a68B12", "#a68B13"], "id": "#25168203#25168203#25168100#a68B12#a68B13" },
            { "userName": "abc", "colors": [[56, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#38E655#38E655#0C050B#a68B12#a68B13" },
            { "userName": "abc", "colors": [[56, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#38E655#0C050B#a68B12#a68B13" },
            { "userName": "abc", "colors": [[56, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#38E655#0C050B#a68B12#a68B13" },
            { "userName": "abc", "colors": [["123", "234", "123"], ["122", "234", "123"], "#a12b54", "#b15a46"], "id": "#123234123#122234123#a12b54#b15a46" },
            { "userName": "abc", "colors": [[55, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#37E655#0C050B#a68B12#a68B13" },
            { "colors": ["#a12b35", [12, 25, 152], "#a52b69", [250, 120, 18]], "userName": "develop", "id": "#a12b35#0C1998#a52b69#FA7812" },
            { "colors": ["#a12b35", [12, 25, 152], "#a52b69", [250, 120, 19]], "userName": "develop", "id": "#a12b35#0C1998#a52b69#FA7813" },
            { "colors": ["#a12b35", [12, 25, 152], "#a52b68", [250, 120, 19]], "userName": "develop", "id": "#a12b35#0C1998#a52b68#FA7813" },
            { "colors": ["#a12b35", "#a52b68", [12, 25, 152], [250, 120, 19]], "userName": "develop", "id": "#a12b35#a52b68#0C1998#FA7813" }
        ];
        readAll.mockReturnValue(ArrPalette)
        const skip = 1, count = 0;
        const response = getAllPalette(skip, count)
        expect(response).toEqual([])
    })

    it('should return all from readAll when the count bigger from the arr.length', () => {
        const ArrPalette = [
            { "userName": "abc", "colors": [["25", "168", "203"], ["25", "168", "100"], "#a68B12", "#a68B13"], "id": "#25168203#25168203#25168100#a68B12#a68B13" },
            { "userName": "abc", "colors": [[56, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#38E655#38E655#0C050B#a68B12#a68B13" },
            { "userName": "abc", "colors": [[56, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#38E655#0C050B#a68B12#a68B13" },
            { "userName": "abc", "colors": [[56, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#38E655#0C050B#a68B12#a68B13" },
            { "userName": "abc", "colors": [["123", "234", "123"], ["122", "234", "123"], "#a12b54", "#b15a46"], "id": "#123234123#122234123#a12b54#b15a46" },
            { "userName": "abc", "colors": [[55, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#37E655#0C050B#a68B12#a68B13" },
            { "colors": ["#a12b35", [12, 25, 152], "#a52b69", [250, 120, 18]], "userName": "develop", "id": "#a12b35#0C1998#a52b69#FA7812" },
            { "colors": ["#a12b35", [12, 25, 152], "#a52b69", [250, 120, 19]], "userName": "develop", "id": "#a12b35#0C1998#a52b69#FA7813" },
            { "colors": ["#a12b35", [12, 25, 152], "#a52b68", [250, 120, 19]], "userName": "develop", "id": "#a12b35#0C1998#a52b68#FA7813" },
            { "colors": ["#a12b35", "#a52b68", [12, 25, 152], [250, 120, 19]], "userName": "develop", "id": "#a12b35#a52b68#0C1998#FA7813" }
        ];
        readAll.mockReturnValue(ArrPalette)
        const skip = 3, count = 50;
        const response = getAllPalette(skip, count)
        expect(response).toEqual([{ "userName": "abc", "colors": [[56, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#38E655#0C050B#a68B12#a68B13" },
        { "userName": "abc", "colors": [["123", "234", "123"], ["122", "234", "123"], "#a12b54", "#b15a46"], "id": "#123234123#122234123#a12b54#b15a46" },
        { "userName": "abc", "colors": [[55, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#37E655#0C050B#a68B12#a68B13" },
        { "colors": ["#a12b35", [12, 25, 152], "#a52b69", [250, 120, 18]], "userName": "develop", "id": "#a12b35#0C1998#a52b69#FA7812" },
        { "colors": ["#a12b35", [12, 25, 152], "#a52b69", [250, 120, 19]], "userName": "develop", "id": "#a12b35#0C1998#a52b69#FA7813" },
        { "colors": ["#a12b35", [12, 25, 152], "#a52b68", [250, 120, 19]], "userName": "develop", "id": "#a12b35#0C1998#a52b68#FA7813" },
        { "colors": ["#a12b35", "#a52b68", [12, 25, 152], [250, 120, 19]], "userName": "develop", "id": "#a12b35#a52b68#0C1998#FA7813" }])
    })

    it('should return all from readAll when the count bigger from the arr.length', () => {
        const ArrPalette = [
            { "userName": "abc", "colors": [["25", "168", "203"], ["25", "168", "100"], "#a68B12", "#a68B13"], "id": "#25168203#25168203#25168100#a68B12#a68B13" },
            { "userName": "abc", "colors": [[56, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#38E655#38E655#0C050B#a68B12#a68B13" },
            { "userName": "abc", "colors": [[56, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#38E655#0C050B#a68B12#a68B13" },
            { "userName": "abc", "colors": [[56, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#38E655#0C050B#a68B12#a68B13" },
            { "userName": "abc", "colors": [["123", "234", "123"], ["122", "234", "123"], "#a12b54", "#b15a46"], "id": "#123234123#122234123#a12b54#b15a46" },
            { "userName": "abc", "colors": [[55, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#37E655#0C050B#a68B12#a68B13" },
            { "colors": ["#a12b35", [12, 25, 152], "#a52b69", [250, 120, 18]], "userName": "develop", "id": "#a12b35#0C1998#a52b69#FA7812" },
            { "colors": ["#a12b35", [12, 25, 152], "#a52b69", [250, 120, 19]], "userName": "develop", "id": "#a12b35#0C1998#a52b69#FA7813" },
            { "colors": ["#a12b35", [12, 25, 152], "#a52b68", [250, 120, 19]], "userName": "develop", "id": "#a12b35#0C1998#a52b68#FA7813" },
            { "colors": ["#a12b35", "#a52b68", [12, 25, 152], [250, 120, 19]], "userName": "develop", "id": "#a12b35#a52b68#0C1998#FA7813" }
        ];
        readAll.mockReturnValue(ArrPalette)
        const skip = 3, count = 8;
        const response = getAllPalette(skip, count)
        expect(response).toEqual([{ "userName": "abc", "colors": [[56, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#38E655#0C050B#a68B12#a68B13" },
        { "userName": "abc", "colors": [["123", "234", "123"], ["122", "234", "123"], "#a12b54", "#b15a46"], "id": "#123234123#122234123#a12b54#b15a46" },
        { "userName": "abc", "colors": [[55, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#37E655#0C050B#a68B12#a68B13" },
        { "colors": ["#a12b35", [12, 25, 152], "#a52b69", [250, 120, 18]], "userName": "develop", "id": "#a12b35#0C1998#a52b69#FA7812" },
        { "colors": ["#a12b35", [12, 25, 152], "#a52b69", [250, 120, 19]], "userName": "develop", "id": "#a12b35#0C1998#a52b69#FA7813" },
        { "colors": ["#a12b35", [12, 25, 152], "#a52b68", [250, 120, 19]], "userName": "develop", "id": "#a12b35#0C1998#a52b68#FA7813" },
        { "colors": ["#a12b35", "#a52b68", [12, 25, 152], [250, 120, 19]], "userName": "develop", "id": "#a12b35#a52b68#0C1998#FA7813" }])
    })

    describe('ERRORS', () => {
        it('should throw error when readAll throws error', () => {
            const skip = 3, count = 3;
            readAll.mockImplementation(() => { throw Error('error from mock readAll') })
            expect(() => getAllPalette(skip, count)).toThrow('error from mock readAll')
        })

        it('should throw error when skip bigger from palettelength', () => {
            const ArrPalette = [
                { "userName": "abc", "colors": [["25", "168", "203"], ["25", "168", "100"], "#a68B12", "#a68B13"], "id": "#25168203#25168203#25168100#a68B12#a68B13" },
                { "userName": "abc", "colors": [[56, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#38E655#38E655#0C050B#a68B12#a68B13" },
                { "userName": "abc", "colors": [[56, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#38E655#0C050B#a68B12#a68B13" },
                { "userName": "abc", "colors": [[56, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#38E655#0C050B#a68B12#a68B13" },
                { "userName": "abc", "colors": [["123", "234", "123"], ["122", "234", "123"], "#a12b54", "#b15a46"], "id": "#123234123#122234123#a12b54#b15a46" },
                { "userName": "abc", "colors": [[55, 230, 85], [12, 5, 11], "#a68B12", "#a68B13"], "id": "#37E655#0C050B#a68B12#a68B13" },
                { "colors": ["#a12b35", [12, 25, 152], "#a52b69", [250, 120, 18]], "userName": "develop", "id": "#a12b35#0C1998#a52b69#FA7812" },
                { "colors": ["#a12b35", [12, 25, 152], "#a52b69", [250, 120, 19]], "userName": "develop", "id": "#a12b35#0C1998#a52b69#FA7813" },
                { "colors": ["#a12b35", [12, 25, 152], "#a52b68", [250, 120, 19]], "userName": "develop", "id": "#a12b35#0C1998#a52b68#FA7813" },
                { "colors": ["#a12b35", "#a52b68", [12, 25, 152], [250, 120, 19]], "userName": "develop", "id": "#a12b35#a52b68#0C1998#FA7813" }
            ];
            const skip = 20, count = 3;
            readAll.mockReturnValue(ArrPalette)
            expect(() => getAllPalette(skip, count)).toThrow('the skip is bigger from the length arr')
        })
        it('should throw error when skip or count is not a number', () => {
            const skip = 1, count = 4;
            expect(() => getAllPalette('a', count)).toThrow('the skip is not a number')
            expect(() => getAllPalette(skip, { x: 1 })).toThrow('the count is not a number')
        })

    })
})