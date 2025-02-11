const { addItem } = require('../../../services/db/write')

const fs = require('fs')
const path = require('path')
const { readAll } = require('../../../services/db/read')

jest.mock('fs')
jest.mock('path')
jest.mock('../../../services/db/read')

describe('ADD ITEM', () => {
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

    it('should create the folder when it does not exist',()=>{

    })

    describe('ERRORS', () => {
        it('should throw error when fs.writeFileSync throws error',()=>{
        
        })

        it('should throe error when path.join throws error',()=>{
        
        })

        it('should throw error when fs.mkdirSync throws erre',()=>{
        
        })

        it('should throw error when readAll throws error',()=>{
        
        })

        it('should throw error when item is undefined',()=>{
        
        })

        it('should throw error when the model is not a string',()=>{
        
        })
    })
})
