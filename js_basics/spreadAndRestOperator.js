//Spread Operator
// [...arrName] or {...objName} Creates new array with taking out elements from previous array and adding them

//FOr Object
console.log("***Spread Operator***")
const person = {
    name : 'Max',
    age : 29,
    greet(){
        console.log("Hi, I am "+ this.name +"and my age is "+ this.age)
    }
}

console.log("=> For Object")
const copiedPerson = {...person};
console.log("copiedPerson= ", copiedPerson)

//For Array
console.log("=> For Array")
const hobbies = ['Sports','Cooking']

const copiedArray = hobbies.slice();
console.log("copiedArray= ", copiedArray)

const arrayInsideArray = [hobbies];
console.log("arrayInsideArray = ", arrayInsideArray)

const spreadArray = [...hobbies];
console.log("spreadArray = ", spreadArray)


//Rest operator

console.log("***Rest Operator***")
const toArray = (arg1, arg2, arg3) => {
    return[arg1,arg2,arg3]
}
console.log("toArray3", toArray(1,2,3))

// but what if I pass fourth argument
console.log("toArray4", toArray(1,2,3,4))
// JS won't throw error but it won't either show the value

// to make this work
// and to pass unlimited args
const toArrayRest = (...args) => {
    return args
}
console.log("toArrayRest", toArrayRest(1,2,3,4))