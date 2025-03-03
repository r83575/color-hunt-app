const { addItem } = require('../../../services/db/write')

const fs = require('fs')
const path = require('path')
const { readAll } = require('../../../services/db/read')

jest.mock('fs')
jest.mock('path')
jest.mock('../../../services/db/read')

describe('ADD ITEM', () => {
    afterEach(() => {
        fs.existsSync.mockReset()
        fs.writeFileSync.mockReset()
    })

    it('should add an item to existing data from data base', () => {
        const model = 'test'
        readAll.mockReturnValue([{ x: 4, y: 5 }])
        fs.existsSync.mockReturnValue(true)
        path.join.mockReturnValue(`/folder/${model}.json`)

        _ = addItem(model, { x: 8, y: 0 })
        expect(readAll).toHaveBeenCalledWith(model)
        expect(fs.existsSync).toHaveBeenCalledWith('C:/temp-db')
        expect(fs.mkdirSync).not.toHaveBeenCalled()
        expect(fs.writeFileSync).toHaveBeenCalledWith(`/folder/${model}.json`, JSON.stringify([{ x: 4, y: 5 }, { x: 8, y: 0 }]))
    })

    it('should create the folder when it does not exist', () => {
        const model = 'test'
        fs.existsSync.mockReturnValue(false)
        path.join.mockReturnValue(`/folder/${model}.json`)

        _ = addItem(model, { x: 8, y: 0 })
        expect(readAll).toHaveBeenCalledWith(model)
        expect(fs.existsSync).toHaveBeenCalledWith('C:/temp-db')
        expect(fs.mkdirSync).toHaveBeenCalled()

    })

    describe('ERRORS', () => {
        const model = 'test'
        const item = { x: 1, y: 2 }
        it('should throw error when fs.writeFileSync throws error', () => {
            fs.writeFileSync.mockImplementation(() => { throw Error('error from mock writeFileSync') })
            expect(() => addItem(model, item)).toThrow('error from mock writeFileSync')
        })

        it('should throe error when path.join throws error', () => {
            path.join.mockImplementation(() => { throw Error('error from mock join') })
            expect(() => addItem(model, item)).toThrow('error from mock join')
        })

        it('should throw error when fs.mkdirSync throws erre', () => {
            fs.mkdirSync.mockImplementation(() => { throw Error('error from mock mkdirSync') })
            expect(() => addItem(model, item)).toThrow('error from mock mkdirSync')
        })

        it('should throw error when readAll throws error', () => {
            readAll.mockImplementation(() => { throw Error('error from mock readAll') })
            expect(() => addItem(model, item)).toThrow('error from mock readAll')
        })

        it('should throw error when item is undefined', () => {
            expect(() => addItem(model).toThrow('the item must be defined'))
        })

        it('should throw error when the model is not a string', () => {
            expect(() => addItem([], item)).toThrow('the model is not string')
        })

    })
})
