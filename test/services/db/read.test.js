const { readAll, getByCondition } = require('../../../services/db/read')

const fs = require('fs')
const path = require('path')

jest.mock('fs')
jest.mock('path')

describe('READ ALL', () => {

    afterEach(() => {
        fs.existsSync.mockReset()
        fs.readFileSync.mockReset()
        path.join.mockReset()
    })
    it('should return an array of data from existing data base json file ', () => {
        const model = 'test'
        path.join.mockReturnValue(`/folder/${model}.json`)
        fs.existsSync.mockReturnValue(true)
        fs.readFileSync.mockReturnValue(JSON.stringify([{ id: 2, value: 'test' }]))

        const response = readAll(model)
        expect(response).toEqual([{ id: 2, value: 'test' }])
        expect(path.join).toHaveBeenCalledWith('C:/temp-db', `${model}.json`)
        expect(fs.existsSync).toHaveBeenCalledWith(`/folder/${model}.json`)
        expect(fs.readFileSync).toHaveBeenCalledWith(`/folder/${model}.json`)
    })

    it('should return an empty array when db file does not exist', () => {
        const model = 'test'
        fs.existsSync.mockReturnValue(false)
        const response = readAll(model)
        expect(response).toEqual([])
    })

    describe('ERRORS', () => {

        it('should throw error when data is not array', () => {
            const model = 'test'
            path.join.mockReturnValue(`/folder/${model}.json`)
            fs.existsSync.mockReturnValue(true)
            fs.readFileSync.mockReturnValue(JSON.stringify('abc'))
            expect(() => readAll(model)).toThrow('db corrupt')
        })

        it('shold throw error when the data in the db file is corrupt', () => {
            const model = 'test'
            path.join.mockReturnValue(`/folder/${model}.json`)
            fs.existsSync.mockReturnValue(true)
            fs.readFileSync.mockReturnValue(JSON.stringify('abc'))
            expect(() => readAll(model)).toThrow('db corrupt')
        })

        it('should throw error when fs.readFileSync throws error', () => {
            const model = 'test'
            path.join.mockReturnValue(`/folder/${model}.json`)
            fs.existsSync.mockReturnValue(true)
            fs.readFileSync.mockImplementation(() => { throw Error('error from mock readFileSync') })
            expect(() => readAll(model)).toThrow('error from mock readFileSync')
        })

        it('should throw error when path.join throws error', () => {
            const model = 'test'
            path.join.mockImplementation(() => { throw Error('error from mock join') })
            expect(() => readAll(model)).toThrow('error from mock join')
        })

        it('should throw error when model is not string', () => {
            expect(() => readAll([])).toThrow('the model is not string')
        })

    })

})

describe('GET BY CONDITION', () => {

    const datalist = [{ x: 6, y: 2 }, { x: 7, y: 0 },
    { x: 3, y: 2 }, { x: 8, y: 0 }, { x: 7 }, { y: 2 }]

    it('should return the objects from data that correponds to the condition', () => {
        fs.existsSync.mockReturnValue(true)
        fs.readFileSync.mockReturnValue(JSON.stringify(datalist))
        const response = getByCondition('test', { x: 7 })
        expect(response).toEqual([{ x: 7, y: 0 }, { x: 7 }])
    })

    it('should return all the data when condition is undefined', () => {
        fs.existsSync.mockReturnValue(true)
        fs.readFileSync.mockReturnValue(JSON.stringify(datalist))
        const response = getByCondition('test')
        expect(response).toEqual(JSON.parse(JSON.stringify(datalist)))
    })

    it('should return an empty array, when no items correponds to the condition', () => {
        fs.existsSync.mockReturnValue(true)
        fs.readFileSync.mockReturnValue(JSON.stringify(datalist))
        const response = getByCondition('test', { x: 0 })
        expect(response.length).toBe(0)
    })

    describe('ERRORS', () => {

        it('should throw error, when readAll throws error', () => {
            // על פונקציה באותו עמוד  mock א"א לעשות
        })

        it('should throw error, when the condition is not an object or undefined', () => {
            const model = 'test'
            expect(() => getByCondition(model, 'abc')).toThrow('the condition is not an object or undefined')
        })

        it('should throw error when model is not a string', () => {
            expect(() => getByCondition([])).toThrow('the model is not string')
        })
    })
})

