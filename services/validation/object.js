/*
 the function gets an object to check if it contains all the required fileds for a certain status.
 the function return true, when the object is valid
 the function an array with the missing properties of the object. this case the object is not valid
 */

function requiredFiledValidation(obj, modelFields, status='insert') {

}
/*
the function gets an object to check that all properties types are  as required
the function return true, when the object is valid
the function return an array with the properties names of properties thst are not from thr required type
*/ 
function requiredTypeValidation(obj, modelFields) {

}

module.exports = {
    requiredFiledValidation,
    requiredTypeValidation
}
