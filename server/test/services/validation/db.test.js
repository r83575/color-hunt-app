const { dataContainsValue } = require('../../../services/validation/db')

describe('DATA CONTAINS VALUE', () => {
    describe('data array contains objects', () => {
        it('should return true when data contains the search value', () => {
            const data = [{ id: 1, name: 'sara' }, { id: 9, name: 'lea' }]
            const response = dataContainsValue(data, 'sara', 'name')
            expect(response).toBe(true)
        })
        it('should return false when datadoes not  contains the search value', () => {
            const data = [{ id: 1, name: 'sara' }, { id: 9, name: 'lea' }]
            const response = dataContainsValue(data, 'rivka', 'name')
            expect(response).toBe(false)
        })
    })
    describe('data array contains primitive values', () => {
        it('should return true when data contains the search value', () => {
            const data = ['sara', 'lea']
            const response = dataContainsValue(data, 'sara')
            expect(response).toBe(true)
        })
        it('should return false when datadoes not  contains the search value', () => {
            const data = ['sara', 'lea']
            const response = dataContainsValue(data, 'rivka')
            expect(response).toBe(false)
        })
    })

    it('should retuen false when value is not an undefined', () => {
        const response = dataContainsValue([1, 2, 3])
        expect(response).toBe(false)
    })

    describe('ERRORS', () => {
        it('should throw error when data is not an array', () => {
            expect(() => dataContainsValue()).toThrow('data must be an array')
            expect(() => dataContainsValue('str')).toThrow('data must be an array')
            expect(() => dataContainsValue(123)).toThrow('data must be an array')
            expect(() => dataContainsValue(true)).toThrow('data must be an array')
        })

    })
})