const { modelState,
    requiredFiledValidation,
    requiredTypeValidation
} = require('../../../services/validation/object')

const modelTest = {
    name: 'test',
    fields: [
        {
            name: 'id', required: {
                [modelState.INSERT]: false,
                [modelState.UPDATE]: true,
                [modelState.DELETE]: true,
            }, type: 'string'
        }, {
            name: 'code', required: {
                [modelState.INSERT]: true,
                [modelState.UPDATE]: false,
                [modelState.DELETE]: false,
            }, type: (val)=> typeof val === 'number'||(typeof val === 'string'&& isNaN(val))||val instanceof Number
        }, {
            name: 'name', required: {
                [modelState.INSERT]: true,
                [modelState.UPDATE]: false,
                [modelState.DELETE]: false,
            }, type: 'string'
        }, {
            name: 'items', required: {
                [modelState.INSERT]: false,
                [modelState.UPDATE]: false,
                [modelState.DELETE]: false,
            }, type: (val)=>val instanceof Array
        }
    ]
}

describe('REQUIRE FILED VALIDATION',()=>{
    it('should return true when all required fields are present',()=>{
        const obj={code:7483,name:'test'}
        const response = requiredFiledValidation(obj,modelTest,modelState.INSERT)
        expect(response).toBeTruthy()
    })

    it('should return an array of the required properties that are not present',()=>{
        const obj={id:'test_id',items:[]}
        const response =requiredFiledValidation(obj,modelTest,modelState.INSERT)
        expect(response).toBeInstanceOf(Array)
        expect(response.length).toBe(2)
        expect(response).toContain('name')
        expect(response).toContain('code')
    })

    describe('ERRORS',()=>{

        it('should throw error when obj is not an object',()=>{
            expect(()=>requiredFiledValidation('hello')).toThrow('object must be of type object')
            expect(()=>requiredFiledValidation(885)).toThrow('object must be of type object')
            expect(()=>requiredFiledValidation(true)).toThrow('object must be of type object')
            expect(()=>requiredFiledValidation(/[0-4]{8}/)).toThrow('object must be of type object')
            expect(()=>requiredFiledValidation([4,5,6])).toThrow('object must be of type object')
            expect(()=>requiredFiledValidation(()=>true)).toThrow('object must be of type object')
        })

        it('sholt throw error when model is undefined',()=>{
            expect(()=>requiredFiledValidation({id:96})).toThrow('model must be defined')
        })

        it('should throw error when model doesn\'t have a fileds property',()=>{
            expect(()=>requiredFiledValidation({id:'p6'},{name:'test'})).toThrow('model fields must be defined')
        })

        it('should throw error when model.fileds is not an array, or its item don\'t contain the name property',()=>{
            expect(()=>requiredFiledValidation({id:'3'},{name:'test',fields:558})).toThrow('model.fields field has to be an array of objects with name attribute')
            expect(()=>requiredFiledValidation({id:'3'},{name:'test',fields:[7,8]})).toThrow('model.fields field has to be an array of objects with name attribute')
            expect(()=>requiredFiledValidation({id:'3'},{name:'test',fields:[{id:1},{id:2}]})).toThrow('model.fields field has to be an array of objects with name attribute')
        })

        it('should throw error when the status is not a string ',()=>{
            expect(()=>requiredFiledValidation({id:6},{fields:[{name:'fieldName'}]},748)).toThrow('status must be a string')
            expect(()=>requiredFiledValidation({id:6},{fields:[{name:'fieldName'}]},[])).toThrow('status must be a string')
            expect(()=>requiredFiledValidation({id:6},{fields:[{name:'fieldName'}]},()=>true)).toThrow('status must be a string')
            expect(()=>requiredFiledValidation({id:6},{fields:[{name:'fieldName'}]},false)).toThrow('status must be a string')
        })

        it('should throw error when status is not one of the existing options',()=>{
            expect(()=>requiredFiledValidation({id:6},{fields:[{name:'fieldName'}]},'hello')).toThrow('status must be one of the existing options')
        })
    })
})

describe('REQUIRED TYPE VALIDATION',()=>{
//     it('should return true when all the fields are from the required type',()=>{
//         const obj = {id:'111',code:456,items:[4,5,6]}
//         const response =requiredTypeValidation(obj,modelTest)
//         expect(response).toBeTruthy()
//     })

//     it('should return true when numeric fields return ture when the value is a numeric string',()=>{
//         const obj = {id:'111',code:'456',items:[4,5,6]}
//         const response =requiredTypeValidation(obj,modelTest)
//         expect(response).toBeTruthy()
//     })

//     it('should return an array of the properties that their type is not as required',()=>{
//         const obj = {id:'111',code:456,items:'list'}
//         const response =requiredTypeValidation(obj,modelTest)
//         expect(response).toBeInstanceOf(Array)
//         expect(response.length).toBe(2)
//         expect(response.length).toContain('name')
//         expect(response.length).toContain('items')
//     })

    describe('ERRORS',()=>{
        it('should throw error when obj is not an object',()=>{
            expect(()=>requiredTypeValidation('hello')).toThrow('object must be of type object')
            expect(()=>requiredTypeValidation(885)).toThrow('object must be of type object')
            expect(()=>requiredTypeValidation(true)).toThrow('object must be of type object')
            expect(()=>requiredTypeValidation(/[0-4]{8}/)).toThrow('object must be of type object')
            expect(()=>requiredTypeValidation([4,5,6])).toThrow('object must be of type object')
            expect(()=>requiredTypeValidation(()=>true)).toThrow('object must be of type object')
        })

        it('sholt throw error when model is undefined',()=>{
            expect(()=>requiredTypeValidation({id:96})).toThrow('model must be defined')
        })

        it('should throw error when model doesn\'t have a fileds property',()=>{
            expect(()=>requiredTypeValidation({id:'p6'},{name:'test'})).toThrow('model fields must be defined')
        })

        it('should throw error when model.fileds is not an array, or its item don\'t contain the name property',()=>{
            expect(()=>requiredTypeValidation({id:'3'},{name:'test',fields:558})).toThrow('model.fields field has to be an array of objects with name attribute')
            expect(()=>requiredTypeValidation({id:'3'},{name:'test',fields:[7,8]})).toThrow('model.fields field has to be an array of objects with name attribute')
            expect(()=>requiredTypeValidation({id:'3'},{name:'test',fields:[{id:1},{id:2}]})).toThrow('model.fields field has to be an array of objects with name attribute')
        })
    })
})
