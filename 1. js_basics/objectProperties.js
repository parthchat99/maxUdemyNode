const person = {
    name: "Parth",
    age: 25,
    company: "Yes Bank",
    // greet: ()=>{
    //     console.log("Hi I am "+this.name+" and my age is "+this.age)
    // }
    // The above arrow function will throw error since this.name and this.age are global variables and not local ones. TO make it work either use
    greet: function(){
        console.log("Hi I am "+this.name+" and my age is "+this.age)
    },
    // or use
    greeting() {
        console.log("I am working in "+this.company)
    }
}

person.greet()
person.greeting()