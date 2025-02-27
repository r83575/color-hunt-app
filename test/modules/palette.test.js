const { createPalette } = require('../../modules/palette')
const { convertRGBtoHEX } = require('../../services/convert')
const { getByCondition } = require('../../services/db/read')
const { addItem } = require('../../services/db/write')
const { isHEXColor, isRGBColor } = require('../../services/validation/color')
const { modelState, requiredFiledValidation, requiredTypeValidation } = require('../../services/validation/object')

jest.mock('../../services/validation/color')
jest.mock('../../services/validation/object')
jest.mock('../../services/convert')
jest.mock('../../services/db/read')
jest.mock('../../services/db/write')

describe('CREATE PALETTE', () => {
     
    it('should return and create new palette',()=>{
        convertRGBtoHEX.mockReturnValue()
        addItem.toHaveBeenCalledWith()
    })

    describe('ERRORS', () => {
        it('should throw error when requiredFiledValidation dont return Array',()=>{
            requiredFiledValidation.mockReturnValue() 
            expect(() => createPalette({ palette })).toThrow('the following properties are missing: ${requiredFields.join(', ')}')//לשנות את מה שאחרי ה-$
        })
        it('should throw error when requiredTypeValidation dont return Array',()=>{
            requiredTypeValidation.mockReturnValue()
            expect(() => createPalette({ palette })).toThrow('not all colors are from the correct type (string or array with numbers)')
        })
        it('should throw error when the colors length is less from 4',()=>{
            expect(() => createPalette({ palette })).toThrow('the palette needs 4 colors, but got ${colors.length}')//לשנות את מה שאחרי ה-$
        })
        it('should throw when not all colors are from the correct type',()=>{
            expect(() => createPalette({ palette })).toThrow('not all colors are from the correct type (string or array with numbers)')
            
        })
        it('should throw when not all colors are from the correct type',()=>{
            isHEXColor().mockReturnValue()
            isRGBColor().mockReturnValue()
            expect(() => createPalette({ palette })).toThrow('the colors are not from real colors')
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