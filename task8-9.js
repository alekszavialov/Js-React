//equals variables
const firstObject = {name: {user: "user"}, age: {user: "user1"}, null: {null: {null: null}}, time: 22};
const secondObject = {name: {user: "user"}, null: {null: {null: null}}, age: {user: "user1"}, time: 22};
const firstObjectIncorrect = {name: {user: "user"}, age: {user: "user1"}, null: {null: {null: null}}, time: "22"};
const firstArray = [1, 2, 3, 4, [2, 3]];
const secondArray = [1, 2, 3, 4, [2, 3]];
const firstArrayIncorrect = [1, 3, 3, 4, [2, 4]];
const firstString = "1";
const secondString = "1";
const firstStringIncorrect = "2";

//deepCopy variables
let copyObject = {name: {user: "user"}, age: {user: "user1"}, null: {null: {null: null}}, time: 22};
let copyArray = [1, 2, "3", {user: "Alex", age: {date: "123", time: "11.00"}}];
let copyString = "12345";

function isEqual(dataX, dataY) {
    if (dataX === dataY) {
        return true;
    }
    if (!(dataX instanceof Object) || !(dataY instanceof Object)) {
        return false;
    }
    if (Object.keys(dataX).length !== Object.keys(dataY).length) {
        return false;
    }
    if (Array.isArray(dataX) !== Array.isArray(dataY)) {
        return false;
    }
    for (let key in dataX) {
        if (!dataY.hasOwnProperty(key) || !isEqual(dataX[key], dataY[key])) {
            return false;
        }
    }
    return true;
}

function deepCopy(cloneableData) {
    let clonedData;
    if (cloneableData instanceof Object) {
        if (Array.isArray(cloneableData)) {
            clonedData = [];
        } else {
            clonedData = {};
        }
        for (let key in cloneableData) {
            clonedData[key] = deepCopy(cloneableData[key]);
        }
    } else {
        clonedData = cloneableData;
    }
    return clonedData;
}

function printResult(boolValue) {
    if (!boolValue) {
        return "not equals ";
    }
    return "equals";
}

function runEqualTest() {
    console.log(printResult(isEqual(firstObject, secondObject)) + " must equals");
    console.log(printResult(isEqual(firstObject, firstObjectIncorrect)) + " unequals");
    console.log(printResult(isEqual(firstArray, secondArray)) + " must equals");
    console.log(printResult(isEqual(firstArray, firstArrayIncorrect)) + " unequals");
    console.log(printResult(isEqual(firstString, secondString)) + " must equals");
    console.log(printResult(isEqual(firstString, firstStringIncorrect)) + " unequals");
    console.log(printResult(isEqual(null, null)) + " must equals");
    console.log(printResult(isEqual([], [])) + " must equals");
}

function runDeepCopyTest() {
    console.log("object test");
    let newObject = deepCopy(copyObject);
    console.log(printResult(isEqual(newObject, copyObject)) + " must equals");
    console.log("change name of copyObject");
    copyObject.name.user = "new name";
    console.log(newObject);
    console.log(copyObject);
    console.log(printResult(isEqual(newObject, copyObject)) + " unequals");

    console.log("array test");
    let newArray = deepCopy(copyArray);
    console.log(printResult(isEqual(newArray, copyArray)) + " must equals");
    console.log("change age.date of copyArray");
    copyArray[3].age.date = 1234;
    console.log(newArray);
    console.log(copyArray);
    console.log(printResult(isEqual(newArray, copyArray)) + " unequals");

    console.log("Primitive types test");
    let newString = deepCopy(copyString);
    console.log(printResult(isEqual(newString, copyString)) + " must equals");
    console.log("change copyString");
    copyString = 1234;
    console.log(newString);
    console.log(copyString);
    console.log(printResult(isEqual(newString, copyString)) + " unequals");
}

runEqualTest();
runDeepCopyTest();
