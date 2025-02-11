const { readAll , getByCondition } = require('../../../services/db/read')

const fs = require('fs')
const path = require('path')

jest.mock('fs')
jest.mock('path')

describe('READ ALL', () => {

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

    })

    describe('ERRORS', () => {

        it('should throw error when ehrn data is not array', () => {

        })

        it('shold throw error when the data in the bd file is corrupt', () => {

        })

        it('should throw error when fs.readFileSync throws error', () => {

        })

        it('should throw error when path.join throws error', () => {

        })

        it('shold throw error when model is not string', () => {

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

    it('should return all the data when condition is undefined',()=>{

    })

    it('should return an empty array, when no items correponds to the condition',()=>{

    })

    describe('ERRORS', () => {
        it('should throw error, when readAll throws error',()=>{

        })
        it('should throw error, when the condition is not an object or undefined',()=>{

        })
        it('should throw error when model is not a string',()=>{
            
        })
    })
})

