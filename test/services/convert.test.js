const { convertRGBtoHEX } = require('../../services/convert')

describe('CONVERT RGB TO HEX', () => {
    it('should return an RGB array color comination to HEX notation', () => {
        const hex = convertRGBtoHEX([56, 230, 85])
        expect(hex).toEqual('#38E655')
    })

    it('should add zero whenthe hex notation is less then 10', () => {
        const hex = convertRGBtoHEX([12, 5, 11])
        expect(hex).toEqual('#0C050B')
    })
})